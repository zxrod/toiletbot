const Parser       = require('rss-parser')
const parser       = new Parser()
const config       = require('../config')
const randomQuote  = require('../lib/randomQuote')

const subwatchConfig                     = config.subwatch
const  { snark, channels, refreshRate }  = subwatchConfig
let now                                  = Date.now()
let interval                             = {}

// runs at bot startup
async function init(bot) {
  const startChans = channels.filter(channel => channel.defaultState === 'on')
  for (const chan of startChans) await startSubWatch(bot, chan.name)
}

const start = (bot, chan) =>
  setInterval(() =>{
    const chanSettings = channels.find(channel => channel.name === chan)
    for (const sub of chanSettings.subs) {
      rssFeed(now, sub).then((newItems) => {
        console.log(`refreshed subwatch for ${ chan } - ${ sub }`)
        if (newItems.length > 0) {
          now = Date.now()
          for (const shitpost of newItems) bot.say(chan, shitpost)
        }
      })
    }
  }, refreshRate)

async function startSubWatch(bot, chan){
  if (channels.find(channel => channel.name === chan)) {
    if (!Object.keys(interval).includes(chan)) {
      now = Date.now()
      interval[chan] = await start(bot, chan)
    } else {
      bot.say(chan, `SubWatch is already running in ${ chan }`)
    }
  } else {
    bot.say(chan, `No subs being watched in ${ chan }, add subs to the config file`)
  }
}

function stopSubWatch(bot, chan){
  console.log('not stopping this shit')
  clearInterval(interval[chan])
  delete interval[chan]
}

async function rssFeed(latest, sub) {
  let newItems = []
  const feed   = await parser.parseURL(`https://www.reddit.com/r/${ sub }/new.rss`)
  for (const item of feed.items) {
    const date = new Date(item.pubDate)
    if (date > latest) newItems.push(`${ randomQuote(snark) }: r/${ sub } - ${ item.author } - ${ item.title } - ${ item.link }`)
  }

  return newItems
}

const subwatch = { start: startSubWatch, stop: stopSubWatch, init }

module.exports = { subwatch }
