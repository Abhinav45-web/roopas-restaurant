const express = require("express");

const router = express.Router();

const {
    getFoods,
    createFood,
    getFoodById,
    updateFood,
    deleteFood,
} = require(
    "../controllers/foodController"
);

const {
    protect,
} = require(
    "../middleware/authMiddleware"
);

const admin = require(
    "../middleware/adminMiddleware"
);

const upload = require(
    "../middleware/uploadMiddleware"
);


// ==========================================
// PUBLIC
// ==========================================

// Get all foods
router.get(
    "/",
    getFoods
);

// Get one food
router.get(
    "/:id",
    getFoodById
);


// ==========================================
// ADMIN ONLY
// ==========================================

// Add food
router.post(
    "/",
    protect,
    admin,
    upload.single("image"),
    createFood
);

// Update food
router.put(
    "/:id",
    protect,
    admin,
    upload.single("image"),
    updateFood
);

// Delete food
router.delete(
    "/:id",
    protect,
    admin,
    deleteFood
);


module.exports = router;