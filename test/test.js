var norse = require('../'),
    stream = require('stream'),
    assert = require('assert'),
    ws = stream.Writable(),
    rs = stream.Readable(),
    count = 1

rs._read = function() {
  rs.push('... --- ...')
  rs.push(null)
}

ws._write = function (chunk, enc, next) {
  var data = chunk.toString()
  if (count < 6 || (count > 12 && count < 18) || count === 8 || count === 10) {
    assert.strictEqual(data, '500')
  }
  if (count === 6 || count === 7 || count === 9 || count === 11 ||
      count === 12) {
    assert.strictEqual(data, '1500')
  }
  if (count === 18) assert.strictEqual(data, '3500')
  count++
  next()
}

rs.pipe(norse()).pipe(ws)


500
500
500
500
500
1500
1500
500
1500
500
1500
1500
500
500
500
500
500
3500
