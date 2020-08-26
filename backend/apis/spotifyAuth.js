const spotifyAuthRouter = require('express').Router();
const request = require('request');
const querystring = require('querystring');
const cookieParser = require('cookie-parser');

const client_id = process.env.SPOTIFY_ID;
const client_secret = process.env.SPOTIFY_SECRET;
const redirect_uri = `http://localhost:${process.env.PORT}/auth/callback`;

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
const generateRandomString = function(length) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let text = '';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const stateKey = 'spotify_auth_state';
spotifyAuthRouter.use(cookieParser());

spotifyAuthRouter.get('/login', (req, res) => {
  let state = generateRandomString(16);
  res.cookie(stateKey, state);

  // Requests authorization
  let scope = ['user-read-private', 'user-read-email', 'user-top-read',
               'streaming', 'user-read-currently-playing',
               'user-read-playback-state', 'user-modify-playback-state'
              ].join(' ');
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

spotifyAuthRouter.get('/callback', (req, res) => {
  // Requests refresh and access tokens after checking the state parameter
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.send({ error: 'state_mismatch' });
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token,
            refresh_token = body.refresh_token;

        // Send back the access token
        res.redirect('http://localhost:8080?' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token,
            expires_in: body.expires_in
        }));
      } else {
        res.redirect('http://localhost:8080?' +
          querystring.stringify({ error: 'invalid_token' })
        );
      }
    });
  }
});

spotifyAuthRouter.get('/refresh_token', (req, res) => {
  // Requesting access token from refresh token
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

module.exports = spotifyAuthRouter;
