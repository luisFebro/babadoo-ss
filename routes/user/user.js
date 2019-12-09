const express = require('express');
const router = express.Router();
// const User = require('../../models/User');
const {
    read,
    update,
    remove,
    mwUserId,
    getList,
    confirmUserAccount,
    addElementArray,
    removeElementArray
} = require("../../controllers/user");

// @route  api/user
// RUD
router.get("/:userId", read); // requireSignin, mwIsAuth
router.put("/test/:userId", update); // requireSignin, mwIsAuth
router.delete('/:userId', remove);
// END RUD

router.get("/confirm-account/:authUserId", confirmUserAccount);

// LISTS
router.get("/list/all", getList);

// FIELDS
// Array Fields handled: favoriteList,
router.put('/field/array/push/:id', addElementArray);
router.put('/field/array/pull/:id', removeElementArray);

router.param("userId", mwUserId); // n1


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

// // MODIFYING USER'S FIELDS
// // @route   UPDATE (Change/Add a primary field) api/users/lists/change-field/:id
// // @desc    Change/Add a primaryfield
// // @access  Private
// // req.body = { "couponsList": [{"type": "30% desconto"}]}
// router.put('/lists/change-field/:id', (req, res) => {
//     User.findByIdAndUpdate(req.params.id, req.body, { strict: false, upsert:true }, (err, data) => {
//         if (err) {
//             return res
//                 .status(500)
//                 .json({error: "unsuccessful. not added"})
//         }
//         data.save();
//         res.json( data );
//     });
// });

// // @route   DELETE a Primary Field api/users/lists/delete-field/:id
// // @desc    Find a User(doc) and field and delete a primary element
// // @access  Private
// // eg. req.body.fieldToBeDeleted = { "fieldToBeDeleted": "message" }
// router.put('/lists/delete-field/:id', (req, res) => {
//     let targetField = req.body.fieldToBeDeleted;
//     User.findById(req.params.id, (err, selectedUser) => {
//         selectedUser.set(targetField, undefined, {strict: false} );
//         selectedUser.save(() => res.json({msg: `delete-field: the field ${targetField.toUpperCase()} was deleted succesfully`}))
//     })
// });
// END MODIFYING USER'S FIELDS
// END LISTS
module.exports = router;


/* COMMENTS
n1: // Everytime there is a userId, this router will run and make this user info available in the request object
n2:
// eg. req.body = { "couponsList": {type: '30% de desconto'}}
req.body = {sex: "male"} = add male as ind 0 from an array
*/