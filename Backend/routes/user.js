// Fichier contenant la logique des routes 'user'.

// Router Modules.

const express = require('express'); // Import d'Express.

const router = express.Router();  // express.Router : méthode Express de création de router.

const userCtrl = require('../controllers/user'); // Import du controller pour la route 'user'.

var validateUser = require ('../middleware/validateUser');                                                              

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10 // limite à 10 les tentatives de connexion
});

const createAccountLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute 
    max: 10, //  limite à 10 les création de comptes pour un même IP
    message: "Too many accounts created from this IP, please try again after an hour"
});


// Routes 'user'.

router.post('/signup', createAccountLimiter, validateUser, userCtrl.signup); // Appel au controller /signup.
router.post('/login', limiter, userCtrl.login);   // Appel au controller /login.

// Exportation des routes.

module.exports = router;// module.export : va faire en sorte que 'router' soit disponible pour que 
                        // les autres modules l'importent et l'utilisent.
                        // En l'occurence export de notre router pour utilisation par 'app.js'.