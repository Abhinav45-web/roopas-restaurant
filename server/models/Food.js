const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        category: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        rating: {
            type: Number,
            default: 0,
        },

        time: {
            type: String,
            default: "20-30 min",
        },

        emoji: {
            type: String,
            default: "🍽️",
        },

        image: {
            type: String,
            default: "",
        },

        type: {
            type: String,
            enum: ["veg", "non-veg"],
            required: true,
        },

        bestseller: {
            type: Boolean,
            default: false,
        },

        available: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const Food = mongoose.model("Food", foodSchema);

module.exports = Food;