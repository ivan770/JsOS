'use strict';

class File {
  constructor() {
    'use do nothing';
  }
  readData() {
    debug(this.fs.sectorsPerSector);
    debug(this.startingCluster);
    debug(this.fs.partition.address + (this.fs.sectorsReserved * this.fs.sectorsPerSector) +
      (this.fs.numberOfFats * this.fs.sectorsPerFat * this.fs.sectorsPerSector) +
      (this.fs.sectorsPerSector * this.fs.sectorsPerCluster * this.startingCluster));
    return this.fs.partition.device.read(
      this.fs.partition.address + (this.fs.sectorsReserved * this.fs.sectorsPerSector) +
        (this.fs.numberOfFats * this.fs.sectorsPerFat * this.fs.sectorsPerSector) +
        (this.fs.sectorsPerCluster * this.startingCluster), Buffer.allocUnsafe(512)).then(buf =>
          new Promise(resolve => resolve(buf.slice(0, Math.min(this.size, 512)))));
  }
}


class Filesystem {
  getFileList() {
    return this.partition.device.read(this.partition.address + (this.sectorsReserved * this.sectorsPerSector) + (this.numberOfFats * this.sectorsPerFat), Buffer.allocUnsafe(512)).then(buf => {
      const list = [];
      for (let i = 0; i < 512; i += 32) {
        if (buf[i] === 0) break;
        if (buf[i] === 0xE5) continue;
        const name = buf.toString('utf8', i, i + 8).trim();
        const extension = buf.toString('utf8', i + 8, i + 11).trim();
        let filename;
        if (extension) {
          filename = `${name}.${extension}`;
        } else {
          filename = name;
        }
        const attrbits = buf[i + 11];
        const file = new File;
        file.fs = this;
        file.name = filename;
        file.readonly = !!((attrbits >> 0) & 0x1);
        file.hidden = !!((attrbits >> 1) & 0x1);
        file.system = !!((attrbits >> 2) & 0x1);
        file.label = !!((attrbits >> 3) & 0x1);
        file.directory = !!((attrbits >> 4) & 0x1);
        file.archive = !!((attrbits >> 5) & 0x1);
        file.startingCluster = buf.readUInt16LE(i + 26);
        file.size = buf.readUInt32LE(i + 28);

        if (!file.label) {
          list.push(file);
        }
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
      fs.sectorsPerSector = fs.bytesPerSector / 512;
      fs.sectorsPerCluster = buf[13];
      fs.numberOfFats = buf[16];
      fs.sectorsReserved = buf.readUInt16LE(14);
      fs.sectorsPerFat = buf.readUInt16LE(22);
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
