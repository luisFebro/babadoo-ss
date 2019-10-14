const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// Mongoose Schema/Model
const Product = require('../../models/Product');
// CRUD PATTERN

// @route   POST api/products
// @desc    Create a Product
// @access  Private
router.post('/', (req, res) => { //needs to put auth as middleware
    const newProduct = new Product({
        title: req.body.title, //required
        description: req.body.description, //required
        image: req.body.image,
        price: req.body.price, //required
        company: req.body.company,
        info: req.body.info,
        inCart: req.body.inCart,
        isAddedToFav: req.body.isAddedToFav,
        count: req.body.count,
        total: req.body.total,
    });

    newProduct.save().then(product => res.json(product));
});

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get("/", (req, res) => {
    Product.find({})
        .sort({ systemDate: -1 }) // ordered descending - most recently
        .then(products => res.json(products))
})

// @route   UPDATE api/products
// @desc    Update a Product
// @access  Private
    // router.put('/', (req, res) => {
    //     let query = { "favoriteList": [] }; // e.g { isAddedToFav: false }
    //     console.log("query", req.body.favoriteList);
    //     // req.body.isAddedToFav = true;
    //     Product.findOneAndUpdate(query, req.body.favoriteList, {upsert:true}, (err, doc) => { // upsert: option creates the object if it doesn't exist
    //         if (err) return res.json({ error: "it was not possible to update. Reason: " + err });
    //         console.log("updated");
    //         return res.json({ msg: "new product properties updated successfully!" });
    //     });
    // });

// @route   DELETE api/products/:id
// @desc    Delete a Product
// @access  Private
router.delete('/:id', (req, res) => { //needs to put auth as middleware
    Product.findById(req.params.id)
        .then(product => product.remove().then(() => res.json({ success: "id deleted" }))) // then(() => res.json({ success: true }) = this response is completely up to you
        .catch(err => res.status(404).json({ success: "id not found" }));
});


module.exports = router;