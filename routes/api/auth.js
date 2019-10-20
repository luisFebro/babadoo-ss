const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../../config/keys');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

// User Model
const User = require('../../models/User');

// LOGIN
// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
    const { email, name, password } = req.body;
    // Simple validation
    if (!email || !password) {
        return res.status(400).json({ msg: 'Por favor, insira todos os campos' });
    }

    // Check Login for existing user by Name or Email
    User.findOne({ $or: [{ name }, { email }]})
        .then(user => {
            console.log("user", user);
            //user returns the whole obj of the user, otherwise "null"
            if (!user) return res.status(400).json({ msg: 'Sem Registro do Usuário' });

            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: 'Credenciais Inválidas' });

                    jwt.sign({ id: user.id },
                        jwtSecret, { expiresIn: 1000000 },
                        (err, token) => {
                            if (err) throw err;
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
        })
});

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
// //auth = require('../../middleware/auth')
router.get('/user', auth, (req, res) => {
    console.log("req.user", req.user);
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user))
        .catch(err => res.json("There is an issue in api/auth/user: " + err))
});

module.exports = router;