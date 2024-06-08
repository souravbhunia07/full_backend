const express = require('express');
require('dotenv').config();
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/twitter', (req, res) => {
    res.send('Twitter');
});

app.get('/login', (req, res) => {
    res.send('<h1>Please login</h1>');
});

app.listen(process.env.PORT, () => {
  console.log('Server is running on http://localhost:3000');
});