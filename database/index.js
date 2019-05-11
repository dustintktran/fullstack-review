const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error Connecting To Database'));
db.once('open', () => {
  console.log('Connection to Mongo Established');
})

let repoSchema = mongoose.Schema({
  id: {type: Number, unique: true },
  name: String,
  html_url: String,
  watchers: Number,
  owner: String,
  owner_id: Number,
  avatar_url: String,
  owner_url: String,
  owner_api: String
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoObjects, callback) => { //is an array of objects each representing an array
  let names = [];
  for (var i = 0; i < repoObjects.length; i++) { //loop through each of the objects to save

    let repo = new Repo({
      id: repoObjects[i].id,
      name: repoObjects[i].name,
      html_url: repoObjects[i].html_url,
      watchers: repoObjects[i].watchers,
      owner: repoObjects[i].owner.login,
      owner_id: repoObjects[i].owner.id,
      avatar_url: repoObjects[i].owner.avatar_url,
      owner_url: repoObjects[i].owner.html_url,
      owner_api: repoObjects[i].owner.url
    })

    repo.save((err, repo) => {
      if (err) {
        return console.log('Duplicate repo not added');
      } else {
        names.push(repo.name);
        console.log('Repo w/ name ', repo.name, ' added to mongo');
      }
    })


    if (i === repoObjects.length - 1) {
      callback(names);
    }
  } //END OF FOR LOOP

}

let get25 = (callback) => {
  let query = Repo.find({}).sort({id: -1}).limit(25);
  query.exec((err, data) => {
    callback(data);
  })
}

let clear = (callback) => {
  let query = db.db.dropCollection('repos', callback)
}

module.exports.save = save;
module.exports.get25 = get25;
module.exports.clear = clear;
