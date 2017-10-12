'use strict';

/* global $$ */

function init() {
  if (!$$.graphics.graphicsAvailable()) {
    // throw new Error("Graphics unavailable");
    return false;
  }

  $$.graphics.enableGraphics(1024, 768, 24);

  debug($$.graphics.displayBuffer.length);

  for (let i = 0; i < $$.graphics.displayBuffer.length; i++) {
    $$.graphics.displayBuffer[i] = 0xff;
  }
  
  return true;
}

module.exports = init;
