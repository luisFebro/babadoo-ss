const express = require('express');
const router = express.Router();
const {
    loadAuthUser,
    register,
    login,
    mwAuth
} = require('../controllers/auth');

// const { mwValidateUserRegister } = require('../utils/validation/mwValidateUserRegister');

// @route   api/auth
router.get('/user', mwAuth, loadAuthUser);
router.post('/register', register);
router.post('/login', login);

module.exports = router;