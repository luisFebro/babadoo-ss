const express = require('express');
const router = express.Router();
const { createOrUpdate, updateBusinessInfo, read, getCoupon, updateCoupon } = require('../controllers/admin');

// @ routes api/admin

router.get("/", read);
router.put("/", createOrUpdate);
router.put("/business-info/update", updateBusinessInfo);

router.get("/coupons", getCoupon);
router.put('/coupons/:id', updateCoupon);

module.exports = router;