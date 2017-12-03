// SpeakPlay for JsOS
// By PROPHESSOR

'use strict';

const DURATION = 50;
const MIN_OCTAVE = 1;
const MAX_OCTAVE = 7;

const note = new class Note {
  constructor() {
    this.octave = 4;
    this.duration = DURATION;
  }

  convert(note) {
    return note * this.octaver;
  }

  upDuration() {
    return (this.duration += 10);
  }

  downDuration() {
    return this.duration === 10 ? this.duration : (this.duration -= 10);
  }

  upOctave() {
    return this.octave === MAX_OCTAVE ? this.octave : ++this.octave;
  }

  downOctave() {
    return this.octave === MIN_OCTAVE ? this.octave : --this.octave;
  }


  get octaver() {
    return Math.pow(2, this.octave - 2);
  }

  get keynotes() {
    return {
      z: 'C',
      s: 'CD',
      x: 'D',
      d: 'DD',
      c: 'E',
      v: 'F',
      g: 'FD',
      b: 'G',
      h: 'GD',
      n: 'A',
      j: 'AD',
      m: 'H',

      ',': 'CP',
      l: 'CDP',
      '.': 'DP',
      ';': 'DDP',
      '/': 'EP',
      q: 'CP',
      '2': 'CDP', //eslint-disable-line
      w: 'DP',
      '3': 'DDP', //eslint-disable-line
      e: 'EP',
      r: 'FP',
      '5': 'FDP', //eslint-disable-line
      t: 'GP',
      '6': 'GDP', //eslint-disable-line
      y: 'AP',
      '7': 'ADP', //eslint-disable-line
      u: 'HP',
      i: 'CPP',
      '9': 'CDPP', //eslint-disable-line
      o: 'DPP',
      '0': 'DDPP', //eslint-disable-line
      p: 'EPP',
      '[': 'FPP',
      '=': 'FDPP',
      ']': 'GPP',
    };
  }

  // [z - m]

  get C() {
    return this.convert(65);
  }

  get CD() {
    return this.convert(69);
  }

  get D() {
    return this.convert(73);
  }
  get DD() {
    return this.convert(78);
  }
  get E() {
    return this.convert(82);
  }
  get F() {
    return this.convert(87);
  }
  get FD() {
    return this.convert(92);
  }

  get G() {
    return this.convert(98);
  }

  get GD() {
    return this.convert(104);
  }

  get A() {
    return this.convert(110);
  }

  get AD() {
    return this.convert(116);
  }

  get H() {
    return this.convert(123);
  }

  // [, - /] U [q - u]

  get CP() {
    return this.convert(131);
  }

  get CDP() {
    return this.convert(139);
  }

  get DP() {
    return this.convert(147);
  }
  get DDP() {
    return this.convert(156);
  }
  get EP() {
    return this.convert(165);
  }
  get FP() {
    return this.convert(175);
  }
  get FDP() {
    return this.convert(185);
  }

  get GP() {
    return this.convert(196);
  }

  get GDP() {
    return this.convert(208);
  }

  get AP() {
    return this.convert(220);
  }

  get ADP() {
    return this.convert(233);
  }

  get HP() {
    return this.convert(247);
  }

  // [i - ]]

  get CPP() {
    return this.convert(262);
  }

  get CDPP() {
    return this.convert(277);
  }

  get DPP() {
    return this.convert(294);
  }
  get DDPP() {
    return this.convert(311);
  }
  get EPP() {
    return this.convert(330);
  }
  get FPP() {
    return this.convert(349);
  }
  get FDPP() {
    return this.convert(370);
  }

  get GPP() {
    return this.convert(392);
  }

};

class Interface {
  // region eol
// ######################################################################################
  static render() {
    io.write(` 
 ##############################################################################
 #                          SpeakPlay (c) PROPHESSOR 2017                     #
 ##############################################################################

                                 Press F12 to exit







DURATION: ${note.duration}
OCTAVE: ${note.octave}









`
    );
  }
  // endregion eol
}

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

  switch (key.type) {
    case 'f12':
      stop();
      break;
    case 'kpup':
      note.upOctave();
      break;
    case 'kpdown':
      note.downOctave();
      break;
    case 'kpleft':
      note.downDuration();
      break;
    case 'kpright':
      note.upDuration();
      break;
    default:
  }
  if (note.keynotes[key.character]) {
    $$.speaker.play(note[note.keynotes[key.character]], note.duration);
  }
  // io.writeLine(JSON.stringify(key));

  Interface.render();

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


/*
	440,000
48	соль♯3 (ля♭3)	G♯4/A♭4	415,305
47	соль3	G4	391,995
46	фа♯3 (соль♭3)	F♯4/G♭4	369,994
45	фа3	F4	349,228
44	ми3	E4	329,628
43	ре♯3 (ми♭3)	D♯4/E♭4	311,127
42	ре3	D4	293,665
41	до♯3 (ре♭3)	C♯4/D♭4	277,183
40	до3	C4	261,626
39	си2	B3	246,942
38	ля♯2 (си♭2)	A♯3/B♭3	233,082
37	ля2	A3	220,000
36	соль♯2 (ля♭2)	G♯3/A♭3	207,652
35	соль2	G3	195,998
34	фа♯2 (соль♭2)	F♯3/G♭3	184,997
33	фа2	F3	174,614
32	ми2	E3	164,814
31	ре♯2 (ми♭2)	D♯3/E♭3	155,563
30	ре2	D3	146,832
29	до♯2 (ре♭2)	C♯3/D♭3	138,591
28	до2	C3	130,813
27	си1	B2	123,471
26	ля♯1 (си♭1)	A♯2/B♭2	116,541
25	ля1	A2	110,000
24	соль♯1 (ля♭1)	G♯2/A♭2	103,826
23	соль1	G2	97,9989
22	фа♯1 (соль♭ 1)	F♯2/G♭2	92,4986
21	фа1	F2	87,3071
20	ми1	E2	82,4069
19	ре♯1 (ми♭1)	D♯2/E♭2	77,7817
18	ре1	D2	73,4162
17	до♯1 (ре♭1)	C♯2/D♭2	69,2957
16	до1	C2	65,4064
15	си0	B1	61,7354
14	ля♯0 (си♭0)	A♯1/B♭1	58,2705
*/
