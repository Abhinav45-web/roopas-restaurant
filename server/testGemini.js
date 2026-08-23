require("dotenv").config();


// ==========================================
// TEST GEMINI
// ==========================================

const testGemini = async () => {
    try {
        console.log(
            "================================="
        );

        console.log(
            "🤖 ROOPA AI GEMINI TEST"
        );

        console.log(
            "================================="
        );


        // ------------------------------------------
        // CHECK API KEY
        // ------------------------------------------

        console.log(
            "Gemini API key loaded:",
            process.env.GEMINI_API_KEY
                ? "YES ✅"
                : "NO ❌"
        );


        // ------------------------------------------
        // MODEL
        // ------------------------------------------

        const model =
            process.env.GEMINI_MODEL ||
            "gemini-3.1-flash-lite";

        console.log(
            "Gemini model:",
            model
        );


        // ------------------------------------------
        // LOAD ESM SDK DYNAMICALLY
        // ------------------------------------------

        const geminiModule =
            await import("@google/genai");

        const GoogleGenAI =
            geminiModule.GoogleGenAI;


        if (!GoogleGenAI) {
            throw new Error(
                "GoogleGenAI could not be loaded."
            );
        }


        // ------------------------------------------
        // CREATE CLIENT
        // ------------------------------------------

        const ai =
            new GoogleGenAI({
                apiKey:
                    process.env
                        .GEMINI_API_KEY,
            });


        // ------------------------------------------
        // TEST REQUEST
        // ------------------------------------------

        const response =
            await ai.models.generateContent(
                {
                    model,

                    contents:
                        "Say hello from Roopa AI in one short sentence.",
                }
            );


        // ------------------------------------------
        // SUCCESS
        // ------------------------------------------

        console.log(
            "✅ GEMINI WORKS!"
        );

        console.log(
            "Roopa AI:",
            response.text
        );

        console.log(
            "================================="
        );
    } catch (error) {
        // ------------------------------------------
        // ERROR
        // ------------------------------------------

        console.error(
            "================================="
        );

        console.error(
            "❌ GEMINI FAILED"
        );

        console.error(
            "NAME:",
            error.name
        );

        console.error(
            "CODE:",
            error.code
        );

        console.error(
            "STATUS:",
            error.status
        );

        console.error(
            "MESSAGE:",
            error.message
        );

        console.error(
            "STACK:",
            error.stack
        );

        console.error(
            "================================="
        );

        process.exit(1);
    }
};


testGemini();