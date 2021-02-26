// Fichier contenant la logique des routes 'sauce'

// Routers Modules

const express = require('express'); // Import d'Express.

const router = express.Router();  // express.Router : méthode Express de création de router.

const auth = require('../middleware/auth'); // Import du middleware d'authentification

const multer = require('../middleware/multer-config'); // Import du middleware de gestion de fichiers entrants dans les requêtes HTTP

const deletePicErrorForm = require('../middleware/deletePicErrorForm');

const sauceCtrl = require('../controllers/sauces'); // Import du controller pour la route 'sauce'




// Routes 'sauce'.

// A noter : veillez à placer le middleware multer après authentification !
// > sinon des images de requêtes non-authentifiées pourront être enregistrées dans le serveur. 

router.get('/', auth, sauceCtrl.getAllSauce); 
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer,  sauceCtrl.createSauce, deletePicErrorForm);
router.put('/:id', auth, multer,  sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);


// Exportation des routes.

module.exports = router;// module.export : va faire en sorte que 'router' soit disponible pour que 
                        // les autres modules l'importent et l'utilisent.
                        // En l'occurence export de notre router pour utilisation par 'app.js'.