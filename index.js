'use strict';

const Writable    = require('stream').Writable;
const PassThrough = require('stream').PassThrough;

class Iterator {
  constructor() {
    this.current = -1;
    this.decrement = 0;
    this.items = [];
  }

  append(item) {
    this.items.push(item);
  }

  remove(item) {
    let index = this.items.indexOf(item);

    if (index < 0) return;

    if (this.current > index) {
      this.current -= 1;
    }

    this.items.splice(index, 1);
  }

  next() {
    this.incrementCurrent();

    return this.items[this.current];
  }


  incrementCurrent() {
    if (this.items.length === 0) {
      this.current = -1;
      return;
    }

    this.current = (this.current + 1) % this.items.length;
  }
}

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
