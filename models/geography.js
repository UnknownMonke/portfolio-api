const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//entité. L'id est autogénérée
let Geography = new Schema({
  name: { type: String }
},{
  collection: 'Geography'
});

//création d'un nouveau document (= table)
module.exports = mongoose.model('Geography', Geography);
