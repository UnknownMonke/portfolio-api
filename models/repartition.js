const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Entité
let Repartition = new Schema({
  equityId: String,
  type: 'Geo' | 'Sec',
  exposureId: Number,
  exposure: Number
},{
  collection: 'Repartition'
});

module.exports = mongoose.model('Repartition', Repartition);
