'use strict';

/* global $$ */

const driverUtils = require('../../core/driver-utils');

class ATA {
  constructor(firstPort, isSlave) {
    this.ports = [];

    for (let i = 0; i < 8; i++) {
      this.ports[i] = driverUtils.ioPort(firstPort + i);
    }

    // this.driveSelect = isSlave ? 0x50 : 0x40;
    this.driveSelect = isSlave ? 0xF0 : 0xE0;

    this.formatInfo = {
      sectorSize: 512,
    };

    this.read = this.read.bind(this);
    this.isOnline = this.isOnline.bind(this);
    this.write = this.write.bind(this);
  }
  read(sector, u8) {
    return new Promise((resolve, reject) => {
      if (!this.isOnline()) return reject(new Error('Device isn\'t online'));
      // const buf = new Buffer(u8.length);
      this.ports[6].write8(this.driveSelect | ((sector >> 24) & 0x0F));
      /* this.ports[2].write8(0);
         this.ports[3].write8((sector >> 24) & 0xff);
         this.ports[4].write8((sector >> 32) & 0xff);
         this.ports[5].write8((sector >> 40) & 0xff); */
      this.ports[2].write8(1);
      this.ports[3].write8((sector) & 0xff);
      this.ports[4].write8((sector >> 8) & 0xff);
      this.ports[5].write8((sector >> 16) & 0xff);
      // this.ports[7].write8(0x24);
      this.ports[7].write8(0x20);
      while (!(this.ports[7].read8() & 8)); // TODO: async
      for (let i = 0; i < 256; i++) {
        const data = this.ports[0].read16();
        u8[i * 2 + 1] = (data >> 8) & 0xFF;
        u8[(i * 2)] = data & 0xFF;
      }
      // u8.set(buf);
      // return resolve(u8);
      return resolve(u8);
    });
  }
  write(sector, u8) {
    return new Promise((resolve, reject) => reject(new Error('Write is not supported')));
  }
  isOnline() {
    return true; // TODO: really check if online
  }
}

console.log(JSON.stringify($$));

$$.block.registerDevice(new $$.block.BlockDeviceInterface('hd', new ATA(0x1F0, false)));
$$.block.registerDevice(new $$.block.BlockDeviceInterface('hd', new ATA(0x1F0, true)));
$$.block.registerDevice(new $$.block.BlockDeviceInterface('hd', new ATA(0x170, false)));
$$.block.registerDevice(new $$.block.BlockDeviceInterface('hd', new ATA(0x170, true)));
$$.block.registerDevice(new $$.block.BlockDeviceInterface('hd', new ATA(0x1E8, false)));
$$.block.registerDevice(new $$.block.BlockDeviceInterface('hd', new ATA(0x1E8, true)));
$$.block.registerDevice(new $$.block.BlockDeviceInterface('hd', new ATA(0x168, false)));
$$.block.registerDevice(new $$.block.BlockDeviceInterface('hd', new ATA(0x168, true)));
