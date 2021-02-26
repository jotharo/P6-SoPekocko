var passwordValidator = require('password-validator');

module.exports = (req,res,next) => {
 
    // Create a schema
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

