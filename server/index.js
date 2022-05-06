const express = require('express');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');
const cors = require('cors');
const formData = require("express-form-data");
const Routers = require('./router');
const db = require('../database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(formData.parse())
app.use(expressStaticGzip(`${__dirname}/../client/dist`));
app.use(cors());
app.use('/', Routers);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});
app.get('*.js', (req, res, next) => {
  if (req.header('Accept-Encoding').includes('br')) {
    req.url += '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
  }
  next();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});