// CONTROLLER : User

// Packages 

const bcrypt = require('bcrypt'); // Bcrypt : pour hashage du mot de passe des utilisateurs.

const jwt = require('jsonwebtoken'); // Jsonwebtoken : pour création d'un token d'authentification.

// Modèle 'user'

const User = require('../models/user'); // Import du modèle userv : pour création et connexion des users

// Middlewares

// Création d'un user : non-existant dans la base de données.

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // Fonction de hachage du mot de passe de la requête : ici on « sale » le MDP 10 fois.
      .then(hash => { // Récupération du MDP hashé
        const user = new User({  // Création du nouvel utilisateur avec le modèle Mongoose 'user'
          email: req.body.email, // Récupération de l'e-mail dans la requête
          password: hash        // Récupération du MDP hashé
        });
        user.save()   // Enregistrement de l'user dans la BD.
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' })) // Si succès de la création de l'user.
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error })); // Si échec de la création de l'user
  };

  // Connexion d'un user : existant dans la base de données.
  
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })   // 1 - Vérification de l'existence de l'user dans la BD : comparatif adresse e-mail.
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' }); // Si pas d'adresse mail similaire : erreur.
        }
        bcrypt.compare(req.body.password, user.password)  // 2 - Si 1 OK : vérification du mot de passe avec Bcrypt.
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });// Si pas de mot de passe similaire dans la DB : erreur.
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(              // 3 - Si 2 OK : à la connexion l'user ( sur le frontend ) reçoit un token.
                { userId: user._id },       // Ce dernier sera renvoyé automatiquement à chaque requête. 
                'RANDOM_TOKEN_SECRET',      // Permet au back-end de vérifier que la requête est authentifiée.
                { expiresIn: '24h' }        // Expire au bout de 24h.
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };