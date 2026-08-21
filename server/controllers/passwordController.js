const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// Forgot password
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        const resetToken = crypto
            .randomBytes(32)
            .toString("hex");

        user.resetPasswordToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordExpire =
            Date.now() + 15 * 60 * 1000;

        await user.save();

        const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

        await sendEmail(
            user.email,
            "Password Reset",
            `Reset your password using this link: ${resetURL}`
        );

        res.status(200).json({
            message: "Password reset link sent.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// Reset password
const resetPassword = async (req, res) => {
    try {
        const resetPasswordToken = crypto
            .createHash("sha256")
            .update(req.params.token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {
                $gt: Date.now(),
            },
        });

        if (!user) {
            return res.status(400).json({
                message: "Invalid token",
            });
        }

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(
            req.body.password,
            salt
        );

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            message: "Password updated successfully.",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    forgotPassword,
    resetPassword,
};