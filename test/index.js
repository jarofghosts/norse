var test = require('tape')

var stream = require('stream')

var norse = require('../')

test('properly converts morse to timings', function(t) {
  t.plan(8)

  var ws = stream.Writable({objectMode: true})
    , rs = stream.Readable()

  var count = 1

  rs._read = function() {
    rs.push('... --- ...')
    rs.push(null)
  }

  ws._write = function (chunk, enc, next) {
    if(count < 3 || count === 7 || count === 8) {
      t.deepEqual(chunk, [500, 500])
    } else if(count === 3) {
      t.deepEqual(chunk, [500, 1500])
    } else if(count === 4 || count === 5) {
      t.deepEqual(chunk, [1500, 500])
    } else if(count === 6) {
      t.deepEqual(chunk, [1500, 1500])
    } else if(count === 7) {
      t.deepEqual([500, 3500])
    }

    count++
    next()
  }

  rs.pipe(norse()).pipe(ws)
})

test('configurable time unit', function(t) {
  t.plan(8)

  var ws = stream.Writable({objectMode: true})
    , rs = stream.Readable()

  var count = 1

  rs._read = function() {
    rs.push('... --- ...')
    rs.push(null)
  }

  ws._write = function (chunk, enc, next) {
    if(count < 3 || count === 7 || count === 8) {
      t.deepEqual(chunk, [1, 1])
    } else if(count === 3) {
      t.deepEqual(chunk, [1, 3])
    } else if(count === 4 || count === 5) {
      t.deepEqual(chunk, [3, 1])
    } else if(count === 6) {
      t.deepEqual(chunk, [3, 3])
    } else if(count === 7) {
      t.deepEqual([1, 7])
    }

    count++
    next()
  }

  rs.pipe(norse(1)).pipe(ws)
})
