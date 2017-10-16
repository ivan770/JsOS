// Brainfuck interpreter for JsOS
// Original: https://github.com/skilldrick/brainfuck-js
// Ported by PROPHESSOR

'use strict';
let io;

function main(api, res) {
  io = api.stdio;
  io.setColor('green');
  io.writeLine('It works!!!');
  return res(0); // 1 = error
}

exports.call = (cmd, args, api, res) => main(api, res);

exports.commands = ['example'];
