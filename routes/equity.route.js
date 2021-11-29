const express = require('express');

const equityRoutes = express.Router();

// Import du modèle
let Equity = require('../models/equity');

equityRoutes.route('/get')
  .get(function(req, res) {
    Equity.find(function(error, equities) {
      if(error) {
        console.log(error);
      } else {
        res.json(equities);
      }
    })
  });

// Ne retourne rien car l'id est gérée côté client
equityRoutes.route('/add')
  .post(function(req, res) {
    const equities = req.body
      .map(el => new Equity(el));

    if(equities.length > 0) {

      Equity.insertMany(equities) // Persistence
        .then(equity => {
          res.status(200);
        })
        .catch(error => {
          console.log(error);
          res.status(400).send("unable to save to database");
        })
    }
  });

// Update uniquement une array d'entités, n'update pas les expositions
equityRoutes.route('/update')
  .post(function (req, res) {
    const updatedEquities = [];

    Equity.find({
      '_id': { $in: req.body.map(equity => equity._id) }, // Objet d'entrée: Equity sans les répartitions
      function(error, equities) {
        if(error) {
          console.log(error);
          res.status(500).json(error);
        } else if(!equities) {
          res.status(404).send("Record not found");
        } else {
          equities.forEach(equity => {
            const correspondingEquityRaw = equitiesRaw.filter(el => el._id = equity._id)[0];

            for(const property in correspondingEquityRaw) {
              equity[property] = correspondingEquityRaw[property];
            }
            updatedEquities.push(equity);
          });

          updatedEquities.save()
            .then(sector => {
              res.status(200).json('Update complete');
            })
            .catch(error => {
              console.log(error);
              res.status(400).send("unable to update the database");
            });
        }
      }
    });
  });

module.exports = equityRoutes;
