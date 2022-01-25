const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Entité. L'id est autogénérée
let Equity = new Schema({
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
