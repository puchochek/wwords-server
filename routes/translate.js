var express = require('express');
var router = express.Router();

/* GET translate listing. */
router.get('/', function(req, res, next) {
  console.log('word: ', req.query.word);
  res.send(req.query.word.toUpperCase());
});

module.exports = router;
