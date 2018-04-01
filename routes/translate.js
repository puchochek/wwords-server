var express = require('express');
var router = express.Router();
var axios = require('axios');
var redis = require('promise-redis')();
var client = redis.createClient(process.env.REDIS_URL);

/* GET translate listing. */
router.get('/', function (req, res, next) {
  
  client.set('mykey', 'myvalue')
    .then(console.log)
    .catch(console.log)

  let word = req.query.word;
  axios.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + process.env.KEY + '&lang=en-ru&text=' + word)
    .then(function (response) {

      console.log(response.data.def);

      let words = [];
      response.data.def.forEach(defPosition => {
        defPosition.tr.forEach(tr => {
          words.push(tr.text);
        });
      });

      let result = {
        words: words
      };

      res.send(JSON.stringify(result));
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
