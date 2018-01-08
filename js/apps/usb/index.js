// Example application for JsOS
// By PROPHESSOR

'use strict';

let io;

const UHCIController = require('../../core/usb');

function main(cmd, args, api, res) {
  io = api.stdio;
  io.setColor('green');
  io.writeLine('UHCI init...');
  UHCIController.load();
  io.writeLine('UHCI init OK.');
  return res(0); // 1 = error
}

exports.call = main; // (cmd, args, api, res) => main(api, res);

exports.commands = ['usb'];