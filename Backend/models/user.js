// MONGOOSE DB : Création d'un modèle User 

// A noter : pas besoin de mettre un champ pour l'Id puisqu'il est automatiquement généré par Mongoose.

const mongoose = require('mongoose'); // Import de Mongoose

const uniqueValidator = require('mongoose-unique-validator'); // On s'assure que l'email est unique et
                                                              // n'a pas déjà été utilisé pour créer un user.
// Création d'un modèle User

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator); // Ajout du plugin de vérification d'email unique au schéma.

module.exports = mongoose.model('User', userSchema);// Exportation du schéma en tant que modèle Mongoose 
                                                    // Rend 'User' disponible pour intéragir avec l' application.