const app = require('express')();
const LINEBot = require('line-messaging');
require('dotenv').config({ path: __dirname + '/.env' })

const port = 3001
const endpoint = '/linehook/your-id'

const bot = LINEBot.Client({
  channelID: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

// middle ware for logging path of every request before passing to an endpoint handler
app.use((req,res,next)=>{
  console.log('Incoming request with path', req.path);
  next();
})

app.use(bot.webhook(endpoint));

bot.on(LINEBot.Events.FOLLOW, async function (replyToken, message) {
  //await bot.replyTextMessage(replyToken, 'Your user ID is below')
  await bot.replyTextMessage(replyToken, message.getUserId())
});

app.get(endpoint + '/health', (req, res) => {
  res.sendStatus(200)
});

app.listen(port)
console.log('Server is listening to port : ' + port)
