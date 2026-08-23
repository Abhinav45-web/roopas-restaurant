const model =
    process.env.GEMINI_MODEL ||
    "gemini-3.1-flash-lite";

const response =
    await ai.models.generateContent({
        model,
        contents: prompt,
    });