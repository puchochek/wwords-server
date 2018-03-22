var express = require('express');
var router = express.Router();
var axios = require('axios');

/* GET translate listing. */
router.get('/', function (req, res, next) {
  let word = req.query.word;
  axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + process.env.KEY + '&text=' + word + '&lang=en-ru')
    .then(function (response) {
      console.log(response.data.text[0]);
      let result = {
        word: response.data.text[0]
      };
      res.send(JSON.stringify(result));
    })
    .catch(function (error) {
      console.log(error);
    });
});

module.exports = router;
