const app = require('express')();
const LINEBot = require('line-messaging');
require('dotenv').config({ path: __dirname + '/.env' })

const bot = LINEBot.Client({
  channelID: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

app.use(bot.webhook('/webhook'));

bot.on(LINEBot.Events.MESSAGE, function (replyToken, message) {
  console.log(message.getEvent())
  console.log(Object.keys(message))
  console.log()
});

bot.on(LINEBot.Events.FOLLOW, async function (replyToken, message) {
  console.log(message.getEvent())
  console.log(Object.keys(message))
  console.log()
  await bot.replyTextMessage(replyToken, 'Your user ID is below')
  await bot.pushTextMessage(message.getUserId(), message.getUserId())
});

app.get('/test', (req, res) => {
  return res.sendStatus(200)
})
app.listen(8080);