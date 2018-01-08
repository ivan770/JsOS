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

class UHCIController {
  constructor() {
    '';
  }
  initQHPool() {
    for (let i = 0; i < MAX_QH; i++) {
      this.qhPool[i] = {'transfer': 0};
    }
  }
  init(device) {
    // Initialize the PCI device
    device.setPciCommandFlag(PciDevice.commandFlag.BusMaster);

    this.iobar = device.bars[4];
    this.cmd = this.iobar.resource.offsetPort(co.REG_CMD);
    this.intr = this.iobar.resource.offsetPort(co.REG_INTR);
    this.frnum = this.iobar.resource.offsetPort(co.REG_FRNUM);
    this.frbaseadd = this.iobar.resource.offsetPort(co.REG_FRBASEADD);

    /* this.dmaPool = new DMAPool();
    this.frameList = this.dmaPool.allocBuffer(FRAMELIST_SIZE);
    this.qhPool = [];

    this.intr.write16(0);

    this.frnum.write16(0);
    this.frbaseadd.write16(this.frameList.address);*/
    this.cmd.write16(co.CMD_HCRESET);
    while (this.cmd.read16() & co.CMD_HCRESET) __SYSCALL.halt();
    this.cmd.write16(co.CMD_RS);
    debug('USB INIT');
  }
  static init(device) {
    return new UHCIController().init(device);
  }

  static load() {
    return $$.pci.addClassDriver(0x0C, 0x03, 0x00, UHCIController);
  }
}


module.exports = UHCIController;