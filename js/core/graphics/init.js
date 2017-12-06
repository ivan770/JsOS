'use strict';

function init() {
  if (!$$.graphics.graphicsAvailable()) {
    console.log('Graphics unavailable');
    return false;
  }

  $$.graphics.enableGraphics(1024, 768, 24);

  debug($$.graphics.displayBuffer.length);

  $$.graphics.displayBuffer.fill(0xff);
  $$.graphics.repaint();

  // for (let i = 0; i < $$.graphics.displayBuffer.length; i++) {
  //   $$.graphics.displayBuffer[i] = 0xff;
  // }

  return true;
}

module.exports = init;
