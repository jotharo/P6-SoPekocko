// MONGOOSE DB : Création d'un modèle User 

// A noter : pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose.

const mongoose = require('mongoose'); // Import de Mongoose

const uniqueValidator = require('mongoose-unique-validator'); // On s'assure que l'email est unique et
                                                              // n'a pas déjà été utilisé pour créer un user.
const mongoSanitize  = require('express-mongo-sanitize');// Import de Mongo-Sanitize : empêche toute clé commençant par «$» d'être transmise au moteur de requête MongoDB.

// Création d'un modèle User

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator, mongoSanitize ); // Ajout du plugin de vérification d'email unique au schém + de mongo-sanitize.

module.exports = mongoose.model('User', userSchema);// Exportation du schéma en tant que modèle Mongoose 
                                                    // Rend 'User' disponible pour intéragir avec l' application.