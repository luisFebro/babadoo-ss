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
// @desc    Get All Updated User Info (including lists)
// @access  Public
router.get("/list", (req, res) => {
    User.find({})
        .sort({ systemDate: -1 }) // ordered descending - most recently
        .then(users => res.json(users))
})

// MODIFYING USER'S FIELDS
// @route   UPDATE (Change/Add a primary field) api/users/lists/change-field/:id
// @desc    Change/Add a primaryfield
// @access  Private
// req.body = { "couponsList": [{"type": "30% desconto"}]}
router.put('/lists/change-field/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { strict: false, upsert:true }, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful. not added"})
        }
        data.save();
        res.json( data );
    });
});

// @route   ADD ARRAY-LIKE FIELDS api/users/lists/add-field/:id
// @desc    Push an obj inside an array-like data
// @access  Private
// eg. req.body = { "couponsList": {type: '30% de desconto'}};
// req.body = {sex: "male"} (add male as ind 0 from an array)
router.post('/lists/add-field-array/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id,{ $push: req.body }, { strict: false, upsert:true }, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful. not added"})
        };
        data.save();
        res.json( data );
    });
});

// @route   DELETE a Primary Field api/users/lists/delete-field/:id
// @desc    Find a User(doc) and field and delete a primary element
// @access  Private
router.delete('/lists/delete-field/:id', (req, res) => {
    let targetField = req.body;
    User.findById(req.params.id, (err, selectedUser) => {
        selectedUser.set(targetField, undefined, {strict: false} );
        selectedUser.save(() => res.json({msg: "deleted a field succesfully"}))
    })
});

// @route   DELETE an array element from a field api/users/lists/delete-field-array/:id
// @desc    Find a User(doc) and field and delete an array element
// @access  Private
// eg. req.body = { couponsList: { type: "10% desconto qualquer produto" }};
router.delete('/lists/delete-field-array/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $pull: req.body}, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful. not deleted"})
        };
        res.json({msg: "deleted a field inside an array properly"});
    })
});

// END MODIFYING USER'S FIELDS

// @route   GET api/users/list
// @desc    Get a list of all users from db
// @access  Private
// THIS IS NOT THE BEST WAY TO DO IT SINCE THIS GET DIFF OBJ KEYS. SEE PRODUCTS GET ALL PRODUCTS
// router.get('/list', (req, res) => {
//     User.find({}, (err, users) => {
//         var userMap = {};
//         users.forEach(user => {
//             userMap[user._id] = user;
//         });
//         res.send(userMap);
//     })
// });

// END LISTS
module.exports = router;