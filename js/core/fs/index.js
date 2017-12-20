'use strict';

const llfs = require('./low-level');

function resolvePath(path) {
  const spl = path.split('/');

  if (spl[spl.length - 1] === '') spl.pop();
  if (spl[0]) throw new Error('Path is not absolute');
  let level = spl.length - 1;

  if (level < 0) level = 0;
  if (level >= 1) {
    const device = llfs.getDeviceByName(spl[1]);

    if (!device) throw new Error(`No device ${spl[1]}`);
    spl[1] = device;
    if (level >= 2) {
      if (!(/^p\d+$/.test(spl[2]))) {
        throw new Error(`Invalid partition name ${spl[2]}`);
      }
      spl[2] = Number(spl[2].slice(1));
    }
  }
  return {
    level,
    'parts': spl.slice(1)
  };
}

module.exports = {
  readdir(path, options, callback) {
    callback = callback || options;
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
      llfs.getPartitions(resolved.parts[0]).then((partitions) => {
        if (resolved.level >= 2) {
          return partitions[resolved.parts[1]].getFilesystem();
        }
        callback(null, partitions.map((_, i) => `p${i}`));
      })
.then((filesystem) => {
        if (resolved.level <= 1) return;
        /* if (resolved.level >= 3) {
          callback(new Error('Subdirectories aren\'t supported yet'));
        }*/
        return filesystem.readdir(resolved.parts.slice(2).join('/'), callback);
      })
      /* .then(list => {
        if (resolved.level <= 1) return;
        callback(null, list.map(file => file.name), list);
      })*/
      .catch((err) => {
        callback(err);
      });
    }
  },
  readFile(path, options, callback) {
    callback = callback || options;
    let resolved;

    try {
      resolved = resolvePath(path);
    } catch (e) {
      callback(e);
      return;
    }
    if (resolved.level >= 3) {
      llfs.getPartitions(resolved.parts[0]).then(partitions => partitions[resolved.parts[1]].getFilesystem())
.then((filesystem) => {
        filesystem.readFile(resolved.parts.slice(2).join('/'), typeof options === 'string' ? {'encoding': options} : options, callback);
      })
.catch((err) => {
        callback(err);
      });
    } else {
      callback(new Error('Is a directory'));
    }
  },
  writeFile(path, data, options, callback) {
    callback = callback || options;
    options = options || {};
    let resolved;

    try {
      resolved = resolvePath(path);
    } catch (e) {
      callback(e);
      return;
    }
    if (resolved.level >= 3) {
      llfs.getPartitions(resolved.parts[0]).then(partitions => partitions[resolved.parts[1]].getFilesystem())
.then((filesystem) => {
        filesystem.writeFile(resolved.parts.slice(2).join('/'), data, typeof options === 'string' ? {'encoding': options} : options, callback);
      })
.catch((err) => {
        callback(err);
      });
    } else {
      callback(new Error('Is a directory'));
    }
  },
  mkdir(path, options, callback) {
    callback = callback || options;
    options = options || {};
    let resolved;

    try {
      resolved = resolvePath(path);
    } catch (e) {
      callback(e);
      return;
    }
    if (resolved.level >= 3) {
      llfs.getPartitions(resolved.parts[0]).then(partitions => partitions[resolved.parts[1]].getFilesystem())
.then((filesystem) => {
        filesystem.mkdir(resolved.parts.slice(2).join('/'), options, callback);
      })
.catch((err) => {
        callback(err);
      });
    } else {
      callback(new Error('Is a directory'));
    }
  }
};