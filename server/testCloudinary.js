const dotenv = require("dotenv");

// Load .env FIRST
dotenv.config();

const cloudinary = require("./config/cloudinary");

const testCloudinary = async () => {
    try {
        console.log("Testing Cloudinary...");
        console.log(
            "Cloud Name:",
            process.env.CLOUDINARY_CLOUD_NAME
                ? "Loaded ✅"
                : "Missing ❌"
        );
        console.log(
            "API Key:",
            process.env.CLOUDINARY_API_KEY
                ? "Loaded ✅"
                : "Missing ❌"
        );
        console.log(
            "API Secret:",
            process.env.CLOUDINARY_API_SECRET
                ? "Loaded ✅"
                : "Missing ❌"
        );

        const result = await cloudinary.api.ping();

        console.log("--------------------------------");
        console.log("✅ CLOUDINARY CONNECTED!");
        console.log("Status:", result.status);
        console.log("--------------------------------");

        process.exit(0);
    } catch (error) {
        console.log("--------------------------------");
        console.log("❌ CLOUDINARY CONNECTION FAILED");
        console.log("Message:", error.message);
        console.log("--------------------------------");

        process.exit(1);
    }
};

testCloudinary();