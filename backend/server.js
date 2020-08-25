'use strict';

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.send('This is Amato Music Server');
});

app.use('/auth', require('./apis/spotifyAuth'));
app.use('/spotify', require('./apis/spotify'));

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Amato Music Server is listening on port ' + listener.address().port);
});
