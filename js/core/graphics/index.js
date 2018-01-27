'use strict';

const GraphicsRenderer = require('./graphics-renderer');
const { Screen, symbols: screenSymbols } = require('./screen');
const renderers = require('./renderers');
const screen = new Screen();
let secondBuffer = null;
let secondBufferView = null;

module.exports = {
  get screen() {
    return screen;
  },

  get displayBuffer() {
    return secondBufferView;
  },

  get constants() {
    return renderers.getConstants();
  },


  graphicsAvailable() {
    return renderers.renderersAvailable();
  },

  enableGraphics(width, height, bitDepth) {
    secondBuffer = new ArrayBuffer(width * height * (bitDepth / 8));
    secondBufferView = new DataView(secondBuffer);
    // secondBuffer.fill(0xff);
    const renderer = renderers.getDefaultRenderer();
    renderer.enableGraphics(width, height, bitDepth);
    screen[screenSymbols.reset]();
    screen[screenSymbols.init](width, height, bitDepth, renderer);
  },

  repaint() {
    const buf = renderers.getDefaultRenderer().displayBuffer;
    buf.set(new Uint8Array(secondBuffer));
  },

  setPixel(x, y, r, g, b) {
    const dboffset = (x + (y * screen.width)) * 3;
    secondBufferView.setInt8(dboffset + 2, r);
    secondBufferView.setInt8(dboffset + 1, g);
    secondBufferView.setInt8(dboffset, b);
    // secondBuffer[dboffset + 2] = r;
    // secondBuffer[dboffset + 1] = g;
    // secondBuffer[dboffset] = b;
  },

  fillScreen(r = 0, g = 0, b = 0) {
    const colorArray = [b, g, r];
    // secondBuffer = (new Uint8Array(secondBuffer.length)).map((_, i) => colorArray[i % 3]);
    for (let i = 0; i < secondBufferView.byteLength; i++) {
      secondBufferView.setInt8(i, colorArray[i % 3]);
    }
  },


  GraphicsRenderer,
  addRenderer: renderers.addRenderer,
};
