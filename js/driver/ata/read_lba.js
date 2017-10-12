'use strict';

const driverUtils = require('../../core/driver-utils');

const ports = [];

for (let i = 0; i < 8; i++) {
  ports[i] = driverUtils.ioPort(0x1F0 + i);
}

class LBAReader {
  read(lba, num) {
    const buf = new Buffer(num * 512);
    ports[6].write8(((lba >> 24) & 0xff) | 0b11100000);
    ports[2].write8((num) & 0xff);
    ports[3].write8((lba) & 0xff);
    ports[4].write8((lba >> 8) & 0xff);
    ports[5].write8((lba >> 16) & 0xff);
    ports[7].write8(0x20);
    while (!(ports[7].read8() & 8)); // TODO: if HDD doesn't exist, fail
    for (let i = 0; i < num * 256; i++) {
      buf.writeUInt16LE(ports[0].read16(), i * 2);
    }
    return buf;
  }
}

module.exports = LBAReader;
