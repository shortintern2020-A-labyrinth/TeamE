/*  Author : Onggo Barata
 *  Main server instance
 */
'use strict';

const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const chatServer = require('./chatServer/ChatServer');
dotenv.config();

const app = express();
app.use(cors())
   .use(express.json());

app.get('/', (req, res) => {
  res.send('This is Amato Music Server');
});

app.use('/auth', require('./apis/spotifyAuth'));
app.use('/user', require('./apis/user'));
app.use('/spotify', require('./apis/spotify'));

const httpServer = http.Server(app);
chatServer(httpServer);

const listener = httpServer.listen(process.env.PORT || 3000, () => {
  console.log('Amato Music Server is listening on port ' + listener.address().port);
});
