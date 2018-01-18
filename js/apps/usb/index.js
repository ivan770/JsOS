// USB test application
// By UsernameAK

'use strict';

let io;

function main(cmd, args, api, res) {
  io = api.stdio;

  io.setColor('green');
  io.writeLine('UHCI init...');

  const [controller] = $$.usb.controllers;

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

  return res(0);
}

exports.call = main;

exports.commands = ['usb'];