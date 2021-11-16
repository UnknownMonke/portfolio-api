const express = require('express');
const app = express();
const geographyRoutes = express.Router();

//import du modèle
let Geography = require('../models/geography');

geographyRoutes.route('/api/geography/add')
  .post(function(request, response) {
    let geography = new Geography(request.body);

    geography.save() //persistence
      .then(geography => {
        response.status(200).json({'Geography': 'Geography has been saved successfully'});
      })
      .catch(err => {
        response.status(400).send("unable to save to database");
      })
  });

  geographyRoutes.route('/api/geography/get')
  .get(function(request, response) {

  });
