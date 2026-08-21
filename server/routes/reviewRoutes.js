const express = require("express");

const router = express.Router();

const {
    getFoodReviews,
    createReview,
    deleteReview,
} = require("../controllers/reviewController");

const {
    protect,
} = require("../middleware/authMiddleware");

// Public
router.get(
    "/food/:foodId",
    getFoodReviews
);

// Protected
router.post(
    "/food/:foodId",
    protect,
    createReview
);

router.delete(
    "/:reviewId",
    protect,
    deleteReview
);

module.exports = router;