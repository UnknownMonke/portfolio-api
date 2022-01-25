const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Entité
let Counter = new Schema({
  _id: String,
  value: Number
},{
  collection: 'Counter'
});

module.exports = mongoose.model('Counter', Counter);
