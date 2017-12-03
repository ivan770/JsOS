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
  l: 554, // C#5
  '.': 587, // D5
  ';': 622, // D#5
  '/': 659, // E5

  q: 523, // C5
  // C#5
  '2': 554, //eslint-disable-line
  w: 587, // D5
  // D#5
  '3': 622, //eslint-disable-line
  e: 659, // E5
  r: 698, // F5
  // F#5
  '5': 739, //eslint-disable-line
  t: 784, // G5
  // G#5
  '6': 830, //eslint-disable-line
  y: 880, // A5
  // A#5
  '7': 932, //eslint-disable-line
  u: 988, // H5
  i: 1046, // C6
  // C#6
  '9': 1108, //eslint-disable-line
  o: 1174, // D6
  // D#6
  '0': 1244, //eslint-disable-line
  p: 1318, // E6
  '[': 1396, // F6
  '=': 1479, // F#6
  ']': 1568, //G6
};

/*
73	ля5	A6	1760,00
72	соль♯5 (ля♭5)	G♯6/A♭6	1661,22
71	соль5	G6	1567,98
70	фа♯5 (соль♭5)	F♯6/G♭6	1479,98
69	фа5	F6	1396,91
68	ми5	E6	1318,51
67	ре♯5 (ми♭5)	D♯6/E♭6	1244,51
66	ре5	D6	1174,66
65	до♯5 (ре♭5)	C♯6/D♭6	1108,73 */

const DURATION = 50;

let io,
  kb,
  resp;

function main(api, res) {
  io = api.stdio;
  kb = api.keyboard;
  resp = res;
  io.setColor('green');
  io.writeLine('Synthezier started!');
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
  io.writeLine('Synthezier stoped');
  kb.onKeydown.remove(keylog);
  return resp(0);
}

exports.call = (cmd, args, api, res) => main(api, res);

exports.commands = ['speakplay'];