const config   = require('./config')
const irc      = require('irc-upd')
const { init } = require('./lib/init')

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

init(bot)

