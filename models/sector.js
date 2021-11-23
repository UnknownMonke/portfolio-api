const mongoose = require('mongoose');
const Counter = require('./counter');
const Schema = mongoose.Schema;

// Entité
let Sector = new Schema({
  _id: Number,
  name: String,
  level: Number,
  parentId: Number
},{
  collection: 'Sector'
});

// Création du counter
const initCounter = new Counter({_id: 'sectorId', value: 1});
initCounter.save()
  .catch(error => console.log('error saving the counter'))

module.exports = mongoose.model('Sector', Sector);
