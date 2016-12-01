'use strict';

module.exports = class Iterator {
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
    this.current = this._calculateNextCurrent();

    return this.items[this.current];
  }

  peek() {
    return this.items[this._calculateNextCurrent()];
  }

  _calculateNextCurrent() {
    if (this.items.length === 0) {
      return -1;
    }

    return (this.current + 1) % this.items.length;
  }
}
