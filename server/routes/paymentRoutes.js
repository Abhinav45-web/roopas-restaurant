const express = require("express");

const router = express.Router();

const {
    protect,
} = require("../middleware/authMiddleware");

const {
    createRazorpayOrder,
    verifyRazorpayPayment,
    createFreeDemoOrder,
} = require(
    "../controllers/paymentController"
);

router.post(
    "/create",
    protect,
    createRazorpayOrder
);

router.post(
    "/verify",
    protect,
    verifyRazorpayPayment
);

router.post(
    "/demo",
    protect,
    createFreeDemoOrder
);

module.exports = router;