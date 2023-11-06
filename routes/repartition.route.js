const express = require('express');

const repartitionRoutes = express.Router();
//TODO

// Import du modèle
let Counter = require('../models/counter');
let Repartition = require('../models/Repartition');

// Find all repartition for given equity
repartitionRoutes.route('/get/:id')
  .get(function(req, res) {
    Repartition.find({ equityid: req.params.id }, function(error, rep) {
      if(error) {
        console.log(error);
      } else {
        res.json(rep);
      }
    });
  });

// Add repartitions for a given equity and given type (geo or sector)
repartitionRoutes.route('/add')
  .post(function(req, res) {

    const sector = new Sector({
      _id: result.value,
      name: req.body.name,
      level: req.body.level,
      parentId: req.body.parentId,
    });

    sector.save()
      .then(sector => {
        res.status(200).json(sector);
      })
      .catch(error => {
        console.log(error);
        res.status(400).send("unable to save to database");
      });

  });

sectorRoutes.route('/update/:id')
  .post(function (req, res) {
    Sector.findById(req.params.id, function(error, sector) {
      if(error) {
        console.log(error);
        res.status(500).json(error);
      } else if(!sector) {
        res.status(404).send("Record not found");
      } else {

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
          Sector.find({ parentId: sector._id }, function(err, sects){

            sects.forEach(s => Sector.findByIdAndRemove({ _id: s._id}, function(err, sects){

            }));

            res.status(200).json('Successfully removed');
          })
        }
    });
  });

module.exports = sectorRoutes;
