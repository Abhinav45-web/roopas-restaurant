const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (
    req,
    res,
    next
) => {
    try {
        let token;

        // Get Bearer token
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith(
                "Bearer "
            )
        ) {
            token =
                req.headers.authorization.split(
                    " "
                )[1];
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message:
                    "Not authorized. Please login.",
            });
        }

        // Verify token
        const decoded =
            jwt.verify(
                token,
                process.env.JWT_SECRET
            );

        // Find user
        const user =
            await User.findById(
                decoded.id
            ).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message:
                    "User no longer exists.",
            });
        }

        req.user = user;

        next();
    } catch (error) {
        console.error(
            "AUTH MIDDLEWARE ERROR:",
            error.message
        );

        return res.status(401).json({
            success: false,
            message:
                "Invalid or expired token.",
        });
    }
};

module.exports = {
    protect,
};