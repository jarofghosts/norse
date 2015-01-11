norse
=====

[![Build Status](http://img.shields.io/travis/jarofghosts/norse/master.svg?style=flat)](https://travis-ci.org/jarofghosts/norse)
[![npm install](http://img.shields.io/npm/dm/norse.svg?style=flat)](https://www.npmjs.org/package/norse)

convert morse code characters into timings

## example

```js
var fs = require('fs')

var flashlight = require('fake-light-flashing-module')
  , morse = require('morse-stream')
  , norse = require('norse')

fs.createReadStream('goosebumps.txt')
  .pipe(morse())
  .pipe(norse(100)) // optional time unit parameter, defaults to 500
  .pipe(flashlight()) // pretend this flashes a light based on timing
```

## another example

```js
var fs = require('fs')

var concat = require('concat-stream')
  , norse = require('norse')

fs.createReadStream('sos-in-morse-code.txt')
  .pipe(norse(1))
  .pipe(concat(displayTimings))

function displayTimings(timings) {
  console.log(timings)
  // [1, 1, 1, 1, 1, 3, 3, 1, 3, 1, 3, 3, 1, 1, 1, 1, 1, 7]
}
```

## notes

emits arrays for timing as `[timeOn, timeOff]`

accepts a stream of words, with letters separated by space. dots should be
represented with `'.'` and dashes by either `'-'` or `'_'`. For example, SOS
could be represented by `'... --- ...'`.

as per [Morse code wikipedia entry](http://en.wikipedia.org/wiki/Morse_code#Representation.2C_timing_and_speeds)
dots and times between elements are one time unit in length. dashes and times
between letters are three time units in length. time between words is seven
time units in length.

## license

MIT
