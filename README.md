🌐 Live Demo: https://roopas-restaurant.netlify.app
💻 GitHub: https://github.com/Abhinav45-web/roopas-restaurant

# 🍽️ Roopa's Restaurant

### AI-Powered Full-Stack Food Ordering Platform

Roopa's Restaurant is a production-style full-stack food ordering platform built with the MERN stack and enhanced with **Roopa AI**, an AI food assistant powered by Google Gemini.

The goal was to build more than a basic restaurant CRUD application — the project connects food discovery, AI recommendations, cart management, ordering, payments, reviews, email notifications, order tracking, and administration into one complete product experience.

---

## 🤖 Roopa AI

The standout feature of the project is **Roopa AI**.

Instead of using a chatbot with hard-coded responses, Roopa AI works with the restaurant's **real menu stored in MongoDB**.

Users can ask natural-language questions such as:

> "I have ₹150 and want spicy vegetarian food."

Roopa AI understands the request and considers:

- Budget
- Veg / Non-Veg preference
- Food category
- Taste preferences
- Popularity
- Preparation time

It then recommends matching dishes from the actual restaurant menu.

### AI → Cart Flow

```text
User Request
     ↓
Roopa AI
     ↓
MongoDB Menu
     ↓
AI Recommendation
     ↓
Recommended Dish
     ↓
Add to Cart
     ↓
Checkout



this is enough
