const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Equity = new Schema({
  _id: String,
  brokerId: String,
  name: String,
  ticker: String,
  type: String,
  active: Boolean,
  currency: String,
  quantity: Number,
  amount: Number,
  source: String,
  markForUpdate: Boolean,
  geographyExposure: [{
    geographyId: Number,
    exposure: Number
  }],
  SectorExposure: [{
    sectorId: Number,
    exposure: Number
  }]
},{
  collection: 'Equity'
});

module.exports = mongoose.model('Equity', Equity);
