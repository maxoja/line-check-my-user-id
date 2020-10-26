const app = require('express')();
const LINEBot = require('line-messaging');
const https = require('https');
const fs = require('fs');
const port = 3001
require('dotenv').config({ path: __dirname + '/.env' })

//const key = fs.readFileSync(__dirname + '/certs/_.twnz.dev_private_key.key');
//const cert = fs.readFileSync(__dirname + '/certs/twnz.dev_ssl_certificate.cer');
//const ca = fs.readFileSync(__dirname + '/certs/_.twnz.dev_ssl_certificate_INTERMEDIATE.cer');

//const options = {
//  key: key,
//  cert: cert,
//  ca: ca
//};

app.use((req,res,next)=>{
console.log(req.path);
next();//this will invoke next middleware function
})

const bot = LINEBot.Client({
  channelID: process.env.LINE_CHANNEL_ID,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN
});

app.use(bot.webhook('/linehook/your-id'));

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

app.get('/linehook/your-id/test', (req, res) => {
	res.sendStatus(200)
});
//const server = https.createServer(options, app);
//server.listen(port, () => {
//  console.log("server starting on port : " + port)
//});
app.listen(port)
console.log('server listening to port : ' + port)
