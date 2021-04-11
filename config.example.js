module.exports = {
  server: 'irc.snoonet.org',
  port: 6697,
  secure: true,
  selfSigned: true,	// accept self signed certificate
  certExpired: true,	// accept expired certificate
  autoConnect: true,
  userNick: '',
  userName: '',
  realName: '',
  adminNick: '',
  channels: [''],
  debug: true,
  showErrors: true,
  floodProtectionDelay: 1000,
  messageSplit: 512,

  // NickServ Password:
  nickservPassword: '',

  /* Style info:
    Responses in arrays can either be a string or object { style, text }
    Style options:
    ['white', 'black', 'navy', 'green', 'red', 'brown', 'purple', 'olive', 'yellow',
     'lime', 'teal', 'cyan', 'blue', 'pink', 'gray', 'grey', 'silver', 'bold', 'italic', 'underline',
     'inverse', 'strikethrough', 'monospace', 'rainbow', 'random']
   */
  // Reddit subs to watch
  subwatch: {
    // rate in ms to refresh the rss feed
    refreshRate: 15000,
    // Bot's opinion of the reddit feed
    snark: [
      { style: 'random',  text: 'STINKY DOODY' },
      { style: 'random',  text: 'PROBABLY A BAD POST' },
      '🚽💩🧻👝🧴',
      '💩💩💩',
      '🚽💩🧻 ALERT',
      { style: 'random',  text: 'CIRCLING THE DRAIN' },
    ],
    channels: [
      {
        name: '#toiletbot',
        defaultState: 'on',
        subs: ['portland']
      }
    ]
  }
}
