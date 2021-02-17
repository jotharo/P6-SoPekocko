// app.js

// Import des packages

const express = require('express');   // Import d'Express : Framework Node.js.

const bodyParser = require('body-parser'); // Import de body-parser : pour extraire l'objet JSON des demandes POST qui viennent du Frontend

const path = require('path'); // Import du path : ensemble de fonctions/propriétés pour manipuler des chemins vers des fichiers et répertoires.

const mongoose = require('mongoose'); // Import du Plugin Mongoose pour se connecter à la data base MongoDB.

require("dotenv").config(); // Dotenv : masquage des informations de connexion à la BD à l'aide de variables d'environnement

mongoose.connect('mongodb+srv://User01:User01Pswd@cluster0.acudl.mongodb.net/SoPekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !!'));

// Création de l'application express

const app = express();

// Import des routes

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Middlewares Express

//.use() traite TOUTES les requêtes

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(bodyParser.json()); // On définit la fonction json ( body-parser ) comme middleware global pour l'application.

app.use('/api/sauces', sauceRoutes);

app.use('/api/auth', userRoutes);

app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app; // module.export : va faire en sorte que 'app' soit disponible pour que les autres modules l'importent et l'utilisent.
                      // En l'occurence export de notre application express pour utilisation par 'server.js'.