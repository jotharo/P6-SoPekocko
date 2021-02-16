// Fichier contenant la logique des routes 'user'.

// Router Modules.

const express = require('express'); // Import d'Express.

const router = express.Router();  // express.Router : méthode Express de création de router.

const userCtrl = require('../controllers/user'); // Import du controller pour la route 'user'.

// Routes 'user'.

router.post('/signup', userCtrl.signup); // Appel au controller /signup.
router.post('/login', userCtrl.login);   // Appel au controller /login.

// Exportation des routes.

module.exports = router;// module.export : va faire en sorte que 'router' soit disponible pour que 
                        // les autres modules l'importent et l'utilisent.
                        // En l'occurence export de notre router pour utilisation par 'app.js'.