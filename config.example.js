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

  // Reddit subs to watch
  subwatch: {
    // rate in ms to refresh the rss feed
    refreshRate: 15000,
    // Bot's opinion of the reddit feed
    snark: ['STINKY DOODY', 'PROBABLY A BAD POST', '🚽💩🧻👝🧴', '💩💩💩', '🚽💩🧻 ALERT', 'CIRCLING THE DRAIN'],
    channels: [{
      name: '#channel',
      subs: ['portland']
    }]
  }
}
