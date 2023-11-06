const express = require('express');

const geographyRoutes = express.Router();

// Import du modèle
let Counter = require('../models/counter');
let Geography = require('../models/geography');
let Repartition = require('../models/Repartition');

// L'entrée de l'API est relative au préfixe global défini dans le server.js
geographyRoutes.route('/get')
  .get(function(req, res) {
    Geography.find(function(error, geographies) {
      if(error) {
        console.log(error);
      } else {
        res.json(geographies);
      }
    });
  });

geographyRoutes.route('/add')
  .post(function(req, res) {
    Counter.findByIdAndUpdate('geographyId', { $inc: { value: 1 } }, { new: 'true' })
      .then(result => {
        const geography = new Geography({
          _id: result.value,
          name: req.body.name,
        });

        geography.save() // Persistence
          .then(geography => {
            res.status(200).json(geography);
          })
          .catch(error => {
            console.log(error);
            res.status(400).send("unable to save to database");
          });
      });
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

        //TODO variable shadowing, use promises or await async

        geography.save() // Save crée le document ou l'update s'il existe déjà (document.isNew)
          .then(geography => {
            res.status(200).json('Update complete');
          })
          .catch(error => {
            console.log(error);
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
          //Remove geography in all repartitions
          /*Repartition.deleteMany({ type: 'Geo', exposureId: req.params.id }, function(error) {
            if(error) {
              console.log(error);
              res.status(500).json(error);

            } else {
              res.status(200).json('Successfully removed');
            }
          });*/
        }
    });
  });

module.exports = geographyRoutes;
