#!/usr/bin/env node

// origin https://github.com/F1LT3R/axel

'use strict';

const printer = require("./printer");
// const ansi = require('ansi');
// const cursor = ansi(process.stdout);

// const stdo = process.stdout;
const cols = printer.width;
const rows = printer.height;
let defaultChar = ' ';

const PI2 = Math.PI * 2;

const color = {
  fg: {
    r: 255,
    g: 255,
    b: 255,
  },
  bg: {
    r: 255,
    g: 255,
    b: 255,
  },
};


var axel = {

  // Clears a block
  scrub(x1, y1, w, h) {
    // Turn off the color settings while we scrub
    const oldBrush = this.defaultChar;
    cursor.reset();
    this.defaultChar = ' ';

    this.box(x1, y1, w, h);

    // Put the colors back after
    cursor.fg.rgb(color.fg.r, color.fg.g, color.fg.b);
    cursor.bg.rgb(color.bg.r, color.bg.g, color.bg.b);
    this.defaultChar = oldBrush;
  },


  clear() {
    console.log('\033[2J');
  },


  // Changes the foreground character █ default is [space]
  set brush(character) {
    defaultChar = character || ' ';
  },

  get brush() {
    return defaultChar;
  },


  cursorInterface: {
    on() {
      cursor.show();
    },
    off() {
      cursor.hide();
    },

    // Resets background & foreground colors
    reset() {
      cursor.reset();
    },

    // Restores colors and places cursor after the graphics
    // so that the drawing does not get drawn over when the
    // program ends
    restore() {
      cursor.reset();
      cursor.goto(axel.cols, axel.rows - 1);
    },
  },


  get cursor() {
    return this.cursorInterface;
  },

  get rows() {
    return stdo.rows;
  },

  get cols() {
    return stdo.columns;
  },

  goto(x, y) {
    cursor.goto(parseInt(x), parseInt(y));
  },

  point(x, y, char) {
    if (!(
        x < 0 || y < 0 ||
        x > stdo.columns || y > stdo.rows ||
        x < 0 || y < 0 ||
        x > stdo.columns || y > stdo.rows
      )) {
      cursor.goto(parseInt(x), parseInt(y)).write(char || defaultChar);
    }
  },


  // Get in interpolation point between two points at a given magnitude
  lerp(p1, p2, m) {
    return ((p2 - p1) * m) + p1;
  },


  circ(x, y, m) {
    let res = m * PI2,
      i;

    for (i = 0; i < res; i += 1) {
      const loc = PI2 / res * i;
      this.point(x + Math.sin(loc) * m, y + Math.cos(loc) * m / 2);
    }
  },


  box(x1, y1, w, h) {
    let line = '',
      x,
      y;

    for (x = 0; x < w; x += 1) {
      line += this.brush;
    }

    for (y = 0; y < h; y += 1) {
      cursor.goto(x1, y1 + y).write(line);
    }
  },


  // Get the distance between two points
  dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  },


  // Get all the points along a line and draw them
  line(x1, y1, x2, y2) {
    const D = this.dist(x1, y1, x2, y2) + 1;

    // this.point(x1, y1);
    for (let i = 0; i < D; i++) {
      let m = 1 / D * i,
        x = this.lerp(x1, x2, m),
        y = this.lerp(y1, y2, m);
      this.point(x, y);
    }
    // this.point(x2, y2);
  },

  color(hex, g, b, a) {
    // if
  },

  text(x, y, text) {
    cursor.goto(x, y).write(text);
  },


  // moveTo: function (x, y) {
  //   cursor.moveTo()
  // },


  // Changes foreground color
  fg(r, g, b) {
    cursor.fg.rgb(r, g, b);
  },

  // Changes background color
  bg(r, g, b) {
    cursor.bg.rgb(r, g, b);
  },

  draw(cb) {
    with (this) {
      cb();
    }
  },
};

module.exports = axel;
