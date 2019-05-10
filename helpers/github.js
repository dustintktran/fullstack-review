const request = require('request');
const config = require('../config.js');

let getReposByUsername = (name, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API
  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let reqURL = 'https://api.github.com/users/' + name + '/repos';
  
  let options = {
    url: reqURL,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  
  request(options, (err, res, body) => {
    if(err) {
      console.log('Error: ', err);
    } else {
      console.log('Status code: ', res.statusCode);
      callback(body)
    }
  })

}
// getReposByUsername('dustintktran', (results) => console.log(typeof results));

module.exports = getReposByUsername;