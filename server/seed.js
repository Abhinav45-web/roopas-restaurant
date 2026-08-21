const dotenv = require("dotenv");
const connectDB = require("./config/db");
const Food = require("./models/Food");

dotenv.config();

const foods = [
    {
        name: "Chicken Biryani",
        description:
            "Aromatic rice, juicy chicken and enough spice to make your taste buds dance. 💃🔥",
        category: "Biryani",
        price: 249,
        rating: 4.8,
        time: "25-30 min",
        emoji: "🍛",
        type: "non-veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Mutton Biryani",
        description:
            "Tender mutton buried under fragrant rice — basically treasure, but edible. 😋👑",
        category: "Biryani",
        price: 299,
        rating: 4.9,
        time: "30-35 min",
        emoji: "🍛",
        type: "non-veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Veg Biryani",
        description:
            "Fresh veggies, aromatic rice and zero meat — your vegetarian bestie approves. 🌱❤️",
        category: "Biryani",
        price: 199,
        rating: 4.5,
        time: "20-25 min",
        emoji: "🥘",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Chicken Tikka",
        description:
            "Smoky, spicy and grilled to perfection — one bite and you'll forget your diet. 🔥😂",
        category: "Starters",
        price: 229,
        rating: 4.7,
        time: "20-25 min",
        emoji: "🍗",
        type: "non-veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Paneer Tikka",
        description:
            "Soft paneer with smoky spices — proof that vegetarian food can steal the show. 😎🧀",
        category: "Starters",
        price: 199,
        rating: 4.6,
        time: "20-25 min",
        emoji: "🧀",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Butter Chicken",
        description:
            "Creamy, buttery and dangerously delicious — naan doesn't stand a chance. 🤤",
        category: "Main Course",
        price: 279,
        rating: 4.8,
        time: "25-30 min",
        emoji: "🍗",
        type: "non-veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Paneer Butter Masala",
        description:
            "Rich, creamy paneer swimming in buttery masala. No lifeguard needed. 😂❤️",
        category: "Main Course",
        price: 229,
        rating: 4.6,
        time: "20-25 min",
        emoji: "🥘",
        type: "veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Margherita Pizza",
        description:
            "Cheesy, saucy and ready to solve at least 73% of your bad-day problems. 🍕😌",
        category: "Pizza",
        price: 299,
        rating: 4.7,
        time: "20-30 min",
        emoji: "🍕",
        type: "veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Chicken Pizza",
        description:
            "Chicken + cheese + crispy crust = a meeting your stomach definitely wants to attend. 🔥",
        category: "Pizza",
        price: 349,
        rating: 4.7,
        time: "20-30 min",
        emoji: "🍕",
        type: "non-veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Chicken Burger",
        description:
            "Juicy chicken packed between fluffy buns — messy hands, happy heart. 🍔❤️",
        category: "Burger",
        price: 179,
        rating: 4.5,
        time: "15-20 min",
        emoji: "🍔",
        type: "non-veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Veg Burger",
        description:
            "Crispy, crunchy and totally veg — your wallet and stomach can both celebrate. 💚💰",
        category: "Burger",
        price: 149,
        rating: 4.4,
        time: "15-20 min",
        emoji: "🍔",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Chicken Noodles",
        description:
            "Slurpy noodles loaded with chicken — chopsticks optional, hunger mandatory. 😂🥢",
        category: "Chinese",
        price: 169,
        rating: 4.5,
        time: "15-20 min",
        emoji: "🍜",
        type: "non-veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Veg Hakka Noodles",
        description:
            "Wok-tossed noodles with crunchy veggies and serious street-food energy. 🔥🥢",
        category: "Chinese",
        price: 149,
        rating: 4.4,
        time: "15-20 min",
        emoji: "🍜",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Chicken Fried Rice",
        description:
            "Fluffy rice, smoky wok flavour and chicken in every happy bite. 🤤🔥",
        category: "Chinese",
        price: 179,
        rating: 4.5,
        time: "15-20 min",
        emoji: "🍚",
        type: "non-veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Veg Fried Rice",
        description:
            "Colourful veggies + smoky rice = simple, tasty and budget-friendly. 🌱💰",
        category: "Chinese",
        price: 139,
        rating: 4.3,
        time: "15-20 min",
        emoji: "🍚",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Chicken Momos",
        description:
            "Steamy little pockets of chicken happiness — one plate is never enough. 😂🥟",
        category: "Chinese",
        price: 159,
        rating: 4.6,
        time: "15-20 min",
        emoji: "🥟",
        type: "non-veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Veg Momos",
        description:
            "Tiny dumplings, massive flavour. Your snack cravings just found their soulmate. ❤️",
        category: "Chinese",
        price: 129,
        rating: 4.4,
        time: "15-20 min",
        emoji: "🥟",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Cheese Momos",
        description:
            "Steamy dumplings hiding a cheesy surprise inside. 🧀🥟",
        category: "Chinese",
        price: 169,
        rating: 4.5,
        time: "15-20 min",
        emoji: "🥟",
        type: "veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Chicken 65",
        description:
            "Crispy, spicy and dangerously addictive — 65 pieces not included, thankfully. 😂🔥",
        category: "Starters",
        price: 189,
        rating: 4.7,
        time: "15-20 min",
        emoji: "🍗",
        type: "non-veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Chilli Paneer",
        description:
            "Paneer with a spicy attitude — basically the food version of a savage reply. 🌶️😂",
        category: "Starters",
        price: 179,
        rating: 4.5,
        time: "15-20 min",
        emoji: "🧀",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Crispy Corn",
        description:
            "Crunchy golden corn that makes 'just one bite' a complete lie. 😋",
        category: "Starters",
        price: 129,
        rating: 4.3,
        time: "10-15 min",
        emoji: "🌽",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Masala Dosa",
        description:
            "Crispy outside, masala inside — South India's legendary comfort food. 😍",
        category: "South Indian",
        price: 119,
        rating: 4.7,
        time: "10-15 min",
        emoji: "🥞",
        type: "veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Paneer Dosa",
        description:
            "Dosa meets paneer and somehow becomes even more dangerous to your diet. 😂",
        category: "South Indian",
        price: 159,
        rating: 4.5,
        time: "15-20 min",
        emoji: "🥞",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Idli Sambar",
        description:
            "Soft idlis swimming happily in spicy sambar. 🏊😂",
        category: "South Indian",
        price: 89,
        rating: 4.4,
        time: "10-15 min",
        emoji: "🍘",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Butter Naan",
        description:
            "Soft, buttery and designed specifically to chase every last drop of curry. 🧈",
        category: "Breads",
        price: 49,
        rating: 4.5,
        time: "10-15 min",
        emoji: "🫓",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Garlic Naan",
        description:
            "Crispy, garlicky and powerful enough to keep vampires away. 🧄😂",
        category: "Breads",
        price: 69,
        rating: 4.6,
        time: "10-15 min",
        emoji: "🫓",
        type: "veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Chicken Kebab",
        description:
            "Smoky grilled chicken with serious barbecue energy. 🔥🍗",
        category: "Starters",
        price: 229,
        rating: 4.7,
        time: "20-25 min",
        emoji: "🍢",
        type: "non-veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Chicken Curry",
        description:
            "Homestyle chicken curry that makes plain rice suddenly feel like a five-star meal. ❤️",
        category: "Main Course",
        price: 239,
        rating: 4.6,
        time: "25-30 min",
        emoji: "🍗",
        type: "non-veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Dal Tadka",
        description:
            "Simple, comforting and packed with tadka — humble food with superstar flavour. ⭐",
        category: "Main Course",
        price: 109,
        rating: 4.4,
        time: "15-20 min",
        emoji: "🥣",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Peri Peri Fries",
        description:
            "Crispy fries with a spicy kick that your fingers won't stop reaching for. 🔥🍟",
        category: "Sides",
        price: 129,
        rating: 4.5,
        time: "10-15 min",
        emoji: "🍟",
        type: "veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Mango Lassi",
        description:
            "Thick, creamy mango happiness in a glass. Summer just got promoted. 🥭😎",
        category: "Drinks",
        price: 99,
        rating: 4.6,
        time: "5-10 min",
        emoji: "🥭",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Cold Coffee",
        description:
            "Chilled coffee for when you need caffeine but also want dessert vibes. ☕😂",
        category: "Drinks",
        price: 129,
        rating: 4.5,
        time: "5-10 min",
        emoji: "🥤",
        type: "veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Mango Shake",
        description:
            "Fresh mango blended into a glass of pure sunshine. 🥭☀️",
        category: "Drinks",
        price: 119,
        rating: 4.4,
        time: "5-10 min",
        emoji: "🥭",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Chocolate Cake",
        description:
            "Rich, chocolatey and scientifically proven to make Mondays slightly less terrible. 🍫😂",
        category: "Dessert",
        price: 149,
        rating: 4.8,
        time: "5-10 min",
        emoji: "🍰",
        type: "veg",
        bestseller: true,
        available: true,
        image: "",
    },

    {
        name: "Ice Cream",
        description:
            "Cold, creamy happiness served in a scoop. Happiness should be affordable. 😎🍨",
        category: "Dessert",
        price: 99,
        rating: 4.5,
        time: "5-10 min",
        emoji: "🍨",
        type: "veg",
        bestseller: false,
        available: true,
        image: "",
    },

    {
        name: "Gulab Jamun",
        description:
            "Soft, syrupy little legends that disappear suspiciously fast. 👀❤️",
        category: "Dessert",
        price: 89,
        rating: 4.7,
        time: "5-10 min",
        emoji: "🍯",
        type: "veg",
        bestseller: true,
        available: true,
        image: "",
    },
];

const seedDatabase = async () => {
    try {
        await connectDB();

        console.log("Clearing old food items...");

        await Food.deleteMany({});

        console.log(
            `${foods.length} food items prepared.`
        );

        await Food.insertMany(foods);

        console.log(
            "✅ Food database seeded successfully!"
        );

        console.log(
            `🍽️ Total foods inserted: ${foods.length}`
        );

        process.exit(0);
    } catch (error) {
        console.error(
            "❌ SEED ERROR:",
            error
        );

        process.exit(1);
    }
};

seedDatabase();