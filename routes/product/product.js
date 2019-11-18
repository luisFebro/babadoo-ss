const express = require('express');
const router = express.Router();

const {
    create,
    read,
    remove,
    update,
    updateProductInfo,
    getList,
    mwProductId,
} = require('../../controllers/product');

// @routes  api/product...

// CRUD
router.post("/", create); // /:userId mwRequireSignin, mwIsAdmin, mwIsAdmin
router.get("/:productId", read);
router.put("/:productId", update);
router.delete('/:productId', remove);
// END CRUD

router.put("/:productId/product-info/update", updateProductInfo);

// LISTS
router.get("/list/all", getList);
// END LISTS

router.param('productId', mwProductId); // n1

module.exports = router;


/* COMMENTS
n1: It is not use dashed like "product-id" because returns unexpected responses.
*/