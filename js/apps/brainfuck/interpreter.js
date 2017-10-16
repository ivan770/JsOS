// Brainfuck interpreter for JsOS
// Original: https://github.com/skilldrick/brainfuck-js
// Ported by PROPHESSOR

'use strict';

class Brainfuck {
  constructor(code, input) {
    const self = this;
    this._input = 0;
    this._output = 0;
    this._data = 0;
    this._ptr = 0;
    this.debug = console.log; // ()=>{};
    this._programChars = '';

    this.ops = {
      '+': function () {
        self._data[self._ptr] = self._data[self._ptr] || 0;
        self._data[self._ptr]++;
        debug('+', self._data[self._ptr], self._ptr);
      },

      '-': function () {
        self._data[self._ptr] = self._data[self._ptr] || 0;
        self._data[self._ptr]--;
        debug('-', self._data[self._ptr], self._ptr);
      },

      '<': function () {
        self._ptr--;
        if (self._ptr < 0) {
          self._ptr = 0; // Don't allow pointer to leave data array
        }
        debug('<', self._ptr);
      },

      '>': function () {
        self._ptr++;
        debug('>', self._ptr);
      },

      '.': function () {
        const c = String.fromCharCode(self._data[self._ptr]);
        self._output.push(c);
        debug('.', c, self._data[self._ptr]);
      },

      ',': function () {
        const c = self._input.shift();
        if (typeof c === 'string') {
          self._data[self._ptr] = c.charCodeAt(0);
        }
        debug(',', c, self._data[self._ptr]);
      },
    };

    this.parse(code)(input);
  }

  parse(str) {
    this._programChars = str.split('');
    return this.parseProgram();
  }

  parseProgram() {
    const nodes = [];
    let nextChar;

    while (this._programChars.length > 0) {
      nextChar = this._programChars.shift();
      if (this.ops[nextChar]) {
        nodes.push(this.ops[nextChar]);
      } else if (nextChar === '[') {
        nodes.push(this.parseLoop());
      } else if (nextChar === ']') {
        throw new Error('Missing opening bracket');
      }
    }

    return this.program(nodes);
  }

  program(nodes) {
    return function (inputString) {
      this._output = [];
      this._data = [];
      this._ptr = 0;

      this.input = inputString ? inputString.split('') : [];

      nodes.forEach((node) => {
        node();
      });

      return this._output.join('');
    };
  }


  loop(nodes) {
    return function () {
      let loopCounter = 0;

      while (this._data[this._ptr] > 0) {
        if (loopCounter++ > 10000) {
          throw new Error('Infinite loop detected');
        }

        nodes.forEach((node) => {
          node();
        });
      }
    };
  }

  parseLoop() {
    const nodes = [];
    let nextChar;

    while (this._programChars[0] != ']') {
      nextChar = this._programChars.shift();
      if (typeof nextChar === 'undefined') {
        throw new Error('Missing closing bracket');
      } else if (this.ops[nextChar]) {
        nodes.push(this.ops[nextChar]);
      } else if (nextChar === '[') {
        nodes.push(this.parseLoop());
      }
    }
    this._programChars.shift(); // discard ']'

    return this.loop(nodes);
  }

}

module.exports = Brainfuck;
