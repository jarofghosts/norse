var test = require('tape')

var norse = require('../')

test('properly converts morse to timings', function(t) {
  t.plan(8)

  var norseStream = norse()
  var count = 1

  norseStream.on('data', function(chunk) {
    if(count < 3 || count === 7 || count === 8) {
      t.deepEqual(chunk, [500, 500])
    } else if(count === 3) {
      t.deepEqual(chunk, [500, 1500])
    } else if(count === 4 || count === 5) {
      t.deepEqual(chunk, [1500, 500])
    } else if(count === 6) {
      t.deepEqual(chunk, [1500, 1500])
    } else if(count === 7) {
      t.deepEqual(chunk, [500, 3500])
    }

    count++
  })

  norseStream.write('... --- ...')
})

test('configurable time unit', function(t) {
  t.plan(8)

  var norseStream = norse(1)
  var count = 1

  norseStream.on('data', function(chunk) {
    if(count < 3 || count === 7 || count === 8) {
      t.deepEqual(chunk, [1, 1])
    } else if(count === 3) {
      t.deepEqual(chunk, [1, 3])
    } else if(count === 4 || count === 5) {
      t.deepEqual(chunk, [3, 1])
    } else if(count === 6) {
      t.deepEqual(chunk, [3, 3])
    } else if(count === 7) {
      t.deepEqual(chunk, [1, 7])
    }

    count++
  })

  norseStream.write('... --- ...')
})
