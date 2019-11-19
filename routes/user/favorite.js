const express = require('express');
const router = express.Router();
const { read } = require('../../controllers/user/favorite');

// @ routes api/admin

router.get("/", read);

module.exports = router;