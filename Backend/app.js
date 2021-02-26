// app.js

// Import des packages

const express = require('express');   // Import d'Express : Framework Node.js.

const bodyParser = require('body-parser'); // Import de body-parser : pour extraire l'objet JSON des demandes POST qui viennent du Frontend

const path = require('path'); // Import du path : ensemble de fonctions/propriétés pour manipuler des chemins vers des fichiers et répertoires.

const cors = require('cors') // Import de Cors : pour authoriser All CORS Requests

const helmet = require("helmet");// Import d'Helmet : sécurité : ajoute des en-têtes HTTP Content-Security Policy, Strict Transport Policy et d’autres qui empêchent le détournement d’informations.

const mongoSanitize = require('express-mongo-sanitize');// Import de mongoSanitize : les vulnérabilités d'injection NoSQL vont être atténuées en utilisant un niveau de désinfection des données

const mongoose = require('mongoose'); // Import du Plugin Mongoose pour se connecter à la data base MongoDB.

var dotenv = require('dotenv'); // Dotenv : masquage des informations de connexion à la BD à l'aide de variables d'environnement

dotenv.config(); 

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !!'));

// Création de l'application express

const app = express();

// Import des routes

const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

// Middlewares Express

//.use() traite TOUTES les requêtes

app.use(cors());

app.use(helmet());

app.use(mongoSanitize());

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