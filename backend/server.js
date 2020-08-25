'use strict';

const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.get('/', (req, res) => {
  res.send('This is Amato Music Server');
});

app.use('/auth', require('./apis/spotifyAuth'));
app.use('/spotify', require('./apis/spotify'));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Amato Music Server is listening on port ' + listener.address().port);
});
