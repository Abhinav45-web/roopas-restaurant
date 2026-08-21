const express = require("express");

const router = express.Router();

const {
    protect,
} = require("../middleware/authMiddleware");

const admin = require(
    "../middleware/adminMiddleware"
);

const {
    placeOrder,
    getMyOrders,
    getMyOrderById,
    getAllOrders,
    updateOrderStatus,
} = require(
    "../controllers/orderController"
);


// ==========================================
// CUSTOMER
// ==========================================

// Place order
router.post(
    "/",
    protect,
    placeOrder
);

// Get logged-in user's orders
router.get(
    "/my-orders",
    protect,
    getMyOrders
);


// ==========================================
// ADMIN
// ==========================================

// Get all orders
router.get(
    "/admin/all",
    protect,
    admin,
    getAllOrders
);

// Update order status
router.put(
    "/admin/:id/status",
    protect,
    admin,
    updateOrderStatus
);


// ==========================================
// SINGLE CUSTOMER ORDER
// Keep this LAST
// ==========================================

router.get(
    "/:id",
    protect,
    getMyOrderById
);


module.exports = router;