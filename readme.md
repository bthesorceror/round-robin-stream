# Round Robin Stream

Allows for data to be pipe through multiple streams in a round robin fashion

## Installation

```bash
npm install round-robin-stream
```

## Example

```js
const RoundRobinStream = require('round-robin-stream');

let stream = new RoundRobinStream();

var outlet1 = stream.createReadStream();
var outlet2 = stream.createReadStream();

stream.write('a'); // goes to outlet1
stream.write('b'); // goes to outlet2
stream.write('c'); // goes to outlet1

outlet2.destroy(); // removes outlet2 from rotation
```
