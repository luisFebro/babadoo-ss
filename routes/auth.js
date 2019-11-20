const express = require('express');
const router = express.Router();
const {
    login,
    register,
    mwAuth,
    checkUserAuth } = require('../controllers/auth');

// const { mwValidateUserRegister } = require('../utils/validation/mwValidateUserRegister');

// @route   api/auth
router.post('/register', register);
router.post('/login', login);
router.get('/user', mwAuth, checkUserAuth);

module.exports = router;