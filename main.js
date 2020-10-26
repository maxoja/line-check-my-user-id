const app = require('express')();
const LINEBot = require('line-messaging');
const https = require('https');
const fs = require('fs');
const port = 3001
require('dotenv').config({ path: __dirname + '/.env' })

// middle ware for before every request is passed to an endpoint
app.use((req,res,next)=>{
console.log(req.path);
next();
})

const bot = LINEBot.Client({
  channelID: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

app.use(bot.webhook('/linehook/your-id'));

bot.on(LINEBot.Events.FOLLOW, async function (replyToken, message) {
  console.log(message.getEvent())
  console.log(Object.keys(message))
  console.log()
  await bot.replyTextMessage(replyToken, 'Your user ID is below')
  await bot.pushTextMessage(message.getUserId(), message.getUserId())
});

app.get('/linehook/your-id/test', (req, res) => {
	res.sendStatus(200)
});

app.listen(port)
console.log('server listening to port : ' + port)
