var through = require('through')

module.exports = norse

function norse(_time_unit) {
  var time_unit = +(_time_unit || 500),
      norse_stream = through(to_timing)

  var DASH = time_unit * 3 + '',
      DOT = time_unit + '',
      INTER_DOTDASH = time_unit + '',
      INTER_LETTER = time_unit * 3 + '',
      INTER_WORD = time_unit * 7 + ''

  var conversion = {
    '.': DOT,
    '-': DASH,
    '_': DASH
  }

  return norse_stream

  function to_timing(data) {
    var word = data.toString(),
        letters = word.split(' '),
        bit

    for (var i = 0, l = letters.length; i < l; ++i) {
      if (i) norse_stream.queue(INTER_LETTER)
      translate_letters(letters[i])
    }

    norse_stream.queue(INTER_WORD)

    function translate_letters(letter) {
      var bits = letter.split(''),
          bit

      for (var i = 0, l = bits.length; i < l; ++i) {
        if (i) norse_stream.queue(INTER_DOTDASH)
        bit = bits[i]

        norse_stream.queue(conversion[bit])
      }
    }
  }
}