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
    this._incrementCurrent();

    return this.items[this.current];
  }


  _incrementCurrent() {
    if (this.items.length === 0) {
      this.current = -1;
      return;
    }

    this.current = (this.current + 1) % this.items.length;
  }
}
