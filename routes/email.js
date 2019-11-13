const express = require("express");
const router = express.Router();

const { sendBuyRequestEmail, sendWelcomeConfirmEmail } = require("../controllers/email");

// @ routes api/email/...
// @desc  Send Admin a Message when a new order request is done.
router.post('/admin/buy-request', sendBuyRequestEmail);
// @desc  Send Welcome and Confirm Email to client after signup
router.post('/client/welcome-and-confirm', sendWelcomeConfirmEmail);
module.exports = router;


// EXEMPLE
// const { mwRequireSignin, mwIsAuth, mwIsAdmin } = require("../controllers/auth");
// const { mwUserById, mwAddOrderToUserHistory } = require("../controllers/user");
// const { mwDecreaseQuantity } = require("../controllers/product");
// const { mwOrderById, create, getListOrders, getStatusValues, updateOrderStatus } = require("../controllers/order");

// @ routes api/order/...
// @ desc Add a new order
// router.post("/create/:userId", mwRequireSignin, mwIsAuth, mwAddOrderToUserHistory, mwDecreaseQuantity, create);
// router.get("/list/all/:userId", mwRequireSignin, mwIsAuth, mwIsAdmin, getListOrders)
// @ desc get the value of enum for order status ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
// router.get("/status-values/:userId", mwRequireSignin, mwIsAuth, mwIsAdmin, getStatusValues)
// router.put("/:orderId/status/:userId", mwRequireSignin, mwIsAuth, mwIsAdmin, updateOrderStatus)


// router.param("userId", mwUserById);
// router.param("orderId", mwOrderById);
