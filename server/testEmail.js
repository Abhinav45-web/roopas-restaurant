const dotenv = require("dotenv");

dotenv.config();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const testEmail = async () => {
    try {
        console.log("EMAIL_USER:", process.env.EMAIL_USER);
        console.log(
            "EMAIL_PASSWORD:",
            process.env.EMAIL_PASSWORD
                ? "Loaded ✅"
                : "Missing ❌"
        );

        await transporter.verify();

        console.log(
            "✅ EMAIL SERVICE CONNECTED!"
        );

        process.exit(0);
    } catch (error) {
        console.log(
            "❌ EMAIL SERVICE FAILED"
        );

        console.log(
            "Error code:",
            error.code
        );

        console.log(
            "Error response:",
            error.response
        );

        console.log(
            "Error message:",
            error.message
        );

        process.exit(1);
    }
};

testEmail();