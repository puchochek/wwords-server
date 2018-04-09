var axios = require('axios');

function translateWord(word) {
  return axios.get('https://dictionary.yandex.net/api/v1/dicservice.json/lookup?key=' + process.env.KEY_WORD + '&lang=en-ru&text=' + word)
    .then((response) => {

      let words = [];//Got all translations from def
      response.data.def.forEach(defPosition => {
        defPosition.tr.forEach(tr => {
          words.push(tr.text);
        });
      });

      return words;//Return new array of words
    })
    .catch((error) => {
      return 'Ooops! I didn\'t find anything. ' + error.response.data.message;
    });
}

function translatePhrase(word) {
  return axios.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + process.env.KEY_PHRASE + '&lang=en-ru&text=' + word)
    .then((response) => {
      let words = [];//Got all translations from def
      words.push(response.data.text[0]);
      return words;//Return new array of words
    })
    .catch((error) => {
      return 'Ooops! I didn\'t find anything. ' + error.response.data.message;
    });
}

module.exports = {
  translateWord: translateWord,
  translatePhrase: translatePhrase
};
