const crypto = require("crypto");

const Razorpay = require("../config/razorpay");
const Cart = require("../models/Cart");
const Order = require("../models/Order");

const {
    sendOrderConfirmationEmail,
} = require("../services/emailService");

// ==========================================
// CREATE RAZORPAY TEST ORDER
// ==========================================

const createRazorpayOrder = async (
    req,
    res
) => {
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

        const validItems =
            cart.items.filter(
                (item) =>
                    item.food !== null
            );

        if (validItems.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "No valid items found",
            });
        }

        // ₹1 TEST PAYMENT ONLY
        const amountInPaise = 100;

        const razorpayOrder =
            await Razorpay.orders.create({
                amount: amountInPaise,
                currency: "INR",
                receipt:
                    `demo_${Date.now()}`,
            });

        res.status(201).json({
            success: true,

            razorpayOrder,

            key:
                process.env
                    .RAZORPAY_KEY_ID,
        });
    } catch (error) {
        console.error(
            "RAZORPAY CREATE ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Unable to create payment",
        });
    }
};

// ==========================================
// VERIFY RAZORPAY + CREATE ORDER
// ==========================================

const verifyRazorpayPayment = async (
    req,
    res
) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
        } = req.body;

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Payment verification data is incomplete",
            });
        }

        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env
                        .RAZORPAY_KEY_SECRET
                )
                .update(
                    `${razorpay_order_id}|${razorpay_payment_id}`
                )
                .digest("hex");

        if (
            generatedSignature !==
            razorpay_signature
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Invalid payment signature",
            });
        }

        const cart = await Cart.findOne({
            user: req.user._id,
        }).populate("items.food");

        if (
            !cart ||
            cart.items.length === 0
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Cart is empty or already processed",
            });
        }

        const validItems =
            cart.items.filter(
                (item) =>
                    item.food !== null
            );

        if (validItems.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "No valid items found",
            });
        }

        const order =
            await Order.create({
                user: req.user._id,

                items: validItems.map(
                    (item) => ({
                        food:
                            item.food._id,

                        quantity:
                            item.quantity,
                    })
                ),

                // ₹1 demo payment
                totalAmount: 1,

                status: "Pending",

                paymentStatus: "Paid",

                razorpayOrderId:
                    razorpay_order_id,

                razorpayPaymentId:
                    razorpay_payment_id,
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
                    populatedOrder.user
                        .email,

                name:
                    populatedOrder.user
                        .name,

                order:
                    populatedOrder,
            });
        } catch (emailError) {
            console.error(
                "EMAIL FAILED:",
                emailError.message
            );
        }

        res.status(200).json({
            success: true,

            message:
                "Payment verified and order created",

            order: populatedOrder,
        });
    } catch (error) {
        console.error(
            "PAYMENT VERIFY ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Payment verification failed",
        });
    }
};

// ==========================================
// FREE DEMO ORDER
// ==========================================

const createFreeDemoOrder = async (
    req,
    res
) => {
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

        const validItems =
            cart.items.filter(
                (item) =>
                    item.food !== null
            );

        if (validItems.length === 0) {
            return res.status(400).json({
                success: false,
                message:
                    "No valid items found",
            });
        }

        const order =
            await Order.create({
                user: req.user._id,

                items: validItems.map(
                    (item) => ({
                        food:
                            item.food._id,

                        quantity:
                            item.quantity,
                    })
                ),

                totalAmount: 0,

                status: "Pending",

                paymentStatus: "Free",
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
                    populatedOrder.user
                        .email,

                name:
                    populatedOrder.user
                        .name,

                order:
                    populatedOrder,
            });
        } catch (emailError) {
            console.error(
                "EMAIL FAILED:",
                emailError.message
            );
        }

        res.status(201).json({
            success: true,

            message:
                "Free demo order placed successfully",

            order:
                populatedOrder,
        });
    } catch (error) {
        console.error(
            "DEMO ORDER ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createRazorpayOrder,
    verifyRazorpayPayment,
    createFreeDemoOrder,
};