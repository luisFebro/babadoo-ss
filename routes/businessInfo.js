const express = require("express");
const router = express.Router();

const {
    read,
    createOrUpdate
} = require("../controllers/businessInfo");

// @route api/business-info
router.get("/", read);
router.put("/", createOrUpdate);

module.exports = router;

