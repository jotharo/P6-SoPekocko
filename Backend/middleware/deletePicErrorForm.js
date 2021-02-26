var fs = require('fs');

module.exports = (req,res,next) => {
    if(req.body.errorMessage) {
        res.status(200).json({message: "La sauce a bien été modifiée!"});
    } else {
                     // On supprime l'image du serveur
            const filename = sauce.imageUrl.split('/images/')[1]
            fs.remove(`images/${filename}`)
    }
};


