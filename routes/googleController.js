var axios = require('axios');

function getEmailByToken(token) {
  return axios.get('https://www.googleapis.com/oauth2/v3/userinfo', { headers: { Authorization: `Bearer ${token}` } })
    .then((response) => {
      console.log(666, response.data);
      return response.data.email;
    })
    .catch((error) => {
      return false;
    });
}

module.exports = {
  getEmailByToken: getEmailByToken,
};
