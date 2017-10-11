/* global $$ */

'use strict';

const io = $$.stdio.defaultStdio;

function main() {
  io.setColor('green');
  io.writeLine('It works!!!');
  return 0; // 1 = error
}

exports.call = (cmd, args, api) => main();

exports.commands = ['example'];
