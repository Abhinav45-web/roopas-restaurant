const Food = require("../models/Food");

const {
    getGeminiClient,
} = require("../config/gemini");


// ==========================================
// GET FOOD RECOMMENDATIONS
// ==========================================

const getFoodRecommendations = async (
    req,
    res
) => {
    try {
        const { message } = req.body;

        // ------------------------------------------
        // VALIDATE REQUEST
        // ------------------------------------------

        if (
            !message ||
            !message.trim()
        ) {
            return res.status(400).json({
                success: false,
                message:
                    "Please tell Roopa AI what you're craving.",
            });
        }


        // ------------------------------------------
        // GET AVAILABLE MENU
        // ------------------------------------------

        const foods =
            await Food.find({
                available: true,
            }).lean();

        if (!foods || foods.length === 0) {
            return res.status(404).json({
                success: false,
                message:
                    "No food items are currently available.",
            });
        }


        // ------------------------------------------
        // PREPARE MENU FOR AI
        // ------------------------------------------

        const menu = foods.map(
            (food) => ({
                id: food._id.toString(),

                name: food.name,

                description:
                    food.description,

                category:
                    food.category,

                price:
                    food.price,

                type:
                    food.type,

                rating:
                    food.rating,

                time:
                    food.time,

                bestseller:
                    food.bestseller,
            })
        );


        // ------------------------------------------
        // AI PROMPT
        // ------------------------------------------

        const prompt = `
You are Roopa AI, the official AI food assistant for Roopa's Restaurant.

Your job is to help customers choose food from the restaurant's actual menu.

CUSTOMER REQUEST:
${message}

AVAILABLE MENU:
${JSON.stringify(menu)}

STRICT RULES:

1. Recommend ONLY dishes from the AVAILABLE MENU.
2. Never invent a dish.
3. Never invent a price.
4. Never invent an ID.
5. Respect the customer's budget if mentioned.
6. Respect vegetarian/non-vegetarian preferences.
7. Consider preferences such as:
   - spicy
   - sweet
   - filling
   - light
   - quick
   - popular
   - healthy
8. Recommend a maximum of 4 dishes.
9. If there is no exact match, recommend the closest available dishes.
10. Explain briefly why each recommendation matches.
11. Keep the response friendly and concise.
12. Return ONLY valid JSON.

RESPONSE FORMAT:

{
  "reply": "friendly explanation",
  "recommendations": [
    {
      "id": "exact menu id",
      "name": "exact menu name",
      "price": 0,
      "reason": "why this matches the customer's request"
    }
  ]
}
`;


        // ------------------------------------------
        // GET GEMINI CLIENT
        // ------------------------------------------

        const ai =
            await getGeminiClient();


        // ------------------------------------------
        // MODEL
        // ------------------------------------------

        const model =
            process.env.GEMINI_MODEL ||
            "gemini-3.1-flash-lite";

        console.log(
            "🤖 Roopa AI model:",
            model
        );


        // ------------------------------------------
        // GENERATE RESPONSE
        // ------------------------------------------

        const response =
            await ai.models.generateContent(
                {
                    model,

                    contents: prompt,

                    config: {
                        temperature:
                            0.4,

                        maxOutputTokens:
                            600,

                        responseMimeType:
                            "application/json",
                    },
                }
            );


        // ------------------------------------------
        // READ RESPONSE
        // ------------------------------------------

        const rawText =
            response.text || "";

        console.log(
            "🤖 Roopa AI response received"
        );


        if (!rawText.trim()) {
            return res.status(500).json({
                success: false,
                message:
                    "Roopa AI returned an empty response.",
            });
        }


        // ------------------------------------------
        // PARSE JSON
        // ------------------------------------------

        let result;

        try {
            result =
                JSON.parse(rawText);
        } catch (parseError) {
            console.error(
                "ROOPA AI JSON PARSE ERROR:",
                parseError
            );

            // Don't expose raw AI internals
            return res.status(200).json({
                success: true,
                reply:
                    rawText ||
                    "Roopa AI couldn't format the recommendations.",
                recommendations: [],
            });
        }


        // ------------------------------------------
        // VALIDATE AI RECOMMENDATIONS
        // AGAINST REAL MONGODB DATA
        // ------------------------------------------

        const validFoodMap =
            new Map(
                foods.map(
                    (food) => [
                        food._id.toString(),
                        food,
                    ]
                )
            );


        const recommendations =
            Array.isArray(
                result.recommendations
            )
                ? result.recommendations
                      .filter(
                          (item) =>
                              item &&
                              validFoodMap.has(
                                  item.id
                              )
                      )
                      .slice(0, 4)
                      .map((item) => {
                          const food =
                              validFoodMap.get(
                                  item.id
                              );

                          return {
                              id: food._id.toString(),

                              name:
                                  food.name,

                              price:
                                  food.price,

                              reason:
                                  item.reason ||
                                  "A good match for your request.",
                          };
                      })
                : [];


        // ------------------------------------------
        // SEND RESPONSE
        // ------------------------------------------

        return res.status(200).json({
            success: true,

            reply:
                result.reply ||
                "Here are some dishes Roopa AI thinks you'll like!",

            recommendations,
        });
    } catch (error) {
        // ------------------------------------------
        // DETAILED SERVER LOGGING
        // ------------------------------------------

        console.error(
            "========================================"
        );

        console.error(
            "❌ ROOPA AI ERROR"
        );

        console.error(
            "NAME:",
            error.name
        );

        console.error(
            "MESSAGE:",
            error.message
        );

        console.error(
            "STATUS:",
            error.status
        );

        console.error(
            "CODE:",
            error.code
        );

        console.error(
            "STACK:",
            error.stack
        );

        console.error(
            "========================================"
        );


        // ------------------------------------------
        // CLIENT RESPONSE
        // ------------------------------------------

        return res.status(500).json({
            success: false,

            message:
                error.message ||
                "Roopa AI is currently unavailable.",
        });
    }
};


module.exports = {
    getFoodRecommendations,
};