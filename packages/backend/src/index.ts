import * as process from 'process';
import { createHmac } from 'crypto';
import * as dotenv from 'dotenv';
import express from 'express';
import got from 'got';
import { Talks } from 'src/modules/talks/index.js';

dotenv.config();

const app = express();
const talks = new Talks(); // service for talks module

app.use(express.json());

app.get('/api/talks', (req, res) => {
  const allTalks = talks.getTalks();

  res.json(allTalks);
});

app.get('/api/talks/:id', (req, res) => {
  const talk = talks.getTalkById(Number(req.params.id));

  res.json(talk);
});

app.put('/api/talks/:id', (req, res) => {
  talks.updateTalk(Number(req.params.id), req.body);

  res.json({ success: true });
});

app.post('/api/talks/create_bad', (req, res) => {
  talks.createTalk(req.body.talk);

  res.json({ success: true });
});

app.post('/api/talks', (req, res) => {
  const botToken = process.env.BOT_TOKEN!;
  const initData = new URLSearchParams(req.body.telegram_init_data);
  const hash = initData.get('hash');
  let dataToCheck: string[] = [];

  // creating an array for the future data-check-string
  initData.sort();
  initData.forEach((val, key) => key !== 'hash' && dataToCheck.push(`${key}=${val}`));

  const dataCheckString = dataToCheck.join('\n');
  const secret = createHmac('sha256', 'WebAppData').update(botToken);
  const resultHash = createHmac('sha256', secret.digest()).update(dataCheckString).digest('hex');

  // comparing the received hash parameter with the hexadecimal representation of the HMAC-SHA-256 signature of the data-check-string
  // with the secret key, which is the HMAC-SHA-256 signature of the bot's token with the constant string WebAppData used as a key.
  if (hash === resultHash) {
    talks.createTalk(req.body.talk);

    got(
      `https://api.telegram.org/bot${botToken}/answerWebAppQuery?web_app_query_id=${initData.get(
        'query_id'
      )}&result={"type": "article", "id": "${initData.get(
        'query_id'
      )}", "message_text": "I've just created a new talk!", "title": "Success!"}`
    );

    return res.json({ success: true });
  }

  res.json({ success: false });
});

app.listen(process.env.PORT, () => {
  console.log(`backend listening at ${process.env.PORT}`);
});
