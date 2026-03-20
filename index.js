const express = require('express');
const app = express();
app.use(express.json());

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const ALLOWED = 'https://visionsyt99.github.io';

app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', ALLOWED);
  res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.sendStatus(204);
});

app.post('/', async (req, res) => {
  res.header('Access-Control-Allow-Origin', ALLOWED);
  try {
    const { model, payload } = req.body;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_KEY}`;
    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await r.json();
    res.status(r.status).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3000, () => console.log('Proxy running'));
