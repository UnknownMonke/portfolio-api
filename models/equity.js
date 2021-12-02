const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Equity = new Schema({
  _id: String,
  name: String,
  ticker: String,
  type: String,
  active: Boolean,
  currency: String,
  quantity: Number,
  amount: Number,
  geography: [
    {
      geography:
        {
          _id: String,
          name: String,
          __v: Number
        },
      exposure: Number
    }
  ],
  sectors: [
    {
      sector:
        {
          _id: Number,
          name: String,
          __v: Number
        },
      exposure: Number
    }
  ]
},{
  collection: 'Equity'
});

module.exports = mongoose.model('Equity', Equity);
