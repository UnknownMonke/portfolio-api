const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Equity = new Schema({
    equityId: {type: Number},
    name: {type: String},
    ticker: {type: String},
    type: {type: String},
    active: {type: Boolean},
    currency: {type: String},
    quantity: {type: Number},
    amount: {type: Number}
},{
    collection: 'Equity'
});

