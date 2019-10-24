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

// @route UPDATE (Change/Add a primary field) api/products/:id
// @desc    Change/Add a primaryfield
// @access  Private
// req.body = { "title": "new product"}
router.put('/:id', (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { strict: false, upsert:true }, (err, data) => {
        if (err) {
            return res
                .status(500)
                .json({error: "unsuccessful. not added"})
        }
        // data.save();
        res.json(data);
    });
});

// @route   DELETE api/products/:id
// @desc    Delete a Product
// @access  Private
router.delete('/:id', (req, auth, res) => { //needs to put auth as middleware
    Product.findById(req.params.id)
        .then(product => product.remove().then(() => res.json({ success: "id deleted" }))) // then(() => res.json({ success: true }) = this response is completely up to you
        .catch(err => res.status(404).json({ failure: "id not found" }));
});


module.exports = router;