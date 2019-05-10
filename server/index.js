const express = require('express');
const db = require('../database/index')
const parser = require('body-parser')
const getRepo = require('../helpers/github.js');
let app = express();
app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  getRepo(req.body.username, (results) => { //results is the 5 repos on a users overview page, similar to data.json
    db.save(JSON.parse(results), (array) => {
      // console.log(array);
      res.send('These repos have been added to the DB: ' + JSON.stringify(array))
    });
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

