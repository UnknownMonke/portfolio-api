const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const userRoutes = express.Router();

// Model import
let User = require('../models/user');


//TODO gestion d'un equivalent de clé composite pour l'username
//TODO hash pw
// Vérifie si l'user existe. Si oui, crée un token et retourne l'user avec le token mis à jour.
userRoutes.route('/login')
  .post(function(req, res) {
    User.findOne({ username: req.body.username, password: req.body.password }, function(error, user) {
      if(error) {
        console.log(error);
        res.status(500).json(error);
      } else if(!user) {
        res.status(404).send("User does not exists");
      } else {

        // Generate token
        const token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        res.json(
          {
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              settings: user.settings
            },
            token: token
          }
        );
      }
    });
  });

userRoutes.route('/update/:id/settings')
  .post(function(req, res) {
    User.findById(req.params.id, function(error, user) {
      if(error) {
        console.log(error);
        res.status(500).json(error);
      } else if(!user) {
        res.status(404).send("User does not exists");
      } else {

        user.settings = req.body.settings;

        user.save()
          .then(user => {
            //res.set('Content-Type', 'application/json');
            res.status(200).json('Update complete');
          })
          .catch(error => {
            console.log(error);
            res.status(400).send("unable to update the database"); // SEND doesnt work for some reason
          });
      }
    });
  });

module.exports = userRoutes;
