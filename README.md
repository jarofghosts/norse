norse
====

convert morse code characters into timings

## example

```js
var norse = require('norse'),
    flashlight = require('fake-light-flashing-module'),
    fs = require('fs')

fs.createReadStream('morse-codes.txt')
  .pipe(norse(100)) // optional time unit parameter, defaults to 500
  .pipe(flashlight()) // pretend this flashes a light based on timing
```

## notes

emits timings such that every odd emission is "on" and every even emission is
"off".

accepts a stream of words, with letters separated by space. dots should be
represented with `'.'` and dashes by either `'-'` or `'_'`. For example, SOS
could be represented by `'... --- ...'`.

## license

MIT
