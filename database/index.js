const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error Connecting To Database'));
db.once('open', () => {
  console.log('Connection to Mongo Established');

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

  let aRepo = new Repo({
    id: 1,
    name: 'BillysRepo',
    html_url: '',
    watchers: 5,
    owner: 'Billy',
    owner_id: 1,
    avatar_url: '',
    owner_url: '',
    owner_api: ''
  })

  aRepo.save((err, aRepo) => {
    if(err) {
      return console.log(err)
    } else {
      console.log(aRepo.name)
    }
  })
  console.log(aRepo.name)
})



let save = (/* TODO */) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
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