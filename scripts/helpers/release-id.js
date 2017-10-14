var assert = require('assert');

function versionToReleaseId(ver) {
  var parts = String(ver).split('.');
  assert(parts.length === 3);
  var major = Number(parts[0]);
  assert(major < 1024);
  return major + 1;
}

module.exports = versionToReleaseId;
