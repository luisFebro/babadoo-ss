const express = require('express');
const router = express.Router();
const { jwtSecret } = require('../../config/keys');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateEmail = require('../../utils/validateEmail');

// User Model
const User = require('../../models/User');

// REGISTER
// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', async (req, res) => {
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

    try {
        // Check Register for existing user for either already registered email or name.
        const user = await User.findOne({ $or: [{ email }, { name }] })
        // Check if this user was found a match, if so validate name and email.
        if (user) {
            if (user.name === name) return res.status(400).json({ msg: 'Esse Nome de usuário já foi registrado. Tente um outro.' });
            if (user.email === email) return res.status(400).json({ msg: 'Esse Email de usuário já foi registrado. Tente um outro.' });
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

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
                            jwtSecret, { expiresIn: 100000 }, //7 days
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
    } catch(e) {
        // statements
        console.log("This error occured: " + e);
        res.json({msg: "An error occured:" + e})
    }
});

// @route   GET api/users/list
// @desc    Get All Updated User Info (including lists)
// @access  Public
router.get("/list", (req, res) => {
    User.find({})
        .sort({ systemDate: -1 }) // ordered descending - most recently
        .then(users => res.json(users))
})

// @route   GET api/users/:id
// @desc    get data from one authenticated user
// @access  Public
router.get("/:id", (req, res) => {
    User.findById(req.params.id)
    .then(userData => res.json(userData))
    .catch(err => res.json({msg: "this error happened: " + err}))
})

// @route   DELETE api/users/:id
// @desc    Delete a User
// @access  Private
router.delete('/:id', (req, res) => { //needs to put auth as middleware
    User.findById(req.params.id)
        .then(user => user.remove().then(() => res.json({ success: "id deleted" }))) // then(() => res.json({ success: true }) = this response is completely up to you
        .catch(err => res.status(404).json({ failure: "id not found" }));
});


// NOTIFICATION SYSTEM
// @route   ADD (a primary field) api/users/lists/change-field/notifications/:id
// @desc    Send/Add a notification (clients <==> admin)
// @access  Private
// req.body = { "messageList": [{sender: 'LuisCliente', id: '123hgfssax4556', time: '12:30', message: "Hi there, Iam a new client!"}]}
router.put('/lists/change-field/notifications/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $push: req.body }, { strict: false, upsert:true }, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful. message no sent"})
        }
        data.save();
        res.json( data );
    });
});
// @route   DELETE (a primary field) api/users/lists/change-field/notifications/:id
// @desc    Delete a notification (clients <==> admin)
// @access  Private
router.put('/lists/delete-field-array/notifications/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $pull: req.body }, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful. not deleted"})
        };
        data.save();
        res.json(data);
    })
});
// END NOTIFICATION SYSTEM

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
// eg. req.body.fieldToBeDeleted = { "fieldToBeDeleted": "message" }
router.put('/lists/delete-field/:id', (req, res) => {
    let targetField = req.body.fieldToBeDeleted;
    User.findById(req.params.id, (err, selectedUser) => {
        selectedUser.set(targetField, undefined, {strict: false} );
        selectedUser.save(() => res.json({msg: `delete-field: the field ${targetField.toUpperCase()} was deleted succesfully`}))
    })
});

// @route   UPDATE (Delete) an array element from a field api/users/lists/delete-field-array/:id
// @desc    Find a User(doc) and field and delete an array element || put is needed to fetch the body, with delete, it returns an empty obj.
// @access  Private
// eg. req.body = { couponsList: { type: "10% desconto qualquer produto" }};
router.put('/lists/delete-field-array/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $pull: req.body }, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful. not deleted"})
        };
        data.save();
        res.json(data);
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