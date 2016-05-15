'use strict';

const test             = require('tape');
const RoundRobinStream = require('../');

test('writes out to output stream', (t) => {
  t.plan(1);

  let rrstream = new RoundRobinStream();
  let stream   = rrstream.createReadStream();

  stream.on('data', (data) => {
    t.equal(data.toString(), 'hello, world');
  });

  rrstream.write('hello, world');
});

test('writes out to output streams in order', (t) => {
  t.plan(3);

  let rrstream = new RoundRobinStream();
  let stream1  = rrstream.createReadStream();
  let stream2  = rrstream.createReadStream();

  stream1.once('data', (data) => {
    t.equal(data.toString(), 'hello, world');

    stream1.once('data', (data) => {
      t.equal(data.toString(), 'hello again');
    });
  });

  stream2.once('data', (data) => {
    t.equal(data.toString(), 'goodbye, world');
  });

  rrstream.write('hello, world');
  rrstream.write('goodbye, world');
  rrstream.write('hello again');
});

test('handles removals correctly', (t) => {
  t.plan(4);

  let rrstream = new RoundRobinStream();
  let stream1  = rrstream.createReadStream();
  let stream2  = rrstream.createReadStream();
  let stream3  = rrstream.createReadStream();
  let stream4  = rrstream.createReadStream();

  stream1.once('data', (data) => {
    t.equal(data.toString(), 'hello, world');
    stream1.once('data', (data) => {
      t.equal(data.toString(), 'goodbye again');
    });
  });

  stream2.once('data', (data) => {
    t.equal(data.toString(), 'goodbye, world');
  });

  stream4.once('data', (data) => {
    t.equal(data.toString(), 'hello again');
  });

  rrstream.write('hello, world');
  rrstream.write('goodbye, world');
  stream3.destroy();
  rrstream.write('hello again');
  rrstream.write('goodbye again');
});

test('handles removals correctly in all cases', (t) => {
  t.plan(1);

  let rrstream = new RoundRobinStream();
  let stream1  = rrstream.createReadStream();
  let stream2  = rrstream.createReadStream();
  let stream3  = rrstream.createReadStream();
  let stream4  = rrstream.createReadStream();

  rrstream.write('hello, world');
  rrstream.write('goodbye, world');

  stream1.destroy();

  stream3.once('data', (data) => {
    t.equal(data.toString(), 'hello again');
  });

  rrstream.write('hello again');
  rrstream.write('goodbye again');
});
