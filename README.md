norse
====

[![Build Status](https://travis-ci.org/jarofghosts/norse.png?branch=master)](https://travis-ci.org/jarofghosts/norse)

convert morse code characters into timings

## example

```js
var norse = require('norse'),
    morse = require('morse-stream'),
    flashlight = require('fake-light-flashing-module'),
    fs = require('fs')

fs.createReadStream('goosebumps.txt')
  .pipe(morse())
  .pipe(norse(100)) // optional time unit parameter, defaults to 500
  .pipe(flashlight()) // pretend this flashes a light based on timing
```

## another example

```js
var norse = require('norse'),
    concat = require('concat-stream'),
    fs = require('fs')

fs.createReadStream('sos-in-morse-code.txt')
  .pipe(norse(1))
  .pipe(concat(display_timings))

function display_timings(timings) {
  console.log(timings)
  // [1, 1, 1, 1, 1, 3, 3, 1, 3, 1, 3, 3, 1, 1, 1, 1, 1, 7]
}
```

## notes

emits arrays for timing as `[time_on, time_off]`

accepts a stream of words, with letters separated by space. dots should be
represented with `'.'` and dashes by either `'-'` or `'_'`. For example, SOS
could be represented by `'... --- ...'`.

as per [Morse code wikipedia entry](http://en.wikipedia.org/wiki/Morse_code#Representation.2C_timing_and_speeds)
dots and times between elements are one time unit in length. dashes and times
between letters are three time units in length. time between words is seven
time units in length.

## license

MIT
