const express = require('express');
const router = express.Router();
const {
    loadAuthUser,
    register,
    login,
    mwAuth,
    changePassword
} = require('../controllers/auth');

const {
    mwValidateRegister,
    mwValidateLogin,
} = require('../controllers/_mw-validation/auth');

// @route   api/auth
router.get('/user', mwAuth, loadAuthUser);
router.post('/register', mwValidateRegister, register);
router.post('/login', mwValidateLogin, login);
router.post('/change-password', changePassword);

module.exports = router;