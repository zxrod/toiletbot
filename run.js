const config             = require('./config')
const irc                = require('irc-upd')
const { commandHandler } = require('./lib/commands')

const bot = new irc.Client(config.server, config.userNick, {
  port: config.port,
  debug: config.debug,
  secure: config.secure,
  selfSigned: config.selfSigned,
  certExpired: config.certExpired,
  autoConnect: config.autoConnect,
  userNick: config.userNick,
  userName: config.userName,
  realName: config.realName,
  adminNick: config.adminNick,
  channels: config.channels,
  showErrors: config.showErrors,
  floodProtectionDelay: config.floodProtectionDelay,
  messageSplit: config.messageSplit
})

// listen for pm
bot.addListener('pm', function(nick) {
  bot.say(nick, 'Type !help for a list of commands')
})

bot.addListener('notice', function (nick, to, text, message) {
  if (message.args[1].match(/This nickname is registered/g) !== null) {
    bot.say('NickServ', `identify ${ config.nickservPassword }`)
  }
  if (message.args[1].match(/Password accepted - you are now recognized./g) !== null) {
    bot.join(bot.opt.channels.join(','))
  }
})

bot.addListener('message', function(nick, to, text) {
  // removes ' ' and converts into array
  const args = text.split(' ')

  const opts = { nick, to, text }
  if (args[0].startsWith('!')) commandHandler(args, bot, opts)

})

bot.addListener('error', function(message) {
  console.error('error: ', message)
})
