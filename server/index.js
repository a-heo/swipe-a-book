const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello world');
});

app.listen(port, () => {
  console.log(`you are listening in on port ${port}`);
});
