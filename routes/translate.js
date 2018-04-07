var express = require('express');
var router = express.Router();
var axios = require('axios');
var redis = require('promise-redis')();
var client = redis.createClient(process.env.REDIS_URL);

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
  axios.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + process.env.KEY + '&lang=en-ru&text=' + word)
    .then((response) => {

      let words = [];//Got all translations from def
      response.data.def.forEach(defPosition => {
        defPosition.tr.forEach(tr => {
          words.push(tr.text);
        });
      });

      res.send(words);//Return new array of words
    })
    .catch((error) => {
      res.send('Ooops! I didn\'t find anything. ' + error.response.data.message);
    });
});

module.exports = router;
