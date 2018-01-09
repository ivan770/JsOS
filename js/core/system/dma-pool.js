'use strict';

const {Buffer} = require('buffer');

class DMAPool {
  constructor() {
    this.poolDesc = __SYSCALL.allocDMA();
    this.pool = new Buffer(this.poolDesc.buffer);
    this.offset = 0;
  }
  allocBuffer(size, align = 1) {
    this.offset = Math.ceil(this.offset / align) * align;
    if (this.offset + size > this.poolDesc.size) {
      throw new Error('DMA pool overflow');
      // TODO: allocate new pool instead
    }
    const buf = this.pool.slice(this.offset, this.offset + size);
    const addr = this.poolDesc.address + this.offset;

    this.offset += size;
    return {
      'buffer': buf,
      'address': addr,
      size
    };
  }
}

module.exports = DMAPool;