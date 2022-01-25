const express = require('express');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

const userRoutes = express.Router();

// Import du modèle
let User = require('../models/user');


//TODO gestion d'un equivalent de clé composite pour l'username
//TODO hash pw
//TODO verify token to access resources
// Vérifie si l'user existe. Si oui, crée un token et retourne l'user avec le token mis à jour.
userRoutes.route('/login')
  .post(function(req, res) {
    User.findOne({ username: req.body.username, password: req.body.password }, function(error, user) {
      if(error) {
        console.log(error);
        res.status(500).json(error);
      } else if(!user) {
        res.status(404).send("Record not found");
      } else {

        // Generate token
        const token = jwt.sign({ id: user._id }, config.secret, {
          expiresIn: 86400 // 24 hours
        });

        res.json({
          id: user._id,
          username: user.username,
          email: user.email,
          token: token
        });
      }
    });
  });

module.exports = userRoutes;
