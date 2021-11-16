const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//entité
let Geography = new Schema({
  id: {type: Number},
  name: {type: String}
},{
  collection: 'Geography'
});

//création d'un nouveau document (= table)
module.exports = mongoose.model('Geography', Geography);
