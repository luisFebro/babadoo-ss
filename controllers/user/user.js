const User = require("../../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateEmail = require('../../utils/validation/validateEmail');

// verifying User
console.log("User model", User);

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
            if (err) return res.status(400).json(msg(msg.notAuthorized));
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        }
    );
};

exports.remove = (req, res) => { //needs to put auth as middleware
    const user = req.profile;
    user.remove((err, data) => {
        console.log(data);
        if (err) return res.status(400).json(msg(error.systemError, err));
        res.json(msg(`O usuário ${data.name.toUpperCase()} foi excluído com sucesso`));
    });

}

exports.getList = (req, res) => {
    //.sort({ createAt: -1 }) // ordered descending - most recently
    User.find().exec((err, data) => {
        if (err) return res.status(400).json(msg(error.systemError, err));
        res.json(data);
    });
}

