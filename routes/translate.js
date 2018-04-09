var express = require('express');
var router = express.Router();
var redis = require('promise-redis')();
var client = redis.createClient(process.env.REDIS_URL);
var yandexController = require('./yandexController');

/* GET translate listing. */
router.get('/', function (req, res, next) {

  //Counting number of translation requests//
  client.get('count')
    .then((value) => {
      if (!value) {
        value = 0;
      }
      value++;
      client.set('count', value);
    });

  let word = req.query.word;
  yandexController.translateWord(word)
    .then((words) => {
      if (words.length) {
        res.send(words);//Return new array of words
      } else {
        yandexController.translatePhrase(word)
          .then((words) => {
            res.send(words);
          });
      }
    });
});

module.exports = router;
