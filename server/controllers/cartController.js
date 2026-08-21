const Cart = require("../models/Cart");

// Get cart
const getCart = async (req, res) => {
    try {
        let cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.food");

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [],
            });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Add item to cart
const addToCart = async (req, res) => {
    try {
        const { foodId, quantity } = req.body;

        let cart = await Cart.findOne({
            user: req.user._id,
        });

        if (!cart) {
            cart = await Cart.create({
                user: req.user._id,
                items: [],
            });
        }

        const existingItem = cart.items.find(
            (item) => item.food.toString() === foodId
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                food: foodId,
                quantity,
            });
        }

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Remove item
const removeFromCart = async (req, res) => {
    try {
        const { foodId } = req.body;

        const cart = await Cart.findOne({
            user: req.user._id,
        });

        cart.items = cart.items.filter(
            (item) => item.food.toString() !== foodId
        );

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Increase quantity
const increaseQuantity = async (req, res) => {
    try {
        const { foodId } = req.body;

        const cart = await Cart.findOne({
            user: req.user._id,
        });

        const item = cart.items.find(
            (item) => item.food.toString() === foodId
        );

        if (item) {
            item.quantity += 1;
        }

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Decrease quantity
const decreaseQuantity = async (req, res) => {
    try {
        const { foodId } = req.body;

        const cart = await Cart.findOne({
            user: req.user._id,
        });

        const item = cart.items.find(
            (item) => item.food.toString() === foodId
        );

        if (item) {
            item.quantity -= 1;
        }

        cart.items = cart.items.filter(
            (item) => item.quantity > 0
        );

        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    getCart,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
};