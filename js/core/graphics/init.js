'use strict';

function init() {
  if (!$$.graphics.graphicsAvailable()) {
    $$.stdio.defaultStdio.writeError('Graphics unavailable');
    return false;
  }

  $$.graphics.enableGraphics(1024, 768, 24);

  debug($$.graphics.displayBuffer.length);

  $$.graphics.displayBuffer.fill(0xff);
  setTimeout(() => $$.graphics.repaint(), 1000);

  // for (let i = 0; i < $$.graphics.displayBuffer.length; i++) {
  //   $$.graphics.displayBuffer[i] = 0xff;
  // }

  return true;
}

module.exports = init;
