const User = require('../../models/user');
const validateEmail = require('../../utils/validation/validateEmail');
const validatePassword = require('../../utils/validation/validatePassword');
const { msg } = require('../_msgs/auth');
const { msgG } = require('../_msgs/globalMsgs');

exports.mwValidateRegister = (req, res, next) => {
    const { name, email, password } = req.body;

    User.findOne({ $or: [{ email }, { name }] })
    .then(user => {
        if(user && user.name === name) return res.status(400).json(msg('error.userAlreadyRegistered'));
        if(user && user.email === email) return res.status(400).json(msg('error.emailAlreadyRegistered'));
        if(!name && !email && !password ) return res.status(400).json(msg('error.anyFieldFilled'));
        if(!name) return res.status(400).json(msg('error.noName'));
        if(!email) return res.status(400).json(msg('error.noEmail'));
        if(!password) return res.status(400).json(msg('error.noPassword'));
        if(!validateEmail(email)) return res.status(400).json(msg('error.invalidEmail'))
        if(password.length < 6) return res.status(400).json(msg('error.notEnoughCharacters'))
        if(!validatePassword(password)) return res.status(400).json(msg('error.noDigitFound'))
        next();
    })
    .catch(err => msgG('error.systemError', err.toString()));
}

exports.mwValidateLogin = (req, res, next) => {
    const { email, name, password } = req.body;
    console.log(name)
    console.log(email)
    User.findOne({ $or: [{ name }, { email }] })
    .then(user => {
        if(!email && !password) return res.status(400).json(msg('error.anyFieldFilled'));
        if(!email) return res.status(400).json(msg('error.noEmailOrName'));
        if(!password) return res.status(400).json(msg('error.noPassword'));
        if(!user) return res.status(400).json(msg('error.notFound'));
        req.profile = user;
        next();
    })
    .catch(err => msgG('error.systemError', err.toString()));
}

exports.mwValidatePassword = (req, res, next) => {
    const { password } = req.body;
    if(!password) return res.status(400).json(msg('error.noPassword'));
    if(password.length < 6) return res.status(400).json(msg('error.notEnoughCharacters'))
    if(!validatePassword(password)) return res.status(400).json(msg('error.noDigitFound'))
    next();
}

exports.mwValidateEmail = (req, res, next) => {
    const { email } = req.body;
    if(!email) return res.status(400).json(msg('error.noEmail'));
    if(!validateEmail(email)) return res.status(400).json(msg('error.invalidEmail'));
    next();
}