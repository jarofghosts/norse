var norse = require('../'),
    stream = require('stream'),
    assert = require('assert'),
    ws = stream.Writable({ objectMode: true }),
    rs = stream.Readable(),
    count = 1

rs._read = function() {
  rs.push('... --- ...')
  rs.push(null)
}

ws._write = function (chunk, enc, next) {
  if (count < 3 || count === 7 || count === 8) {
    assert.deepEqual(chunk, [500, 500])
  } else if (count === 3) {
    assert.deepEqual(chunk, [500, 1500])
  } else if (count === 4 || count === 5) {
    assert.deepEqual(chunk, [1500, 500])
  } else if (count === 6) {
    assert.deepEqual(chunk, [1500, 1500])
  } else if (count === 7) {
    assert.deepEqual([500, 3500])
  }

  count++
  next()
}

rs.pipe(norse()).pipe(ws)
