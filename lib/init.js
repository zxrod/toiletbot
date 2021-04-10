const { commandHandler } = require('./commands')
const modules            = require('../modules')
const config             = require('../config')

async function init(bot){
  // listen for pm
  await bot.addListener('pm', function(nick) {
    //TODO (lul) bot.say(nick, 'Type !help for a list of commands')
    bot.say(nick, `I'm a bot.  Go bother ${ config.adminNick } or better yet don't`)
  })

  await bot.addListener('notice', function (nick, to, text, message) {
    if (message.args[1].match(/This nickname is registered/g) !== null) {
      bot.say('NickServ', `identify ${ config.nickservPassword }`)
    }
    if (message.args[1].match(/Password accepted - you are now recognized./g) !== null) {
      bot.join(bot.opt.channels.join(','))
    }
  })

  await bot.addListener('message', function(nick, to, text) {
    // removes ' ' and converts into array
    const args = text.split(' ')

    const opts = { nick, to, text }
    if (args[0].startsWith('!')) commandHandler(args, bot, opts)

  })

  await bot.addListener('error', function(message) {
    console.error(`error: ${ message }`)
  })

  await initModules(bot, modules)

}

function initModules(bot, modules){
  // If module exports an 'init', run it
  for (const [key] of Object.entries(modules)) {
    if (Object.keys(modules[key]).includes('init')) modules[key]['init'](bot)
  }
}

module.exports = { init }