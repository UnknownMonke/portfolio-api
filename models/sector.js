const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Entité
let Sector = new Schema({
  name: String,
  subSector: [{
    id: { type: Number },
    name: { type: String }
  }]
},{
  collection: 'Sector'
});

module.exports = mongoose.model('Sector', Sector);
