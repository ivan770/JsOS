'use strict';

const GraphicsRenderer = require('./graphics-renderer');
const { Screen, symbols: screenSymbols } = require('./screen');
const renderers = require('./renderers');
const screen = new Screen();
let secondBuffer = null;

module.exports = {
  get screen() {
    return screen;
  },

  get displayBuffer() {
    return secondBuffer; // renderers.getDefaultRenderer().displayBuffer;//
  },

  get constants() {
    return renderers.getConstants();
  },


  graphicsAvailable() {
    return renderers.renderersAvailable();
  },

  enableGraphics(width, height, bitDepth) {
    secondBuffer = new Uint8Array(width * height * (bitDepth / 8));
    secondBuffer.fill(0xff);
    const renderer = renderers.getDefaultRenderer();
    renderer.enableGraphics(width, height, bitDepth);
    screen[screenSymbols.reset]();
    screen[screenSymbols.init](width, height, bitDepth, renderer);
  },

  repaint() {
    const buf = renderers.getDefaultRenderer().displayBuffer;
    buf.set(secondBuffer);
  },

  setPixel(x, y, r, g, b) {
    /* const dboffset = (x + (y * screen.width)) * 3;
    this.displayBuffer[dboffset + 2] = r;// * 255;
    this.displayBuffer[dboffset + 1] = g;// * 255;
    this.displayBuffer[dboffset] = b;// * 255; */

    const buf = Array.from(this.displayBuffer);// .map((_, i) => colorArray[i % 3]);
    const dboffset = (x + (y * screen.width)) * 3;
    buf[dboffset + 2] = r;// * 255;
    buf[dboffset + 1] = g;// * 255;
    buf[dboffset] = b;// * 255;
    this.displayBuffer.set(buf);
    this.repaint();
  },

  fillScreen(r, g, b, from = 0, to = this.displayBuffer.length) {
    const colorArray = [b, g, r];
    const buf = Array(to - from).map((_, i) => colorArray[i % 3]);
    this.displayBuffer.set(buf, from, to);
    this.repaint();
  },


  GraphicsRenderer,
  addRenderer: renderers.addRenderer,
};
