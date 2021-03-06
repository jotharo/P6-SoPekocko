var passwordValidator = require('password-validator');// Import de Password-Validator : sécurité contre les injections + sécurisation du mdp de l'user.

module.exports = (req,res,next) => {
 
    // Creation du schema
    var validateUser = new passwordValidator();
     
    validateUser
    .is().min(8)                                    // Minimum length 8
    .is().max(25)                                  // Maximum length 100
    .has().not().spaces() 

    if(validateUser.validate(req.body.password)) {
            next();
        } else {
            res.status(400).json({ message: "Le mot de passe doit comporter au moins 8 caractères, et maximum 25, "
            +"ne pas posséder d espace."});
        }
};

