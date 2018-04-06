var express = require('express');
var router = express.Router();
var axios = require('axios');
var redis = require('promise-redis')();
var client = redis.createClient(process.env.REDIS_URL);

/* GET translate listing. */
router.post('/add', function (req, res, next) {
  client.get('username')//Redis getting translation
    .then((value) => {
      if (!value) {
        value = '{"words": []}';//An ampty array for new user
      }
      let userData = JSON.parse(value);
      userData.words.push(req.body); //Add new word to userData
      let userDataString = JSON.stringify(userData);
      client.set('username', userDataString)
        .then(() => {
          res.send(JSON.stringify({ status: 'success' }));//Server response
        });
    });
});

router.get('/get', function (req, res, next) {
  client.get('username')//Redis returns saved translation
    .then((value) => {
      res.send(value);
    });
});

module.exports = router;
