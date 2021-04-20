const { commandHandler } = require('./commands')
const modules            = require('../modules')
const config             = require('../config')

async function init(bot) {
  await pmListener(bot)

  await registerBot(bot)

  await errorListener(bot)

  await commandListener(bot)

  await initModules(bot, modules)
}

// basically pointless right?
async function errorListener(bot) {
  await bot.addListener('error', (message) => {
    console.error(`error: ${ message }`)
  })
}

// respond to ! commands
async function commandListener(bot) {
  await bot.addListener('message', (nick, to, text) => {
    // removes ' ' and converts into array
    const args = text.split(' ')
    const opts = { nick, to, text }
    if (args[0].startsWith('!')) commandHandler(args, bot, opts)
  })
}

// respond to private messages
async function pmListener(bot) {
  await bot.addListener('pm', (nick) => {
    //TODO (lul) bot.say(nick, 'Type !help for a list of commands')
    bot.say(nick, `I'm a bot.  Go bother ${ config.adminNick } or better yet don't`)
  })
}

// appease nickserv
async function registerBot(bot) {
  await bot.addListener('notice', (nick, to, text, message) => {
    if (message.args[1].match(/This nickname is registered/g) !== null) {
      bot.say('NickServ', `identify ${ config.nickservPassword }`)
    }
    if (message.args[1].match(/Password accepted - you are now recognized./g) !== null) {
      bot.join(bot.opt.channels.join(','))
    }
  })

}

// If module exports an 'init' function, run it
async function initModules(bot, modules){
  for (const [key] of Object.entries(modules)) if (Object.keys(modules[key]).includes('init')) await modules[key]['init'](bot)
}

module.exports = { init }