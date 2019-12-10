const express = require('express');
const router = express.Router();
const {
    read,
    update,
    remove,
    mwUserId,
    getList,
    confirmUserAccount,
    addElementArray,
    removeElementArray,
    removeField,
} = require("../../controllers/user");

// @route  api/user
// RUD
router.get("/:userId", read); // requireSignin, mwIsAuth
router.put("/:userId", update); // requireSignin, mwIsAuth
router.delete('/:userId', remove);
// END RUD

router.get("/confirm-account/:authUserId", confirmUserAccount);

// LISTS
router.get("/list/all", getList);

// FIELDS
// Array Fields handled: favoriteList,
router.put('/field/array/push/:id', addElementArray);
router.put('/field/array/pull/:id', removeElementArray);
router.put('/field/remove/:id', removeField);

router.param("userId", mwUserId); // n1

// THIS WILL REFACTORATED TO RECEIVE IDS LIKE I DID WITH FAVORITES AND UPDATE WITH FIELD ROUTES.
// NOTIFICATION SYSTEM
// @route   ADD (a primary field) api/users/lists/change-field/notifications/:id
// @desc    Send/Add a notification (clients <==> admin)
// @access  Private
// req.body = { "messageList": [{sender: 'LuisCliente', id: '123hgfssax4556', time: '12:30', message: "Hi there, Iam a new client!"}]}
// router.put('/lists/change-field/notifications/:id', (req, res) => {
//     User.findByIdAndUpdate(req.params.id, { $push: req.body }, { strict: false, upsert:true }, (err, data) => {
//         if (err) {
//             return res
//                 .status(500)
//                 .json({error: "unsuccessful. message no sent"})
//         }
//         data.save();
//         res.json( data )
//     })
//     // .sort({ systemDate: -1 }) try only this next time
//     // .then(not => res.json(not))
// });
// // @route   DELETE (a primary field) api/users/lists/change-field/notifications/:id
// // @desc    Delete a notification (clients <==> admin)
// // @access  Private
// router.put('/lists/delete-field-array/notifications/:id', (req, res) => {
//     User.findByIdAndUpdate(req.params.id, { $pull: req.body }, (err, data) => {
//         if (err) {
//             return res
//                 .status(500)
//                 .json({error: "unsuccessful. not deleted"})
//         };
//         data.save();
//         res.json(data);
//     })
// });
// // END NOTIFICATION SYSTEM

module.exports = router;


/* COMMENTS
n1: // Everytime there is a userId, this router will run and make this user info available in the request object
n2:
// eg. req.body = { "couponsList": {type: '30% de desconto'}}
req.body = {sex: "male"} = add male as ind 0 from an array
n3: LESSON: don't insert MongoDB Models twice like here (const User = require('../../models/User');) in routes and controllers
because this causes deployment issue and this error: OverwriteModelError: Cannot overwrite `User` model once compiled.
*/