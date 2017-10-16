'use strict';

class Filesystem {
  getFileList() {
    debug(this.partition.address + this.sectorsReserved);
    debug(JSON.stringify(this.partition.device));
    return this.partition.device.read(this.partition.address + this.sectorsReserved + (this.numberOfFats * this.sectorsPerFat), Buffer.allocUnsafe(512)).then(buf => {
      // debug(buf.toString('utf8', 0, 11));
      const list = [];
      for (let i = 0; i < 512; i += 32) {
        if (buf[i] == 0) break;
        const name = buf.toString('utf8', i, i + 8);
        const extension = buf.toString('utf8', i + 8, i + 11);
        const filename = `${name.trim()}.${extension.trim()}`;
        list.push(filename);
      }
      return new Promise(resolve => {
        resolve(list);
      });
    });
  }
}

class Partition {
  getFilesystem() {
    return this.device.read(this.address, Buffer.allocUnsafe(512)).then((buf) => new Promise((resolve) => {
      const fs = new Filesystem;
      fs.partition = this;
      fs.createdWith = buf.toString('utf8', 3, 11).trim();
      fs.bytesPerSector = buf.readUInt16LE(11);
      fs.sectorsPerCluster = buf[13];
      fs.numberOfFats = buf[16];
      debug(fs.numberOfFats);
      fs.sectorsReserved = buf.readUInt16LE(14);
      debug(fs.sectorsReserved);
      fs.sectorsPerFat = buf.readUInt16LE(22);
      debug(fs.sectorsPerFat);
      resolve(fs);
    }));
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
  return device.read(0, Buffer.allocUnsafe(512)).then((_buf) => new Promise((resolve) => {
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
