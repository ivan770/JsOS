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

class UHCIDriver {
  constructor() {
    '';
  }
  init(device) {
    // Initialize the PCI device
    device.setPciCommandFlag(PciDevice.commandFlag.BusMaster);
    this.iobar = device.bars[4];
    this.cmd = this.iobar.resource.offsetPort(0);

    // Reset controller
    this.cmd.write16(0x4);
    while ((this.cmd.read16() & 0x4) !== 0);

    // Start controller
    this.cmd.write16(0x1);
  }
  static init(device) {
    return new UHCIDriver().init(device);
  }
}

$$.pci.addClassDriver(0x0C, 0x03, 0x00, UHCIDriver);
