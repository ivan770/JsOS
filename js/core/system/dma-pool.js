'use strict';

const {Buffer} = require('buffer');

class DMABuffer {
  /**
   * @constructor
   * @param  {Number} address -
   * @param  {Buffer} buffer -
   * @param  {Number} size -
   */
  constructor(address, buffer, size) {
    this.address = address;
    this.buffer = buffer;
    this.size = size;
  }
}

class DMAPool {
  /**
   * @constructor
   */
  constructor() {
    this.poolDesc = __SYSCALL.allocDMA();
    this.pool = new Buffer(this.poolDesc.buffer);
    this.offset = 0;
  }
  /**
   * @param  {Number} size -
   * @param  {Number} [align=1] -
   * @returns {DMABuffer} buffer
   */
  allocBuffer(size, align = 1) {
    this.offset = Math.ceil(this.offset / align) * align;
    if (this.offset + size > this.poolDesc.size) {
      throw new Error('DMA pool overflow');
      // TODO: allocate new pool instead
    }
    const buf = this.pool.slice(this.offset, this.offset + size);
    const addr = this.poolDesc.address + this.offset;

    this.offset += size;
    return new DMABuffer(addr, buf, size);
  }
  /**
   * @returns {class} DMABuffer
   */
  static get DMABuffer() {
    return DMABuffer;
  }
}

module.exports = DMAPool;