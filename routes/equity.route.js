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

equityRoutes.route('/get/:id')
  .get(function(req, res) {
    Equity.findById(req.params.id, function(error, equity) {
      if(error) {
        console.log(error);
      } else {
        res.json(equity);
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
          res.status(200).json('add successful');
        })
        .catch(error => {
          console.log(error);
          res.status(400).send("unable to save to database");
        })
    }
  });

// Update uniquement une array d'entités, n'update pas les exposures
equityRoutes.route('/update')
  .post(function (req, res) {
    const updatedEquities = [];

    Equity.find(
      {
        '_id': { $in: req.body.map(equity => equity._id) } // Objet d'entrée: Equity sans les répartitions
      },
      function(error, equities) {
        if(error) {
          console.log(error);
          res.status(500).json(error);

        } else if(!equities) {
          res.status(404).send("Record not found");

        } else {
          equities.forEach(equity => {
            const correspondingEquityRaw = req.body.filter(el => el._id === equity._id)[0];

            for(const property in correspondingEquityRaw) {
              equity[property] = correspondingEquityRaw[property]; //TODO risque de shallow copy
            }
            updatedEquities.push(equity);
          });

          let saveError = false;

          updatedEquities.forEach(equity =>
            equity.save()
              .catch(error => {
                console.log(error);
                saveError = true;
              })
          );

          if(saveError) {
            res.status(400).send("unable to update the database");
          } else {
            res.status(200).send('Update complete');
          }
        }
      });
  });

// Update une equité unique, seulement l'exposure
//TODO put
equityRoutes.route('/update/:id')
  .post(function (req, res) {
    Equity.findById(req.params.id, function(error, equity) {
      if(error) {
        console.log(error);
        res.status(500).json(error);

      } else if(!equity) {
        res.status(404).send("Record not found");

      } else {
        equity.geography = req.body.geography;
        equity.sectors = req.body.sectors;

        equity.save()
          .then(equity => {
            res.status(200).json('Update complete');
          })
          .catch(error => {
            console.log(error);
            res.status(400).send("unable to update the database");
          });
      }
    });
  });

  equityRoutes.route('/delete/all')
  .delete(function (req, res) {
    Equity.deleteMany({}, function(error) {
      if(error) {
        console.log(error);
        res.status(500).json(error);

      } else {
        res.status(200).json('Update complete');
      }
    });
  });

module.exports = equityRoutes;
