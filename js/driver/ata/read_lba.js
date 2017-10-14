'use strict';

const driverUtils = require('../../core/driver-utils');

const ports = [];

for (let i = 0; i < 8; i++) {
  ports[i] = driverUtils.ioPort(0x1F0 + i);
}

const irq = driverUtils.irq(14);

const emptyFunction = () => {};

irq.on(emptyFunction);

class LBAReader {
  read(lba, num, callback) {
    ports[6].write8(((lba >> 24) & 0xff) | 0b11100000);
    ports[2].write8((num) & 0xff);
    ports[3].write8((lba) & 0xff);
    ports[4].write8((lba >> 8) & 0xff);
    ports[5].write8((lba >> 16) & 0xff);
    ports[7].write8(0x20);
    // FIXME: if HDD doesn't exist, fail
    irq.on(() => {
      const buf = new Buffer(num * 512);
      for (let i = 0; i < num * 256; i++) {
        buf.writeUInt16LE(ports[0].read16(), i * 2);
      }
      callback(buf);
    });
  }
}

module.exports = LBAReader;
