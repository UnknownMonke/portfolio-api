const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Entité. L'id est autogénérée
let Geography = new Schema({
  name: String // Shorthand for { type: String }
},{
  collection: 'Geography'
});

module.exports = mongoose.model('Geography', Geography);
