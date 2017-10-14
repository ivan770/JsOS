'use strict';

const GraphicsRenderer = require('./graphics-renderer');
const { Screen, symbols: screenSymbols } = require('./screen');
const renderers = require('./renderers');
const screen = new Screen();

module.exports = {
  graphicsAvailable() {
    return renderers.renderersAvailable();
  },
  enableGraphics(width, height, bitDepth) {
    const renderer = renderers.getDefaultRenderer();
    renderer.enableGraphics(width, height, bitDepth);
    screen[screenSymbols.reset]();
    screen[screenSymbols.init](width, height, bitDepth, renderer);
  },
  GraphicsRenderer,
  get screen() {
    return screen;
  },
  get displayBuffer() {
    return renderers.getDefaultRenderer().displayBuffer;
  },
  addRenderer: renderers.addRenderer,
  get constants() {
    return renderers.getConstants();
  },
  setPixel(x, y, r, g, b) {
    const dboffset = (x + y * screen.width) * 3;
    this.displayBuffer[dboffset + 2] = r;// * 255;
    this.displayBuffer[dboffset + 1] = g;// * 255;
    this.displayBuffer[dboffset] = b;// * 255;
  }
};
