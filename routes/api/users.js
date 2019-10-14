const express = require('express');
const router = express.Router();
const { jwtSecret } = require('../../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateEmail = require('../../utils/validateEmail');

// User Model
const User = require('../../models/User');

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    // Check if fields are filled
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Por favor, entre todos os campos' });
    }
    // Check if the email is valid
    if(!validateEmail(email)) {
        return res.status(400).json({ msg: 'Email Inválido. Tente outro.'})
    }

    // Check the length of password
    if(password.length < 6) {
        return res.status(400).json({ msg: 'Sua senha deve conter pelo menos 6 dígitos'})
    }

    // Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: 'Usuário já existe' });

            const newUser = new User({
                name,
                email,
                password
            });

            // Create salt & hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign({ id: user.id },
                                jwtSecret, { expiresIn: 10080 }, //7 days
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
                        });
                })
            })
        })
});

// @route   GET api/users/list
// @desc    Get a list of all users from db
// @access  Private
// THIS IS NOT THE BEST WAY TO DO IT SINCE THIS GET DIFF OBJ KEYS. SEE PRODUCTS GET ALL PRODUCTS
router.get('/list', (req, res) => {
    User.find({}, (err, users) => {
        var userMap = {};
        users.forEach(user => {
            userMap[user._id] = user;
        });
        res.send(userMap);
    })
});

// LISTS
// @route   UPDATE api/users/list/favorite/:id
// @desc    Update User Info
// @access  Private
router.put('/list/favorite/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { strict: false, upsert:true }, (err, value) => {
        console.log(req.params.id);
        console.log(req.body);
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful"})
        };
        res.json({success: "success"});
    });
});

router.delete('/list/favorite/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { strict: false, upsert:true }, (err, value) => {
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful"})
        };
        res.json({success: "success"});
    });
})

// END LISTS
module.exports = router;