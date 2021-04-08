const modules = require('../modules')
const config  = require('../config')
function commandHandler(args, bot, opts) {
  const mod          = args[0] ? args[0].substring(1).toLowerCase() : ''
  const command      = args[1] ? args[1].toLowerCase() : ''
  const { nick, to } = opts
  if (Object.keys(modules).includes(mod)) {
    if (nick === config.adminNick) {
      Object.keys(modules[mod]).includes(command) ? modules[mod][command](bot, to) : bot.say(to, `command not found: ${ mod } ${ command }`)
    } else {
      bot.say(to, `YOU HAVE NO POWER HERE ${ nick }`)
    }
  }

}

module.exports = { commandHandler }
