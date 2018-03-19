var express = require('express');
var router = express.Router();

/* GET translate listing. */
router.get('/', function (req, res, next) {
  let word = req.query.word;
  let translatedWord = word.toUpperCase();
  let result = {
    word: translatedWord
  };
  res.send(JSON.stringify(result));
});

module.exports = router;
