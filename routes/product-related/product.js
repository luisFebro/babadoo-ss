const express = require('express');
const router = express.Router();
const Product = require('../../models/Product');

const {
    create,
    read,
    remove,
    updatePrimaryField,
    getList,
    mwProductId,
} = require('../../controllers/product');

// @routes  api/product...

// CRUD
router.post("/", create); // /:userId mwRequireSignin, mwIsAdmin, mwIsAdmin
router.get("/:productId", read);
router.delete('/:id', remove);
// END CRUD

// LISTS
router.get("/list/all", getList);
// END LISTS

// UPDATES
router.put('/:id', updatePrimaryField);
// END UPDATES

router.param('productId', mwProductId); // n1

module.exports = router;


/* COMMENTS
n1: It is not use dashed like "product-id" because returns unexpected responses.
*/