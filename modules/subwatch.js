const Parser = require('rss-parser')
const parser = new Parser()
const config = require('../config')

const subwatchConfig                     = config.subwatch
const  { snark, channels, refreshRate }  = subwatchConfig
let now                                  = Date.now()
let interval                             = {}

const start = (bot, chan) =>
  setInterval(() =>{
    const chanSettings = channels.find(channel => channel.name === chan)
    console.log(refreshRate)
    chanSettings.subs.forEach(sub => {
      rssFeed(now, sub).then((newItems) => {
        console.log(`refreshed subwatch for ${chan}`)
        if (newItems.length > 0) {
          now = Date.now()
          newItems.forEach(shitpost => bot.say(chan, shitpost))
        }
      })
    })
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

function randomQuote(quotes){
  return quotes[Math.floor(Math.random()*quotes.length)]
}

async function rssFeed(latest, sub) {
  let newItems = []
  let feed     = await parser.parseURL(`https://www.reddit.com/r/${ sub }/new.rss`)

  feed.items.forEach(item => {
    const date = new Date(item.pubDate)
    if (date > latest) newItems.push(`${ randomQuote(snark) }: ${ item.title } - ${ item.link }`)
  })

  return newItems
}

const subwatch = { start: startSubWatch, stop: stopSubWatch }

module.exports = { subwatch }
