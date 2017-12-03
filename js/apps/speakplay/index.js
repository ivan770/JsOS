// Example application for JsOS
// By PROPHESSOR

'use strict';

// Key-notes
const kn = {
  z: 261, // C4
  s: 277, // C#4
  x: 293, // D4
  d: 311, // D#4
  c: 329, // E4
  v: 349, // F4
  g: 369, // F#4
  b: 392, // G4
  h: 415, // G#4
  n: 440, // A4
  j: 466, // A#4
  m: 494, // H4
  ',': 523, // C5
};

const DURATION = 50;

let io,
  kb,
  resp;

function main(api, res) {
  io = api.stdio;
  kb = api.keyboard;
  resp = res;
  io.setColor('green');
  io.writeLine('Syntheser started!');
  io.setColor('yellow');
  io.writeLine('Press F12 for exit');
  io.setColor('pink');
  kb.onKeydown.add(keylog);
  // return res(0); // 1 = error
}

function keylog(key) {
  if (key.type === 'f12') return stop();
  if (kn[key.character]) {
    $$.speaker.play(kn[key.character], DURATION);
  }
  // io.writeLine(JSON.stringify(key));
  return false;
}

function stop() {
  io.setColor('yellow');
  io.writeLine('Keylogger stoped');
  kb.onKeydown.remove(keylog);
  return resp(0);
}

exports.call = (cmd, args, api, res) => main(api, res);

exports.commands = ['speakplay'];
