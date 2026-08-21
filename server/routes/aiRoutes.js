const express = require("express");

const router = express.Router();

const {
    getFoodRecommendations,
} = require("../controllers/aiController");

router.post(
    "/recommend",
    getFoodRecommendations
);

module.exports = router;