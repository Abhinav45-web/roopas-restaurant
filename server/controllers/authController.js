const jwt = require("jsonwebtoken");
const User = require("../models/User");


// ==========================================
// GENERATE TOKEN
// ==========================================

const generateToken = (userId) => {
    return jwt.sign(
        {
            id: userId,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};


// ==========================================
// REGISTER
// ==========================================

const registerUser = async (
    req,
    res
) => {
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        if (
            !name ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Please fill all required fields.",
            });
        }

        const existingUser =
            await User.findOne({
                email:
                    email.toLowerCase(),
            });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message:
                    "User already exists.",
            });
        }

        const user =
            await User.create({
                name: name.trim(),

                email:
                    email
                        .toLowerCase()
                        .trim(),

                password,

                role: "user",
            });

        const token =
            generateToken(
                user._id
            );

        res.status(201).json({
            success: true,

            message:
                "Registration successful.",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(
            "REGISTER ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message,
        });
    }
};


// ==========================================
// LOGIN
// ==========================================

const loginUser = async (
    req,
    res
) => {
    try {
        const {
            email,
            password,
        } = req.body;

        if (
            !email ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Email and password are required.",
            });
        }

        const user =
            await User.findOne({
                email:
                    email
                        .toLowerCase()
                        .trim(),
            });

        if (!user) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password.",
            });
        }

        const isMatch =
            await user.matchPassword(
                password
            );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message:
                    "Invalid email or password.",
            });
        }

        const token =
            generateToken(
                user._id
            );

        res.status(200).json({
            success: true,

            message:
                "Login successful.",

            token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(
            "LOGIN ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message,
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
};