const request = require('request');
const userRouter = require('express').Router();
const ObjectID = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/* ==============
 * Below this part are APIs to interact with a user.
 * ============== */
userRouter.get('/login', (req, res) => {
  const options = {
    url: 'https://api.spotify.com/v1/me',
    headers: { 'Authorization': 'Bearer ' + req.headers.access_token },
    json: true
  };

  request.get(options, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      client.connect(err => {
        if (err) {
          res.send(err);
        } else {
          const collection = client.db(process.env.DB).collection('users');
          collection.findOneAndUpdate(
            { spotify_id: body.id },
            { $setOnInsert: {
                spotify_id: body.id,
                uname: body.display_name || 'Anonymous',
                profile_pic: body.images[0],
                country: body.country,
                email: body.email || 'No public email',
                product: body.product,
                joined_on: new Date(),
                liked_artists: [],
                followers: [],
                following: [],
                self_intro: '',
              },
              $set: { last_login: new Date() },
              $inc: { login_count: 1 }
            },
            { upsert: true, returnOriginal: false },
            (err, doc) => {
              if (err) res.send(err);
              else res.send(doc.value);
            }
          );
        }
      });
    } else {
      res.send(body);
    }
  });
});

userRouter.get('/:uid', (req, res) => {
  client.connect(err => {
    if (err) {
      res.send(err);
    } else {
      const collection = client.db(process.env.DB).collection('users');
      collection.findOne(
        {_id: new ObjectID(req.params.uid)}, {},
        (err, doc) => err ? res.send(err) : res.json(doc)
      );
    }
  });
});

/* ==============
 * Below this part are APIs to interact with user favorites.
 * ============== */
userRouter.put('/:uid/favorites', (req, res) => {
  client.connect(err => {
    if (err) {
      res.send(err);
    } else {
      const collection = client.db(process.env.DB).collection('users');
      collection.findOneAndUpdate(
        { _id: new ObjectID(req.params.uid) },
        { $addToSet: { liked_artists: req.query.aid } },
        { returnOriginal: false },
        (err, doc) => err ? res.send(err) : res.send(doc.value.liked_artists)
      );
    }
  });
});

userRouter.delete('/:uid/favorites', (req, res) => {
  client.connect(err => {
    if (err) {
      res.send(err);
    } else {
      const collection = client.db(process.env.DB).collection('users');
      collection.findOneAndUpdate(
        { _id: new ObjectID(req.params.uid) },
        { $pull: { liked_artists: req.query.aid } },
        { returnOriginal: false },
        (err, doc) => err ? res.send(err) : res.send(doc.value.liked_artists)
      );
    }
  });
});

module.exports = userRouter;
