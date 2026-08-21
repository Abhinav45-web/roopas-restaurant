const Review = require("../models/Review");
const Food = require("../models/Food");
const Order = require("../models/Order");

// ==========================================
// GET REVIEWS
// ==========================================

const getFoodReviews = async (
    req,
    res
) => {
    try {
        const reviews =
            await Review.find({
                food: req.params.foodId,
            })
                .populate(
                    "user",
                    "name"
                )
                .sort({
                    createdAt: -1,
                });

        res.status(200).json({
            success: true,
            reviews,
        });
    } catch (error) {
        console.error(
            "GET REVIEWS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// CREATE REVIEW
// ==========================================

const createReview = async (
    req,
    res
) => {
    try {
        const { rating, comment } =
            req.body;

        const { foodId } = req.params;

        const numericRating =
            Number(rating);

        if (
            !numericRating ||
            numericRating < 1 ||
            numericRating > 5
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Rating must be between 1 and 5.",
            });
        }

        if (
            !comment ||
            !comment.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Please write a review.",
            });
        }

        const food =
            await Food.findById(foodId);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found.",
            });
        }

        const hasOrdered =
            await Order.exists({
                user: req.user._id,
                "items.food": foodId,
            });

        if (!hasOrdered) {
            return res.status(403).json({
                success: false,
                message:
                    "You can review a food only after ordering it.",
            });
        }

        const existingReview =
            await Review.findOne({
                user: req.user._id,
                food: foodId,
            });

        if (existingReview) {
            return res.status(400).json({
                success: false,
                message:
                    "You have already reviewed this food.",
            });
        }

        const review =
            await Review.create({
                user: req.user._id,
                food: foodId,
                rating: numericRating,
                comment: comment.trim(),
            });

        const result =
            await Review.aggregate([
                {
                    $match: {
                        food: food._id,
                    },
                },
                {
                    $group: {
                        _id: "$food",
                        averageRating: {
                            $avg: "$rating",
                        },
                        count: {
                            $sum: 1,
                        },
                    },
                },
            ]);

        const averageRating =
            result.length > 0
                ? Number(
                      result[0].averageRating.toFixed(
                          1
                      )
                  )
                : 0;

        await Food.findByIdAndUpdate(
            foodId,
            {
                rating: averageRating,
            }
        );

        const populatedReview =
            await Review.findById(
                review._id
            ).populate(
                "user",
                "name"
            );

        res.status(201).json({
            success: true,
            message:
                "Review added successfully!",
            review: populatedReview,
            averageRating,
            totalReviews:
                result.length > 0
                    ? result[0].count
                    : 1,
        });
    } catch (error) {
        console.error(
            "CREATE REVIEW ERROR:",
            error
        );

        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message:
                    "You have already reviewed this food.",
            });
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// DELETE REVIEW
// ==========================================

const deleteReview = async (
    req,
    res
) => {
    try {
        const review =
            await Review.findById(
                req.params.reviewId
            );

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found.",
            });
        }

        if (
            review.user.toString() !==
            req.user._id.toString()
        ) {
            return res.status(403).json({
                success: false,
                message:
                    "You can delete only your own review.",
            });
        }

        const foodId = review.food;

        await Review.findByIdAndDelete(
            review._id
        );

        const result =
            await Review.aggregate([
                {
                    $match: {
                        food: foodId,
                    },
                },
                {
                    $group: {
                        _id: "$food",
                        averageRating: {
                            $avg: "$rating",
                        },
                    },
                },
            ]);

        const averageRating =
            result.length > 0
                ? Number(
                      result[0].averageRating.toFixed(
                          1
                      )
                  )
                : 0;

        await Food.findByIdAndUpdate(
            foodId,
            {
                rating: averageRating,
            }
        );

        res.status(200).json({
            success: true,
            message:
                "Review deleted successfully.",
            averageRating,
        });
    } catch (error) {
        console.error(
            "DELETE REVIEW ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getFoodReviews,
    createReview,
    deleteReview,
};