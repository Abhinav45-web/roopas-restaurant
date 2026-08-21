const User = require("../models/User");

// ==========================================
// GET ALL USERS - ADMIN ONLY
// ==========================================

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({
                createdAt: -1,
            });

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        console.error(
            "GET ALL USERS ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Unable to fetch users.",
        });
    }
};


// ==========================================
// GET SINGLE USER - ADMIN ONLY
// ==========================================

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(
            req.params.id
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        console.error(
            "GET USER ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Unable to fetch user.",
        });
    }
};


// ==========================================
// DELETE USER - ADMIN ONLY
// ==========================================

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }

        // Prevent admin from deleting themselves
        if (
            user._id.toString() ===
            req.user._id.toString()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "You cannot delete your own admin account.",
            });
        }

        await User.findByIdAndDelete(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message:
                "User deleted successfully.",
        });
    } catch (error) {
        console.error(
            "DELETE USER ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Unable to delete user.",
        });
    }
};


// ==========================================
// UPDATE USER ROLE - ADMIN ONLY
// ==========================================

const updateUserRole = async (
    req,
    res
) => {
    try {
        const { role } = req.body;

        if (
            !["user", "admin"].includes(
                role
            )
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Role must be user or admin.",
            });
        }

        const user = await User.findById(
            req.params.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message:
                    "User not found.",
            });
        }

        // Prevent removing your own admin role
        if (
            user._id.toString() ===
                req.user._id.toString() &&
            role !== "admin"
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "You cannot remove your own admin role.",
            });
        }

        user.role = role;

        await user.save();

        res.status(200).json({
            success: true,
            message:
                "User role updated successfully.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt:
                    user.createdAt,
            },
        });
    } catch (error) {
        console.error(
            "UPDATE USER ROLE ERROR:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                error.message ||
                "Unable to update user role.",
        });
    }
};


module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUserRole,
};