const express = require("express");
const router = express.Router();

const {
    mwGetLinkChangePass,
    sendBuyRequestEmail,
    sendWelcomeConfirmEmail,
    sendNewPasswordEmail
} = require("../controllers/email");

const { mwValidateBuyRequest } = require('../controllers/_mw-validation/email');
const { mwValidateEmail } = require('../controllers/_mw-validation/auth');

// @ routes api/email/...
router.post('/admin/order-request', mwValidateBuyRequest, sendBuyRequestEmail);
router.post('/client/welcome-and-confirm', sendWelcomeConfirmEmail);
router.post('/client/new-password', mwValidateEmail, mwGetLinkChangePass, sendNewPasswordEmail);
module.exports = router;


// EXEMPLE
// const { mwRequireSignin, mwIsAuth, mwIsAdmin } = require("../controllers/auth");
// const { mwUserId, mwAddOrderToUserHistory } = require("../controllers/user");
// const { mwDecreaseQuantity } = require("../controllers/product");
// const { mwOrderById, create, getListOrders, getStatusValues, updateOrderStatus } = require("../controllers/order");

// @ routes api/order/...
// @ desc Add a new order
// router.post("/create/:userId", mwRequireSignin, mwIsAuth, mwAddOrderToUserHistory, mwDecreaseQuantity, create);
// router.get("/list/all/:userId", mwRequireSignin, mwIsAuth, mwIsAdmin, getListOrders)
// @ desc get the value of enum for order status ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"]
// router.get("/status-values/:userId", mwRequireSignin, mwIsAuth, mwIsAdmin, getStatusValues)
// router.put("/:orderId/status/:userId", mwRequireSignin, mwIsAuth, mwIsAdmin, updateOrderStatus)


// router.param("userId", mwUserId);
// router.param("orderId", mwOrderById);
