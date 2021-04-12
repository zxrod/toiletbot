const c        = require('irc-colors')
const c_styles = ['white', 'black', 'navy', 'green', 'red', 'brown', 'purple', 'olive', 'yellow',
  'lime', 'teal', 'cyan', 'blue', 'pink', 'gray', 'grey', 'silver', 'bold', 'italic', 'underline',
  'inverse', 'strikethrough', 'monospace', 'rainbow']

function textStyler(textObj) {
  if (typeof textObj === 'object') {
    const { style, text } = textObj
    if (style === 'random'){
      const randomStyle = c_styles[Math.floor(Math.random()*c_styles.length)]
      console.log(`randomstyle: ${ randomStyle }`)
      return c[randomStyle](text)
    } else {
      return c_styles.includes(style) ? c[style](text) : text
    }
  } else {
    // not an object, should be just a string
    return textObj
  }

}

module.exports = textStyler