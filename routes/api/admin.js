const express = require('express');
const router = express.Router();
// User Model
const Admin = require('../../models/Admin');

// PROMOTIONS
// @route   GET api/admin/coupons
// @desc    Get All Items (return an array)
// @access  Public
router.get("/coupons", (req, res) => {
    Admin.find({})
        .sort({ systemDate: -1 }) // ordered descending - most recently
        .then(doc => res.json(doc))
})

// @route   ADD (a primary field) 'api/admin/coupons/:id'
// @desc    toggle Coupons
// @access  Private
// req.body = { "messageList": [{sender: 'LuisCliente', id: '123hgfssax4556', time: '12:30', message: "Hi there, Iam a new client!"}]}
router.put('/coupons/:id', (req, res) => {
    console.log("req.body from admin", req.body);
    Admin.findByIdAndUpdate(req.params.id, req.body, { strict: false, upsert:true  }, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful. message no sent"})
        }
        // data.save();
        res.json( data );
    });
});
// END PROMOTIONS

module.exports = router;