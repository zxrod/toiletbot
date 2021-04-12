const config               = require('../config')
const randomQuote          = require('../lib/randomQuote')
const { global, channels } = config.autoresponder

async function init(bot) {
  await bot.addListener('message', function(nick, to, text) {
    const trigger = global.find(watch => text.includes(watch.trigger))
    if (trigger) bot.say(to, `${ nick }: ${ randomQuote(trigger.responses) }`)
    const channel = channels.find(channel => channel.name === to)
    if (channel) {
      const respond = channel.triggers.find(watch => text.includes(watch.trigger))
      if (respond) bot.say(to, randomQuote(respond.responses))
    }
  })
}

const autoresponder = { init }

module.exports = { autoresponder }