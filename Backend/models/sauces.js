// MONGOOSE DB : Création d'un modèle Sauce 

// A noter : pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose.

const mongoose = require('mongoose'); // Import de Mongoose
const validateSauce = require('../middleware/validateSauce');// Import de notre middelware qui va aider à sécuriser contre l'injection de code lors de la création et modification des sauces.
const mongoSanitize  = require('express-mongo-sanitize');// Import de Mongo-Sanitize : empêche toute clé commençant par «$» d'être transmise au moteur de requête MongoDB.


// Création du modèle 'sauce'.

const sauceSchema = mongoose.Schema({
  userId :{type: String, required: true },
  name: {type: String, required: true, validate : validateSauce.nameValidator },
  manufacturer: {type: String, required: true,  validate : validateSauce.manufacturerValidator },
  description: {type: String, required: true,  validate : validateSauce.descriptionValidator },
  mainPepper: {type: String, required: true,  validate : validateSauce.mainPepperValidator },
  imageUrl: {type: String, required: true},
  heat: {type: Number, required: true},
  likes: {type: Number, required: false, default:0},
  dislikes: {type: Number, required: false, default:0},
  usersLiked: {type: [String], required: false, default:[]},
  usersDisliked: {type: [String],required: false, default:[]},
});

sauceSchema.plugin(mongoSanitize );// Ajout du plugin de mongo-sanitize

module.exports = mongoose.model('Sauce', sauceSchema, ); // Exportation du schéma en tant que modèle Mongoose 
                                                       // Rend 'Sauce' disponible pour intéragir avec l' application.