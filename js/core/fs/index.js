'use strict';

const llfs = require('./low-level');

function resolvePath(path) {
  const spl = path.split('/');
  if (spl[spl.length - 1] === '') spl.pop();
  if (spl[0]) throw new Error('Path is not absolute');
  const level = spl.length - 1;
  if (level >= 1) {
    const device = llfs.getDeviceByName(spl[1]);
    if (!device) throw new Error(`No device ${spl[1]}`);
    spl[1] = device;
    if (level >= 2) {
      if (!(/^p\d+$/.test(spl[2]))) {
        throw new Error(`Invalid partition name ${spl[2]}`);
      }
      spl[2] = +(spl[2].slice(1));
    }
  }
  return {
    level,
    parts: spl.slice(1),
  };
}

module.exports = {
  readdir(path, options, callback) {
    let resolved;
    try {
      resolved = resolvePath(path);
    } catch (e) {
      callback(e);
      return;
    }
    if (resolved.level === 0) {
      callback(null, $$.block.devices.map(device => device.name));
    } else if (resolved.level >= 1) {
      llfs.getPartitions(resolved.parts[0]).then(partitions => {
        if (resolved.level >= 2) {
          return partitions[resolved.parts[1]].getFilesystem();
        }
        callback(null, partitions.map((_, i) => `p${i}`));
      }).then(filesystem => {
        if (resolved.level <= 1) return;
        if (resolved.level >= 3) {
          callback(new Error('Subdirectories aren\'t supported yet'));
        }
        return filesystem.getFileList();
      })
      .then(list => {
        if (resolved.level <= 1) return;
        callback(null, list.map(file => file.name), list);
      })
      .catch(err => {
        callback(err);
      });
    }
  },
};
