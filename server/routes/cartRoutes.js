const express = require("express");

const router = express.Router();

const {
    getCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
} = require("../controllers/cartController");

const {
    protect,
} = require("../middleware/authMiddleware");

router.get("/", protect, getCart);

router.post("/add", protect, addToCart);

router.delete(
    "/remove",
    protect,
    removeFromCart
);

router.put(
    "/increase",
    protect,
    increaseQuantity
);

router.put(
    "/decrease",
    protect,
    decreaseQuantity
);

module.exports = router;