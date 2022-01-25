const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Entité. L'id est autogénérée
let User = new Schema({
  username: String,
  password: String,
  email: String
},{
  collection: 'User'
});

module.exports = mongoose.model('User', User);
