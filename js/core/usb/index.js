'use strict';

class USB {
  constructor() {
    this.controllers = [];
  }
  addController(controller) {
    this.controllers.push(controller);
    debug('Added new USB Controller');
  }
}

module.exports = new USB();