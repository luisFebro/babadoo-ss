const BusinessInfo = require("../models/BusinessInfo");
const idRandom = "5dcc77a0db168f112884b27f"; //n1

exports.read = (req, res) => {
    BusinessInfo.findById(idRandom)
    .then(bizInfo => res.json(bizInfo))
    .catch(error => console.log("errorBusinessInfo", error))
}

exports.createOrUpdate = (req, res) => {
    BusinessInfo.findOneAndUpdate(
        { _id: idRandom },
        { $set: req.body },
        { new: true, upsert: true }, // n2
        (err, bizInfo) => {
            if (err) {
                return res.status(400).json({
                    error: "Ocorreu um erro ao atualizar as informações. Detalhes: " + err
                });
            }
            res.json(bizInfo);
        }
    );
};





// n1 this is a random id which will be created at first, then just be updated
// n2 upsert - insert a new doc, if not declared returns null || new - immediately updated! this send the most recently updated response/doc from database to app