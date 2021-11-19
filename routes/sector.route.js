const express = require('express');
const sectorRoutes = express.Router();

// Import du modèle
let Sector = require('../models/Sector');

// Ajout secteur majeur
sectorRoutes.route('/main/add')
  .post(function(req, res) {
    let sector = new Sector(req.body);

    sector.save() // Persistence
      .then(sector => {
        res.status(200).json(sector);
      })
      .catch(error => {
        res.status(400).send("unable to save to database");
      })
  });

sectorRoutes.route('/get')
  .get(function(req, res) {
    Sector.find(function(error, sectors) {
      if(error) {
        console.log(error);
      } else {
        res.json(sectors);
      }
    })
  });

// Le secteur entier (avec les sous secteurs) est passé à chaque fois
sectorRoutes.route('/update/main/:id')
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

        sector.save().then(sector => {
          res.status(200).json('Update complete');
        })
        .catch(error => {
          res.status(400).send("unable to update the database");
        });
      }
    });
  });

// Delete main sector
sectorRoutes.route('/delete/main/:id')
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

// Delete sub sector with main id
sectorRoutes.route('/delete/sub/:id')
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
