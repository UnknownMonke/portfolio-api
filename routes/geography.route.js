const express = require('express');
const geographyRoutes = express.Router();

// Import du modèle
let Geography = require('../models/geography');

// L'entrée de l'API est relative au préfixe global défini dans le server.js
geographyRoutes.route('/add')
  .post(function(req, res) {
    let geography = new Geography(req.body);

    geography.save() // Persistence
      .then(geography => {
        res.status(200).json(geography);
      })
      .catch(error => {
        res.status(400).send("unable to save to database");
      })
  });

geographyRoutes.route('/get')
  .get(function(req, res) {
    Geography.find(function(error, geographies) {
      if(error) {
        console.log(error);
      } else {
        res.json(geographies);
      }
    })
  });

geographyRoutes.route('/update/:id')
  .post(function (req, res) {
    Geography.findById(req.params.id, function(error, geography) { // id = paramètre de la requête et non id contenue dans le body
      if(error) {
        console.log(error);
        res.status(500).json(error);
      } else if(!geography) {
        res.status(404).send("Record not found");
      } else {
        // Update
        geography.name = req.body.name;

        geography.save().then(geography => {
          res.status(200).json('Update complete');
        })
        .catch(error => {
          res.status(400).send("unable to update the database");
        });
      }
    });
  });

geographyRoutes.route('/delete/:id')
  .delete(function (req, res) {
    Geography.findByIdAndRemove({ _id: req.params.id }, function(error, geography){
        if(error) {
          console.log(error);
          res.status(500).json(error);
        } else {
          res.status(200).json('Successfully removed');
        }
    });
  });

module.exports = geographyRoutes;
