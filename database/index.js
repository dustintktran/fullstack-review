const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error Connecting To Database'));
db.once('open', () => {
  console.log('Connection to Mongo Established');
})

let repoSchema = mongoose.Schema({
  id: Number,
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
        return console.log(err);
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

module.exports.save = save;




// let aRepo = new Repo({
  //   id: 1,
  //   name: 'BillysRepo',
  //   html_url: '',
  //   watchers: 5,
  //   owner: 'Billy',
  //   owner_id: 1,
  //   avatar_url: '',
  //   owner_url: '',
  //   owner_api: ''
  // })


  // let repoSchema = mongoose.Schema({
  //   id: Number,
  //   name: String,
  //   html_url: String,
  //   watchers: Number,
  //   owner: String,
  //   owner_id: Number,
  //   avatar_url: String,
  //   owner_url: String,
  //   owner_api: String
  // });

  // let Repo = mongoose.model('Repo', repoSchema);

    // aRepo.save((err, aRepo) => {
  //   if(err) {
  //     return console.log(err)
  //   } else {
  //     console.log(aRepo.name)
  //   }
  // })
  // console.log(aRepo.name)