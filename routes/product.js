const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

const {
    create,
    read,
    remove,
    updatePrimaryField,
    mwProductId,
} = require('../controllers/product');

// @route  api/product...

// CRUD
router.post('/', create);
router.get("/", read);
router.delete('/:id', remove);
// END CRUD

// UPDATES
router.put('/:id', updatePrimaryField);
// END UPDATES

router.param('product-id', mwProductId);

module.exports = router;