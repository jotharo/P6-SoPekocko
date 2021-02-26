// CONTROLLER : Sauce

const Sauce = require('../models/sauces'); // Récupération du modèle 'sauce'.

const fs = require('fs-extra') // // File System : créer et gérer des fichiers pour y stocker ou lire des informations. avec des options en plus, notamment delete.


// Fonction pour obtenir toutes les sauces

exports.getAllSauce = (req, res, next) => { 
   
    Sauce.find() // Méthode find : obtention de la liste complète des sauces présentes dans la BD.
    .then(sauces => res.status(200).json(sauces)) // Succès : renvoit de l'array des sauces.
    .catch(error => res.status(400).json({error: error})); // Echec : ne trouve pas la liste des sauces.
};

// Fonction pour trouver une sauce précise.

exports.getOneSauce = (req, res, next) => { 
    Sauce.findOne({_id: req.params.id})         // Méthode findOne : obtention d'une sauce précise présente dans la BD > En fonction de son id personnelle.
    .then(sauce => res.status(200).json(sauce)) // Succès : renvoit de la sauce.    
    .catch(error => res.status(404).json({error: error})); // Echec : ne trouve pas la sauce.   
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
  const sauceObject = req.file ? ( // sauceObject regarde si req.file existe ou non + récupération des infos sauce.
    Sauce.findOne({_id: req.params.id})
    .then(sauce => {              // On supprime l'ancienne image du serveur
      const filename = sauce.imageUrl.split('/images/')[1]
      fs.remove(`images/${filename}`)
    }),
    {
      ...JSON.parse(req.body.sauce),// Modification des données.
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`// Modification nouvelle image.
    }
   ) : { ...req.body };
  Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id }) // Enregistrement dans la BD.
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
  };



// Fonction pour supprimer une sauce.

exports.deleteSauce = (req, res, next) => { 
  Sauce.findOne({ _id: req.params.id }) // Methode pour chercher une sauce précise par id.
    .then(sauce => {
      const filename = sauce.imageUrl.split('/images/')[1]; // Suppression de l'image de la sauce de la DB.
      fs.remove(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id }) // Suppression de la Sauce de la BD.
          .then(() => res.status(200).json({ message: 'Objet supprimé !'}))// Succès suppression.
          .catch(error => res.status(400).json({ error }));// Erreur suppression.
      });
    })
  .catch(error => res.status(500).json({ error }));// Erreur sauce non trouvée.
};

// Fonction pour ajouter/supprimer 1 like/1 dislike sur une sauce.

exports.likeSauce = (req, res, next) => { 

const userId = req.body.userId // Id de l'User
const sauceId = req.params.id // Id de la Sauce
const sauceLike = req.body.like // Nombre de like d'une Sauce

  switch (sauceLike) {

    case 1: // Cas 1 : User aime/like la sauce = +1 like
           Sauce.updateOne({ _id: sauceId}, {        // Mise à jour 
              $push: { usersLiked: userId },          // On push/ajoute l'userId dans l'array usersLiked 
              $inc: { likes: 1 },                     // + incrémente 1 like                        
            }) 
            .then(() => res.status(201).json({ message: 'Like pris en compte !' }))
            .catch(error => res.status(400).json({ error: error }));
    break;
         

    case -1:// Cas 2 : User n'aime pas/dislike la sauce = +1 dislike
              Sauce.updateOne({ _id: sauceId }, {       // Mise à jour 
                $push: { usersDisliked: userId },       // On push/ajoute l'userId dans l'array usersDisliked
                $inc: { dislikes: 1 },                  // + incrémente 1 dislike             
              }) 
              .then(() => res.status(201).json({ message: 'Dislike pris en compte !' }))
              .catch(error => res.status(400).json({ error: error })); 
    break;
          

    case 0:// Cas 3 : User retire son like ou son dislike = -1 like/dislike
          Sauce.findOne({ _id: sauceId})
          .then((sauce) => {

            if (sauce.usersLiked.includes(userId)) {// Si on a déjà liké - l'userId est déjà présent dans l'array usersLiked de la sauce:
            Sauce.updateOne({ _id: sauceId }, {   // Mise à jour
                $pull: { usersLiked: userId },      // On pull/enlève l'userId
                $inc: { likes: -1 },                // + incrémente -1 like
              }) 
            .then(() => res.status(201).json({ message: 'Like annulé' }))
            .catch(error => res.status(400).json({ error: error }));
            }

            else if (sauce.usersDisliked.includes(userId)) {// Si on a déjà disliké - l'userId est déjà présent dans l'array usersDisliked de la sauce:
              Sauce.updateOne({ _id: sauceId }, {           // Mise à jour
                $pull: { usersDisliked: userId },           // On pull/enlève l'userId
                $inc: { dislikes: -1 },                     // + incrémente -1 dislike             
              }) 
            .then(() => res.status(201).json({ message: 'Dislike annulé' }))
            .catch(error => res.status(400).json({ error: error }));
            }
          }) 
    break;

    default:
      console.error(' Requête impossible ! ');
    };
  }
