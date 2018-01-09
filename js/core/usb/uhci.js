// Copyright 2017-present JsOS project authors
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const PciDevice = require('../pci/pci-device');
const co = require('./constants');
const DMAPool = require('../system/dma-pool');

const FRAMELIST_SIZE = 1024 * 4;
const MAX_QH = 8;
const QH_SIZE = 8;

class UHCIController {
  constructor() {
    '';
  }
  initFrameList() {
    for (let i = 0; i < FRAMELIST_SIZE; i += 4) {
      this.frameList.buffer.writeUInt32LE(co.TD_PTR_QH | this.firstQh.address());
    }
  }
  getPortStatus(port) {
    const val = this.portPorts[port].read16();

    return {
      'speed': val & (1 << 8) ? 'low' : 'high',
      'connected': Boolean(val & (1 << 0))
    };
  }
  getPortCount() {
    return 2;
  }
  allocQH() {
    for (let i = 0; i < this.qhPoolInfo.length; i++) {
      if (!this.qhPoolInfo[i].active) {
        this.qhPoolInfo[i].active = true;
        return this.qhPoolInfo[i];
      }
    }
    return null;
  }
  writeQH(qh, head, element) {
    this.qhPool.buffer.writeUInt32LE(head, qh.offset);
    this.qhPool.buffer.writeUInt32LE(element, qh.offset + 4);
  }
  readQH(qh) {
    const head = this.qhPool.buffer.readUInt32LE(qh.offset);
    const element = this.qhPool.buffer.readUInt32LE(qh.offset + 4);

    return {
      head,
      element
    };
  }
  freeQH(qh) {
    qh.active = false;
  }
  QHaddr(qh) {
    return this.qhPool.address + qh.offset;
  }
  init(device) {
    // Initialize the PCI device
    device.setPciCommandFlag(PciDevice.commandFlag.BusMaster);

    this.iobar = device.bars[4];
    this.cmd = this.iobar.resource.offsetPort(co.REG_CMD);
    this.intr = this.iobar.resource.offsetPort(co.REG_INTR);
    this.frnum = this.iobar.resource.offsetPort(co.REG_FRNUM);
    this.frbaseadd = this.iobar.resource.offsetPort(co.REG_FRBASEADD);
    this.sofmod = this.iobar.resource.offsetPort(co.REG_SOFMOD);
    this.portPorts = [];
    for (let i = 0x10; i < 0x14; i += 2) {
      this.portPorts.push(this.iobar.resource.offsetPort(i));
    }

    this.dmaPool = new DMAPool();
    this.frameList = this.dmaPool.allocBuffer(FRAMELIST_SIZE, 4096);
    this.qhPool = this.dmaPool.allocBuffer(QH_SIZE * MAX_QH, 8);
    this.qhPoolInfo = Array(MAX_QH);
    for (let i = 0; i < this.qhPoolInfo.length; i++) {
      this.qhPoolInfo[i] = {
        'active': false,
        'offset': i * QH_SIZE
      };
      this.qhPoolInfo[i].write = this.writeQH.bind(this, this.qhPoolInfo[i]);
      this.qhPoolInfo[i].read = this.readQH.bind(this, this.qhPoolInfo[i]);
      this.qhPoolInfo[i].free = this.freeQH.bind(this, this.qhPoolInfo[i]);
      this.qhPoolInfo[i].address = this.QHaddr.bind(this, this.qhPoolInfo[i]);
    }
    this.firstQh = this.allocQH();
    this.firstQh.write(co.TD_PTR_TERMINATE, co.TD_PTR_TERMINATE);
    this.initFrameList();

    this.intr.write16(0);

    this.frnum.write16(0);
    this.frbaseadd.write32(this.frameList.address);
    this.sofmod.write16(0x40);
    this.cmd.write16(co.CMD_GRESET);
    while (this.cmd.read16() & co.CMD_GRESET) __SYSCALL.halt();
    this.cmd.write16(co.CMD_RS);
    $$.usb.addController(this);
  }
  static init(device) {
    return new UHCIController().init(device);
  }

  static load() {
    return $$.pci.addClassDriver(0x0C, 0x03, 0x00, UHCIController);
  }
}


module.exports = UHCIController;