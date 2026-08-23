let geminiClient = null;

/**
 * Get a singleton Gemini client.
 *
 * @returns {Promise<object>}
 */
const getGeminiClient = async () => {
    if (geminiClient) {
        return geminiClient;
    }

    if (!process.env.GEMINI_API_KEY) {
        throw new Error(
            "GEMINI_API_KEY is missing from environment variables."
        );
    }

    // @google/genai is ESM, while the rest of our
    // backend currently uses CommonJS.
    const geminiModule =
        await import("@google/genai");

    const GoogleGenAI =
        geminiModule.GoogleGenAI;

    if (!GoogleGenAI) {
        throw new Error(
            "GoogleGenAI could not be loaded from @google/genai."
        );
    }

    geminiClient = new GoogleGenAI({
        apiKey:
            process.env.GEMINI_API_KEY,
    });

    return geminiClient;
};

module.exports = {
    getGeminiClient,
};