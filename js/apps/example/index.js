// Example application for JsOS
// By PROPHESSOR

'use strict';
let io;

function main(api, res) {
  io = api.stdio;
  io.setColor('green');
  io.writeLine('It works!!!');
  const Arguments = JSON.stringify(arguments, null /* (x,y)=>typeof y === 'function' ? '[Function]' : y */, 4);
  io.writeLine(`Arguments: ${Arguments}`);
  return res(0); // 1 = error
}

exports.call = (cmd, args, api, res) => main(api, res, cmd, args);

exports.commands = ['example'];
