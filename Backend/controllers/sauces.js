// CONTROLLER : Sauce

const Sauce = require('../models/sauce'); // Récupération du modèle 'sauce'.

const fs = require('fs'); // File System : créer et gérer des fichiers pour y stocker ou lire des informations.

// Fonction pour obtenir toutes les sauces

exports.getAllSauce = (req, res, next) => { 
    Sauce.find().then(  // Méthode find : obtention de la liste complète des sauces présentes dans la BD.
      (sauces) => {
        res.status(200).json(sauces); // Succès : renvoit de l'array des sauces.
      }
    ).catch(
      (error) => {
        res.status(400).json({ // Echec : ne trouve pas la liste des sauces.
          error: error
        });
      }
    );
};

// Fonction pour trouver une sauce précise.

exports.getOneSauce = (req, res, next) => { 
    Sauce.findOne({         // Méthode findOne : obtention d'une sauce précise présente dans la BD.
      _id: req.params.id   // En fonction de son id personnelle.
    }).then(
      (sauce) => {
        res.status(200).json(sauce); // Succès : renvoit de la sauce.
      }
    ).catch((error) => {res.status(404).json({ // Echec : ne trouve pas la sauce.
          error: error
        });
      }
    );
};

// Fonction qui permet la création de nouvelles sauces.

exports.createSauce = (req, res, next) => { 
  const sauceObject = JSON.parse(req.body.sauce); // Récupération des infos de la requête et création d'un objet
  delete sauceObject._id; // Suppression de l'id automatique renvoyée par le frontend : on en obtient un de MongoDB
  const sauce = new Sauce({ // Création d'une nouvelle sauce avec infos d'input + image.
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  sauce.save() // On sauvegarde la nouvelle sauce dans la DB.
    .then(() => res.status(201).json({ message: 'Objet enregistré !'})) // Succès enregistrement.
    .catch(error => res.status(400).json({ error })); // Erreur enregistrement.
};

// Fonction de modification de sauce déjà existante dans la DB.

exports.modifySauce = (req, res, next) => { 
  const sauceObject = req.file ?  // sauceObject regarde si req.file existe ou non + récupération des infos sauce.
    {
      ...JSON.parse(req.body.thing),// Modification des données.
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// Modification nouvelle image.
    } : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // Enregistrement dans la BD.
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

// Fonction pour supprimer une sauce.

exports.deleteSauce = (req, res, next) => { 
  Sauce.findOne({ _id: req.params.id }) // Methode pour chercher une sauce précise par id.
    .then(thing => {
      const filename = thing.imageUrl.split('/images/')[1]; // Suppression de l'image de la sauce de la DB.
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id }) // Suppression de la Sauce de la BD.
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))// Succès suppression.
          .catch(error => res.status(400).json({ error }));// Erreur suppression.
      });
    })
    .catch(error => res.status(500).json({ error }));// Erreur sauce non trouvée.
};

exports.likeSauce = (req, res, next) => { 
}
