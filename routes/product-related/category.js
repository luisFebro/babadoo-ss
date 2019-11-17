const express = require("express");
const router = express.Router();

// const { mwUserById } = require("../controllers/user");
const { mwCategoryId, create, read, update, remove, getList } = require("../../controllers/category");
const { mwIsAdmin } = require("../../controllers/auth");

// @route  CRUD api/category...
router.post("/", create); ///:userId mwRequireSignin, mwIsAuth, mwIsAdmin
router.get("/:categoryId", read)
router.delete("/:categoryId", remove); // /:userId mwRequireSignin, mwIsAuth, mwIsAdmin,
router.put("/:categoryId", update); // :userId mwRequireSignin, mwIsAuth, mwIsAdmin,

router.get("/list/all", getList); // we can not use /categories directly since /:categoryId will be executed. We need one more level

router.param("categoryId", mwCategoryId)
// router.param("userId", mwUserById)

module.exports = router;