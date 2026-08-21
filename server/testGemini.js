require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");

console.log(
    "Gemini API key loaded:",
    process.env.GEMINI_API_KEY
        ? "YES ✅"
        : "NO ❌"
);

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function testGemini() {
    try {
        const response =
            await ai.models.generateContent({
                model:
                    process.env.GEMINI_MODEL ||
                    "gemini-3.1-flash-lite",
                contents:
                    "Say hello from Roopa AI in one sentence.",
            });

        console.log(
            "✅ GEMINI WORKS!"
        );

        console.log(
            response.text
        );
    } catch (error) {
        console.error(
            "❌ GEMINI FAILED"
        );

        console.error(
            "MESSAGE:",
            error.message
        );

        console.error(
            "STATUS:",
            error.status
        );
    }
}

testGemini();