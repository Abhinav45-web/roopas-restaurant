const Food = require("../models/Food");
const cloudinary = require("../config/cloudinary");

// ==========================================
// GET ALL FOODS
// ==========================================

const getFoods = async (req, res) => {
    try {
        const foods = await Food.find()
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            foods,
        });
    } catch (error) {
        console.error(
            "GET FOODS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// CREATE FOOD
// ==========================================

const createFood = async (req, res) => {
    try {
        const {
            name,
            description,
            category,
            price,
            rating,
            time,
            type,
            bestseller,
            available,
            emoji,
        } = req.body;

        if (
            !name ||
            !description ||
            !category ||
            !price ||
            !type
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Please fill all required fields.",
            });
        }

        const food = await Food.create({
            name: name.trim(),
            description: description.trim(),
            category,
            price: Number(price),
            rating: rating
                ? Number(rating)
                : 0,
            time:
                time || "20-30 min",
            type,
            bestseller:
                bestseller === "true" ||
                bestseller === true,
            available:
                available !== "false" &&
                available !== false,
            emoji:
                emoji || "🍽️",
            image: req.file
                ? req.file.path
                : "",
        });

        res.status(201).json({
            success: true,
            message:
                "Food added successfully!",
            food,
        });
    } catch (error) {
        console.error(
            "CREATE FOOD ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// GET ONE FOOD
// ==========================================

const getFoodById = async (req, res) => {
    try {
        const food = await Food.findById(
            req.params.id
        );

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found.",
            });
        }

        res.status(200).json({
            success: true,
            food,
        });
    } catch (error) {
        console.error(
            "GET FOOD ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// UPDATE FOOD
// ==========================================

const updateFood = async (req, res) => {
    try {
        const food = await Food.findById(
            req.params.id
        );

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found.",
            });
        }

        const {
            name,
            description,
            category,
            price,
            rating,
            time,
            type,
            bestseller,
            available,
            emoji,
        } = req.body;

        if (name !== undefined) {
            food.name = name.trim();
        }

        if (
            description !== undefined
        ) {
            food.description =
                description.trim();
        }

        if (category !== undefined) {
            food.category = category;
        }

        if (price !== undefined) {
            food.price = Number(price);
        }

        if (rating !== undefined) {
            food.rating = Number(rating);
        }

        if (time !== undefined) {
            food.time = time;
        }

        if (type !== undefined) {
            food.type = type;
        }

        if (bestseller !== undefined) {
            food.bestseller =
                bestseller === "true" ||
                bestseller === true;
        }

        if (available !== undefined) {
            food.available =
                available !== "false" &&
                available !== false;
        }

        if (emoji !== undefined) {
            food.emoji = emoji;
        }

        // Replace Cloudinary image
        if (req.file) {
            food.image = req.file.path;
        }

        await food.save();

        res.status(200).json({
            success: true,
            message:
                "Food updated successfully!",
            food,
        });
    } catch (error) {
        console.error(
            "UPDATE FOOD ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// DELETE FOOD
// ==========================================

const deleteFood = async (req, res) => {
    try {
        const food = await Food.findById(
            req.params.id
        );

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found.",
            });
        }

        // Delete image from Cloudinary
        if (food.image) {
            try {
                const imageUrl =
                    food.image;

                const uploadIndex =
                    imageUrl.indexOf(
                        "/upload/"
                    );

                if (
                    uploadIndex !== -1
                ) {
                    let publicPath =
                        imageUrl.substring(
                            uploadIndex +
                                8
                        );

                    publicPath =
                        publicPath.replace(
                            /^v\d+\//,
                            ""
                        );

                    publicPath =
                        publicPath.replace(
                            /\.[^/.]+$/,
                            ""
                        );

                    await cloudinary.uploader.destroy(
                        `roopas-restaurant/${publicPath.replace(
                            "roopas-restaurant/",
                            ""
                        )}`
                    );
                }
            } catch (cloudinaryError) {
                console.error(
                    "CLOUDINARY DELETE ERROR:",
                    cloudinaryError.message
                );
            }
        }

        await Food.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message:
                "Food deleted successfully.",
        });
    } catch (error) {
        console.error(
            "DELETE FOOD ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    getFoods,
    createFood,
    getFoodById,
    updateFood,
    deleteFood,
};