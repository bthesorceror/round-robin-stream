'use strict';

const Writable    = require('stream').Writable;
const PassThrough = require('stream').PassThrough;
const Iterator    = require('./iterator');


class RoundRobinStream extends Writable {
  constructor(options) {
    super(options);

    this.options = options;
    this.streams = new Iterator;
  }

  _write(chunk, enc, next){
    let stream = this.streams.next();

    stream.write(chunk);

    next();
  }

  createReadStream() {
    let stream = new PassThrough(this.options);

    this.streams.append(stream);

    stream.destroy = () => {
      this.streams.remove(stream);
    }

    return stream;
  }
}

module.exports = RoundRobinStream;
