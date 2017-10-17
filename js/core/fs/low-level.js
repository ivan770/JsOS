'use strict';

const fatfs = require('./fatfs');

class Partition {
  getFilesystem() {
    const driver = {
      sectorSize: this.device.formatInfo.sectorSize,
      numSectors: this.size,
      readSectors(sector, dest, callback) {
        this.device.read(this.address + sector, dest).then(() => {
          callback();
        }).catch((err) => {
          callback(err);
        });
      },
    };
    return fatfs.createFileSystem(driver);
  }
}

function getDeviceByName(name) {
  let iface;
  for (const device of $$.block.devices) {
    if (device.name === name) iface = device;
  }
  if (!iface) return null;
  return iface;
}

function getPartitions(device) {
  return device.read(0, Buffer.allocUnsafe(device.formatInfo.sectorSize)).then((_buf) => new Promise((resolve) => {
    const partitions = [];
    const buf = _buf.slice(0x1BE, 0x1BE + 64);
    for (let i = 0; i < 4; i++) {
      const partition = new Partition();
      const type = buf[(i * 16) + 0x4];
      if (type) {
        partition.device = device;
        partition.type = type;
        partition.address = buf.readUInt32LE((i * 16) + 0x8);
        partition.size = buf.readUInt32LE((i * 16) + 0xC);
        partitions.push(partition);
      }
    }
    resolve(partitions);
  }));
}

module.exports = {
  getDeviceByName,
  getPartitions,
};
