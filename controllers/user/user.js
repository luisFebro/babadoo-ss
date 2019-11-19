const User = require("../../models/User");

// MESSAGES
const ok = {
}
const error = {
    notFound: "O usuário não foi encontrado",
    systemError: "Ocorreu o seguinte erro: "
}
const msg = (text, systemError = "") => ({ msg: text + systemError });
// END MESSAGES

// MIDDLEWARES - mw
exports.mwUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) return res.status(400).json(msg(error.notFound));
        // user brings all properties from User Model
        req.profile = user;
        next();
    });
};
// END MIDDLEWARE

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile);
};


// OFFICIAL WAY TO UPDATE - this allow to update by field and return the updated response immediately
exports.update = (req, res) => {
    User.findOneAndUpdate(
        { _id: req.profile._id },
        { $set: req.body },
        { new: true }, // real time updated! this send the most recently updated response/doc from database to app
        (err, user) => {
            if (err) {
                return res.status(400).json({
                    error: "Você não está autorizado para executar esta ação"
                });
            }
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};
