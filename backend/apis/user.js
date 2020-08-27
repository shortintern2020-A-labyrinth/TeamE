/*  Author : Onggo Barata
 *  User API
 */
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
              $set: { last_login: new Date() }
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

userRouter.post('/:uid/self-intro', (req, res) => {
  client.connect(err => {
    if (err) {
      res.send(err);
    } else {
      const collection = client.db(process.env.DB).collection('users');
      collection.findOneAndUpdate(
        { _id: new ObjectID(req.params.uid) },
        { $set: { self_intro: req.body.message } },
        { returnOriginal: false },
        (err, doc) => err ? res.send(err) : res.send(doc.value)
      );
    }
  });
});

/* ==============
 * Below this part are APIs to interact with user favorites.
 * ============== */
userRouter.post('/:uid/favorites', (req, res) => {
  client.connect(err => {
    if (err) {
      res.send(err);
    } else {
      const collection = client.db(process.env.DB).collection('users');
      collection.findOneAndUpdate(
        { _id: new ObjectID(req.params.uid) },
        { $addToSet: { liked_artists: req.body } },
        { returnOriginal: false },
        (err, doc) => err ? res.send(err) : res.send(doc.value.liked_artists)
      );
    }
  });
});

userRouter.put('/:uid/favorites', (req, res) => {
  client.connect(err => {
    if (err) {
      res.send(err);
    } else {
      const collection = client.db(process.env.DB).collection('users');
      collection.findOneAndUpdate(
        {
          _id: new ObjectID(req.params.uid),
          'liked_artists.id': req.query.aid
        },
        { $set: { 'liked_artists.$': req.body } },
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
        { $pull: { liked_artists: { id: req.query.aid } } },
        { returnOriginal: false },
        (err, doc) => err ? res.send(err) : res.send(doc.value.liked_artists)
      );
    }
  });
});

/* ==============
 * Below this part are followers/following APIs
 * ============== */
userRouter.get('/:uid/following', (req, res) => {
  client.connect(err => {
    if (err) {
      res.send(err);
    } else {
      const collection = client.db(process.env.DB).collection('users');
      const following = collection.findOneAndUpdate(
        { _id: new ObjectID(req.params.uid) },
        { $addToSet: { following: req.query.uid } },
        { returnOriginal: false }
      );
      const follower = collection.findOneAndUpdate(
        { _id: new ObjectID(req.query.uid) },
        { $addToSet: { followers: req.params.uid } },
        { returnOriginal: false }
      );
      Promise.all([following, follower]).then(values => {
        res.send('Follow success!');
      });
    }
  });
});

userRouter.delete('/:uid/following', (req, res) => {
  client.connect(err => {
    if (err) {
      res.send(err);
    } else {
      const collection = client.db(process.env.DB).collection('users');
      const following = collection.findOneAndUpdate(
        { _id: new ObjectID(req.params.uid) },
        { $pull: { following: req.query.uid } },
        { returnOriginal: false }
      );
      const follower = collection.findOneAndUpdate(
        { _id: new ObjectID(req.query.uid) },
        { $pull: { followers: req.params.uid } },
        { returnOriginal: false }
      );
      Promise.all([following, follower]).then(values => {
        res.send('Unfollow success!');
      });
    }
  });
});

module.exports = userRouter;
