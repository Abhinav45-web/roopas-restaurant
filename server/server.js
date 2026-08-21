const dotenv = require("dotenv");

// Load environment variables first
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");

// ==========================================
// ROUTES
// ==========================================

const foodRoutes = require("./routes/foodRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const passwordRoutes = require("./routes/passwordRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const aiRoutes = require("./routes/aiRoutes");


// ==========================================
// APP
// ==========================================

const app = express();


// ==========================================
// DATABASE
// ==========================================

connectDB();


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(
    cors({
        origin: true,
        credentials: true,
    })
);

app.use(
    express.json()
);

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(
    cookieParser()
);


// ==========================================
// API ROUTES
// ==========================================

app.use(
    "/api/foods",
    foodRoutes
);

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/cart",
    cartRoutes
);

app.use(
    "/api/orders",
    orderRoutes
);

app.use(
    "/api/password",
    passwordRoutes
);

app.use(
    "/api/reviews",
    reviewRoutes
);

app.use(
    "/api/payment",
    paymentRoutes
);

app.use(
    "/api/ai",
    aiRoutes
);
// ==========================================
// HEALTH CHECK
// ==========================================
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message:
            "Roopa's Restaurant API is running...",
    });
});


// ==========================================
// 404
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message:
            "API route not found",
    });
});


// ==========================================
// ERROR HANDLER
// ==========================================

app.use(
    (
        error,
        req,
        res,
        next
    ) => {
        console.error(
            "SERVER ERROR:",
            error
        );

        res.status(
            error.status || 500
        ).json({
            success: false,
            message:
                error.message ||
                "Internal server error",
        });
    }
);


// ==========================================
// START SERVER
// ==========================================

const PORT =
    process.env.PORT || 5000;

app.listen(
    PORT,
    () => {
        console.log(
            "================================="
        );

        console.log(
            "🍽️ Roopa's Restaurant Server"
        );

        console.log(
            `🚀 Server running on port ${PORT}`
        );

        console.log(
            `🌐 API: http://localhost:${PORT}`
        );

        console.log(
            "================================="
        );
    }
);