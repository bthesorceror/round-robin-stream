'use strict';

const test     = require('tape');
const Iterator = require('../iterator');

test('Iterator rotates through items', (t) => {
  t.plan(3);

  let iterator = new Iterator;

  iterator.append('a');
  iterator.append('b');

  t.equal(iterator.next(), 'a', 'returns first value');
  t.equal(iterator.next(), 'b', 'returns second value');
  t.equal(iterator.next(), 'a', 'returns third value');
});

test('Iterator allows removing items', (t) => {
  t.plan(3);

  let iterator = new Iterator;

  iterator.append('a');
  iterator.append('b');
  iterator.append('c');

  t.equal(iterator.next(), 'a', 'returns first value');
  iterator.remove('b');
  t.equal(iterator.next(), 'c', 'returns second value');
  iterator.remove('a');
  t.equal(iterator.next(), 'c', 'returns third value');
});
