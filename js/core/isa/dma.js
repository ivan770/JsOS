'use strict';

const driverUtils = require('../driver-utils');

const isaMemories = [];
for (let i = 0; i < 65536 * 8; i += 65536) {
  isaMemories.push(driverUtils.physicalMemory(14680064 + i, 65536));
}

class ISADMAChannel {
  constructor(id) {
    this.id = id;
    this.initIOPorts();
    this.mask();
    this.setAddress(14680064 + (65536 * id));
    this.unmask();
  }

  initIOPorts() {
    this.ports = [];
    if (this.id < 4) {
      for (let i = 0; i < 16; i++) {
        console.log(i);
        if (i === 0) {
          this.ports.push(null);
          continue;
        }
        this.ports.push(driverUtils.ioPort(i));
      }
    } else {
      const portids = [0xC0, 0xC2, 0xC4, 0xC6, 0xC8, 0xCA, 0xCC, 0xCE, 0xD0, 0xD2, 0xD4, 0xD6, 0xD8, 0xDA, 0xDC, 0xDE];
      for (const i of portids) {
        this.ports.push(driverUtils.ioPort(i));
      }
    }
    this.type = this.id < 4 ? 8 : 16;
    const pagePorts = [0x87, 0x83, 0x81, 0x82, 0x8F, 0x8B, 0x89, 0x8A];
    this.pagePort = driverUtils.ioPort(pagePorts[this.id]);
  }

  setAddress(addr) {
    if (this.id >= 4) {
      throw new Error('TODO: 16-bit ISA DMA');
    }
    this.flipFlopReset();
    this.ports[(this.id % 4) * 2].write8(addr & 0xFF);
    this.ports[(this.id % 4) * 2].write8((addr >> 8) & 0xFF);
    this.flipFlopReset();
    this.ports[(this.id % 4) * 2 + 1].write8(0xFF);
    this.ports[(this.id % 4) * 2 + 1].write8(0xFF);
    this.pagePort.write8((addr >> 16) & 0xFF);
  }

  getBuffer() {
    return new Uint8Array(isaMemories[this.id].buffer());
  }

  prepareWrite() {
    this.mask();
    console.log(0x58 + (this.id % 4));
    this.ports[0xA].write8(0x58 + (this.id % 4));
    this.unmask();
  }

  prepareRead() {
    this.mask();
    this.ports[0xA].write8(0x54 + (this.id % 4));
    this.unmask();
  }

  mask() {
    this.ports[0xA].write8(0x4 + (this.id % 4));
  }

  flipFlopReset() {
    this.ports[0xC].write8(0xFF);
  }

  unmask() {
    this.ports[0xA].write8(this.id % 4);
  }
}

module.exports = ISADMAChannel;
