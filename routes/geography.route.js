const express = require('express');
const app = express();
const geographyRoutes = express.Router();

//import du modèle
let Geography = require('../models/geography');

//l'entrée de l'API est relative au préfixe global défini dans le server.js
geographyRoutes.route('/add')
  .post(function(request, response) {
    let geography = new Geography(request.body);

    geography.save() //persistence
      .then(geography => {
        response.status(200).json({'Geography': 'Geography has been saved successfully'});
      })
      .catch(error => {
        response.status(400).send("unable to save to database");
      })
  });

geographyRoutes.route('/get')
  .get(function(request, response) {
    Geography.find(function(error, geographies) {
      if(error) {
        console.log(error);
      } else {
        response.json(geographies);
      }
    })
  });

geographyRoutes.route('/update/:id')
  .post(function (request, response) {
    Geography.findById(request.params.id, function(error, geography) {
      if(error) {
        console.log(error);
      } else if(!geography) {
        response.status(404).send("Record not found");
      } else {
        //update
        geography.name = request.body.name;

        geography.save().then(geography => {
          response.json('Update complete');
        })
        .catch(error => {
          response.status(400).send("unable to update the database");
        });
      }
    });
  });

geographyRoutes.route('/delete/:id')
  .get(function (request, response) {
    Geography.findByIdAndRemove({_id: request.params.id}, function(error, geography){
        if(error) response.json(error);
        else response.json('Successfully removed');
    });
  });

module.exports = geographyRoutes;
