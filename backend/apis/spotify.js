const spotifyRouter = require('express').Router();
const request = require('request');
const BASE_API = 'https://api.spotify.com/v1';

spotifyRouter.get('/search-artist', (req, res) => {
  const searchOptions = {
    url: `${BASE_API}/search`,
    headers: { 'Authorization': 'Bearer ' + req.headers.access_token },
    qs: {
      q: req.query.name,
      limit: 50,
      type: 'artist'
    },
    json: true
  };

  request.get(searchOptions, (error, response, body) => {
    if (response.body.error) {
      res.send(response.body.error);
    } else {
      const artists = body.artists.items.map(artist => ({
        id: artist.id,
        name: artist.name,
        image: artist.images[0],
        genres: artist.genres,
        n_followers: artist.followers.total,
        popularity: artist.popularity
      }));
      res.send({ artists: artists });
    }
  });
});

module.exports = spotifyRouter;
