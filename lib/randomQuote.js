const textStyler = require('./textStyler')

function randomQuote(quotes){
  return textStyler(quotes[Math.floor(Math.random()*quotes.length)])
}

module.exports = randomQuote