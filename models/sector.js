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
Counter.findById('sectorId', function(err, res) {
  if(res === null) {
    const initCounter = new Counter({_id: 'sectorId', value: 0});
    initCounter.save()
      .then(res => console.log('counter created'))
      .catch(error => console.log(error));
  }
});

module.exports = mongoose.model('Sector', Sector);
