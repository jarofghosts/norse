var through = require('through')

module.exports = norse

function norse(_timeUnit) {
  var timeUnit = +(_timeUnit || 500)

  var norseStream = through(to_timing)

  var DASH = timeUnit * 3
    , DOT = timeUnit

  var INTER_DOTDASH = timeUnit
    , INTER_LETTER = timeUnit * 3
    , INTER_WORD = timeUnit * 7

  var conversion = {
      '.': DOT
    , '-': DASH
    , '_': DASH
  }

  return norseStream

  function to_timing(data) {
    var word = data.toString()

    var letters = word.split(' ')
      , buf
      , bit

    for(var i = 0, l = letters.length; i < l; ++i) {
      if(i) norseStream.queue([buf, INTER_LETTER])
      translateLetters(letters[i])
    }

    norseStream.queue([buf, INTER_WORD])

    function translateLetters(letter) {
      var bits = letter.split('')
        , bit

      for(var i = 0, l = bits.length; i < l; ++i) {
        if(i) norseStream.queue([buf, INTER_DOTDASH])

        bit = bits[i]
        buf = conversion[bit]
      }
    }
  }
}
