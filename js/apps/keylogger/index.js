// Example application for JsOS
// By PROPHESSOR

'use strict';
let io,
  kb,
  resp;

function main(api, res) {
  io = api.stdio;
  kb = api.keyboard;
  resp = res;
  io.setColor('green');
  io.writeLine('Keylogger started!');
  io.setColor('yellow');
  io.writeLine('Press F12 for exit');
  io.setColor('pink');
  kb.onKeydown.add(keylog);
  // return res(0); // 1 = error
}

function keylog(key) {
  if (key.type === 'f12') return stop();
  io.writeLine(JSON.stringify(key));
  return false;
}

function stop() {
  io.setColor('yellow');
  io.writeLine('Keylogger stoped');
  kb.onKeydown.remove(keylog);
  return resp(0);
}

exports.call = (cmd, args, api, res) => main(api, res);

exports.commands = ['example'];
