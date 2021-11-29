const express = require('express');

const sectorRoutes = express.Router();

// Import du modèle
let Counter = require('../models/counter');
let Sector = require('../models/Sector');

sectorRoutes.route('/get')
  .get(function(req, res) {
    Sector.find(function(error, sectors) {
      if(error) {
        console.log(error);
      } else {
        res.json(sectors);
      }
    });
  });

// Ajout secteur majeur ou mineur
sectorRoutes.route('/add')
  .post(function(req, res) {

    Counter.findByIdAndUpdate('sectorId', { $inc: { value: 1 } }, { new: 'true' })
      .then(result => {
        const sector = new Sector({
          _id: result.value,
          name: req.body.name,
          level: req.body.level,
          parentId: req.body.parentId,
        });

        sector.save() // Persistence
          .then(sector => {
            res.status(200).json(sector);
          })
          .catch(error => {
            console.log(error);
            res.status(400).send("unable to save to database");
          });
      });
  });

sectorRoutes.route('/update/:id')
  .post(function (req, res) {
    Sector.findById(req.params.id, function(error, sector) { // id = paramètre de la requête et non id contenue dans le body
      if(error) {
        console.log(error);
        res.status(500).json(error);
      } else if(!sector) {
        res.status(404).send("Record not found");
      } else {
        // Update
        sector.name = req.body.name;

        sector.save()
          .then(sector => {
            res.status(200).json('Update complete');
          })
          .catch(error => {
            console.log(error);
            res.status(400).send("unable to update the database");
          });
      }
    });
  });

sectorRoutes.route('/delete/:id')
  .delete(function (req, res) {
    Sector.findByIdAndRemove({ _id: req.params.id }, function(error, sector){
        if(error) {
          console.log(error);
          res.status(500).json(error);
        } else {
          res.status(200).json('Successfully removed');
        }
    });
  });

module.exports = sectorRoutes;
