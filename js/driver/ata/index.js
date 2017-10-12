'use strict';

const LBAReader = require('./read_lba');

module.exports.read = new LBAReader().read;
