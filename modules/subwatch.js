const Parser = require('rss-parser')
const parser = new Parser()
const config = require('../config')

const  { snark }  = config
let now           = Date.now()
let interval      = {}

const start = (bot, chan) =>
  setInterval(() =>{
    const chanSettings = config.subwatch.channels.find(channel => channel.name === chan)
    chanSettings.subs.forEach(sub => {
      rssFeed(now, sub).then((newItems) => {
        console.log(`refreshed subwatch for ${chan}`)
        if (newItems.length > 0) {
          now = Date.now()
          newItems.forEach(shitpost => bot.say(chan, shitpost))
        }
      })
    })
  }, 15000)

async function startSubWatch(bot, chan){
  if (config.subwatch.channels.find(channel => channel.name === chan)) {
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

function randomQuote(quote){
  return quote[Math.floor(Math.random()*quote.length)]
}

async function rssFeed(latest, sub) {
  let newItems      = []
  let feed          = await parser.parseURL(`https://www.reddit.com/r/${ sub }/new.rss`)

  feed.items.forEach(item => {
    const date = new Date(item.pubDate)
    if (date > latest) newItems.push(`${ randomQuote(snark) }: ${ item.title } - ${ item.link }`)
  })

  return newItems
}

const subwatch = { start: startSubWatch, stop: stopSubWatch }

module.exports = { subwatch }
