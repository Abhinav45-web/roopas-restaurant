const ai = require("../config/gemini");
const Food = require("../models/Food");

const getFoodRecommendations = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message:
                    "Please tell Roopa AI what you're craving.",
            });
        }

        const foods = await Food.find({
            available: true,
        }).lean();

        if (foods.length === 0) {
            return res.status(404).json({
                success: false,
                message:
                    "No food items are currently available.",
            });
        }

        const menu = foods.map((food) => ({
            id: food._id.toString(),
            name: food.name,
            description: food.description,
            category: food.category,
            price: food.price,
            type: food.type,
            rating: food.rating,
            time: food.time,
            bestseller: food.bestseller,
        }));

        const prompt = `
You are Roopa AI, the official AI food assistant for Roopa's Restaurant.

Customer request:
${message}

Available restaurant menu:
${JSON.stringify(menu)}

Rules:
1. Recommend ONLY dishes from the supplied menu.
2. Never invent names, prices, IDs, or dishes.
3. Respect the customer's stated budget.
4. Respect veg/non-veg preference.
5. Consider preferences like spicy, sweet, filling, light, quick, popular, etc.
6. Recommend at most 4 dishes.
7. If there is no exact match, recommend the closest available choices and explain why.
8. Be friendly, concise, and useful.

Return ONLY valid JSON:
{
  "reply": "friendly explanation",
  "recommendations": [
    {
      "id": "exact menu id",
      "name": "exact menu name",
      "price": 0,
      "reason": "why this dish matches"
    }
  ]
}
`;

        const response = await ai.models.generateContent({
            model:
                process.env.GEMINI_MODEL ||
                "gemini-3.1-flash-lite",
            contents: prompt,
        });

        const rawText =
            response.text || "";

        let result;

        try {
            result = JSON.parse(rawText);
        } catch (parseError) {
            console.error(
                "GEMINI JSON PARSE ERROR:",
                parseError
            );

            return res.status(200).json({
                success: true,
                reply: rawText,
                recommendations: [],
            });
        }

        const validFoodMap = new Map(
            foods.map((food) => [
                food._id.toString(),
                food,
            ])
        );

        const recommendations = (
            result.recommendations || []
        )
            .filter((item) =>
                validFoodMap.has(item.id)
            )
            .slice(0, 4)
            .map((item) => {
                const food =
                    validFoodMap.get(item.id);

                return {
                    id: food._id.toString(),
                    name: food.name,
                    price: food.price,
                    reason:
                        item.reason ||
                        "A good match for your request.",
                };
            });

        res.status(200).json({
            success: true,
            reply:
                result.reply ||
                "Here are some dishes Roopa AI thinks you'll like!",
            recommendations,
        });
    } catch (error) {
        console.error(
            "ROOPA AI ERROR:",
            error
        );

        res.status(500).json({
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