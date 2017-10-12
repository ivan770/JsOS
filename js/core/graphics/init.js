'use strict';

/* global $$ */

function init() {
  if (!$$.graphics.graphicsAvailable()) {
    // throw new Error("Graphics unavailable");
    return false;
  }

  $$.graphics.enableGraphics(1024, 768, 8);
  
  return true;
}

module.exports = init;
