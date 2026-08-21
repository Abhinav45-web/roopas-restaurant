const Order = require("../models/Order");
const Cart = require("../models/Cart");

const {
    sendOrderConfirmationEmail,
} = require("../services/emailService");

// ==========================================
// PLACE ORDER
// ==========================================

const placeOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.food");

        if (
            !cart ||
            cart.items.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty",
            });
        }

        const validItems = cart.items.filter(
            (item) => item.food !== null
        );

        if (validItems.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "No valid items found in the cart",
            });
        }

        const totalAmount =
            validItems.reduce(
                (sum, item) =>
                    sum +
                    item.food.price *
                        item.quantity,
                0
            );

        const order = await Order.create({
            user: req.user._id,

            items: validItems.map((item) => ({
                food: item.food._id,
                quantity: item.quantity,
            })),

            totalAmount,

            status: "Pending",
        });

        cart.items = [];

        await cart.save();

        const populatedOrder =
            await Order.findById(
                order._id
            )
                .populate("items.food")
                .populate(
                    "user",
                    "name email"
                );

        try {
            await sendOrderConfirmationEmail({
                email:
                    populatedOrder.user.email,

                name:
                    populatedOrder.user.name,

                order: populatedOrder,
            });

            console.log(
                "✅ Order confirmation email sent"
            );
        } catch (emailError) {
            console.error(
                "⚠️ Email sending failed:",
                emailError.message
            );
        }

        res.status(201).json({
            success: true,

            message:
                "Order placed successfully",

            order: populatedOrder,
        });
    } catch (error) {
        console.error(
            "PLACE ORDER ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// GET MY ORDERS
// ==========================================

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id,
        })
            .populate("items.food")
            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error(
            "GET MY ORDERS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// GET ONE ORDER
// ==========================================

const getMyOrderById = async (
    req,
    res
) => {
    try {
        const order =
            await Order.findOne({
                _id: req.params.id,
                user: req.user._id,
            })
                .populate("items.food")
                .populate(
                    "user",
                    "name email"
                );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        res.status(200).json({
            success: true,
            order,
        });
    } catch (error) {
        console.error(
            "GET ORDER ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// ADMIN - GET ALL ORDERS
// ==========================================

const getAllOrders = async (
    req,
    res
) => {
    try {
        const orders =
            await Order.find()
                .populate(
                    "user",
                    "name email"
                )
                .populate("items.food")
                .sort({
                    createdAt: -1,
                });

        res.status(200).json({
            success: true,
            orders,
        });
    } catch (error) {
        console.error(
            "GET ALL ORDERS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// ==========================================
// ADMIN - UPDATE STATUS
// ==========================================

const updateOrderStatus = async (
    req,
    res
) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Pending",
            "Preparing",
            "Cooking",
            "Out for Delivery",
            "Delivered",
            "Cancelled",
        ];

        if (
            !allowedStatuses.includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid order status",
            });
        }

        const order =
            await Order.findById(
                req.params.id
            )
                .populate(
                    "user",
                    "name email"
                )
                .populate("items.food");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        order.status = status;

        await order.save();

        try {
            await sendOrderConfirmationEmail({
                email:
                    order.user.email,

                name:
                    order.user.name,

                order,
            });

            console.log(
                "✅ Status email sent"
            );
        } catch (emailError) {
            console.error(
                "⚠️ Status email failed:",
                emailError.message
            );
        }

        res.status(200).json({
            success: true,
            message:
                "Order status updated successfully",
            order,
        });
    } catch (error) {
        console.error(
            "UPDATE STATUS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    placeOrder,
    getMyOrders,
    getMyOrderById,
    getAllOrders,
    updateOrderStatus,
};