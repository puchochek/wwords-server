var express = require('express');
var router = express.Router();
var axios = require('axios');
var redis = require('promise-redis')();
var client = redis.createClient(process.env.REDIS_URL);
var googleController = require('./googleController');

/* GET translate listing. */
router.post('/add', function (req, res, next) {

  googleController.getEmailByToken(req.body.token)
    .then((email) => {
      console.log(777, req.body.token, email);
      client.get(email)//Redis getting translation
        .then((value) => {
          if (!value) {
            value = '{"words": []}';//An ampty array for new user
          }
          let userData = JSON.parse(value);
          userData.words.push(req.body); //Add new word to userData
          let userDataString = JSON.stringify(userData);
          client.set(email, userDataString)
            .then(() => {
              res.send(JSON.stringify({ status: 'success' }));//Server response
            });
        });
    });


});

router.get('/get', function (req, res, next) {
  googleController.getEmailByToken(req.query.token)
    .then((email) => {
      console.log(999, email);
      if (email) {
        client.get(email)//Redis returns email
          .then((value) => {
            res.send(value);
          });
      } else {
        res.send([]);
      }

    });

});

module.exports = router;
