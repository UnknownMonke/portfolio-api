const mongoose = require('mongoose');
const Counter = require('./counter');
const Schema = mongoose.Schema;

// Entité. L'id est autogénérée
let Geography = new Schema({
  _id: Number,
  name: String // Shorthand for { type: String }
},{
  collection: 'Geography'
});

// Création du counter
Counter.findById('geographyId', function(err, res) {
  if(res === null) {
    const initCounter = new Counter({_id: 'geographyId', value: 0});
    initCounter.save()
      .then(res => console.log('counter created'))
      .catch(error => console.log(error));
  }
});

module.exports = mongoose.model('Geography', Geography);
