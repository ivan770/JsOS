// Example application for JsOS
// By PROPHESSOR

'use strict';

let io;

function main(cmd, args, api, res) {
  io = api.stdio;
  io.setColor('green');
  io.writeLine('UHCI init...');
  const controller = $$.usb.controllers[0];

  if (controller) {

    for (let i = 0; i < controller.getPortCount(); i++) {
      const status = controller.getPortStatus(i);
      let s = `PORT ${i}: `;

      if (status.connected) {
        s += `connected, speed ${status.speed}`;
      } else {
        s += 'unconnected';
      }
      io.writeLine(s);
    }
    io.writeLine('UHCI init OK.');
  } else {
    io.writeLine('No controllers found.');
  }
  return res(0); // 1 = error
}

exports.call = main; // (cmd, args, api, res) => main(api, res);

exports.commands = ['usb'];