const spotifyRouter = require('express').Router();
const request = require('request');
const BASE_API = 'https://api.spotify.com/v1';

const simplifyArtists = function(artists) {
  return artists.map(artist => ({
    id: artist.id,
    name: artist.name,
    image: artist.images[0],
    genres: artist.genres,
    n_followers: artist.followers.total,
    popularity: artist.popularity
  }));
};

spotifyRouter.get('/search-artist', (req, res) => {
  const searchOptions = {
    url: `${BASE_API}/search`,
    headers: { 'Authorization': 'Bearer ' + req.headers.access_token },
    qs: {
      q: req.query.name,
      type: 'artist'
    },
    json: true
  };

  request.get(searchOptions, (error, response, body) => {
    if (body.error) {
      res.send(body.error);
    } else {
      res.send({ artists: simplifyArtists(body.artists.items) });
    }
  });
});

spotifyRouter.get('/top-artist', (req, res) => {
  const options = {
    url: `${BASE_API}/me/top/artists`,
    headers: { 'Authorization': 'Bearer ' + req.headers.access_token },
    qs: { time_range: 'long_term' },
    json: true
  };

  request.get(options, (error, response, body) => {
    if (body.error) {
      res.send(body.error);
    } else {
      res.send({ artists: simplifyArtists(body.items) });
    }
  });
});

module.exports = spotifyRouter;
