import React from "react";
import { Link } from "react-router-dom";

import AIAssistant from "../components/AIAssistant";

function Home() {
    return (
        <div>

            {/* =========================================
                HERO
            ========================================= */}

            <section className="hero">

                <div className="hero-content">

                    <div className="hero-badge">
                        🍽️ Freshly Made • Delivered Fast
                    </div>

                    <h1>
                        Good food.
                        <br />
                        Good{" "}
                        <span>
                            mood.
                        </span>
                    </h1>

                    <p>
                        Welcome to Roopa's Restaurant —
                        delicious food, honest prices,
                        and a little happiness in every bite.
                    </p>

                    <div className="hero-buttons">

                        <Link
                            to="/menu"
                            className="primary-button"
                        >
                            Explore Menu →
                        </Link>

                        <Link
                            to="/orders"
                            className="secondary-button"
                        >
                            Track Order
                        </Link>

                    </div>

                    <div className="hero-stats">

                        <div>
                            <strong>
                                35+
                            </strong>

                            <span>
                                Delicious Dishes
                            </span>
                        </div>

                        <div>
                            <strong>
                                ⭐ 4.8
                            </strong>

                            <span>
                                Customer Rating
                            </span>
                        </div>

                        <div>
                            <strong>
                                ⚡ Fast
                            </strong>

                            <span>
                                Fresh Delivery
                            </span>
                        </div>

                    </div>

                </div>


                <div className="hero-visual">

                    <div className="food-circle">
                        <div className="food-emoji">
                            🍛
                        </div>
                    </div>

                    <div className="floating-card card-one">
                        🔥 Bestseller
                    </div>

                    <div className="floating-card card-two">
                        ⭐ Loved by customers
                    </div>

                </div>

            </section>


            {/* =========================================
                POPULAR CATEGORIES
            ========================================= */}

            <section className="section">

                <div className="section-heading">

                    <div>
                        <span className="eyebrow">
                            SOMETHING FOR EVERY CRAVING
                        </span>

                        <h2>
                            Explore Categories
                        </h2>
                    </div>

                    <p>
                        From biryani and burgers to
                        desserts and refreshing drinks.
                    </p>

                </div>


                <div className="category-grid">

                    <Link
                        to="/menu"
                        className="category-card"
                    >
                        <span>🍛</span>
                        <h3>Biryani</h3>
                    </Link>

                    <Link
                        to="/menu"
                        className="category-card"
                    >
                        <span>🍕</span>
                        <h3>Pizza</h3>
                    </Link>

                    <Link
                        to="/menu"
                        className="category-card"
                    >
                        <span>🍔</span>
                        <h3>Burgers</h3>
                    </Link>

                    <Link
                        to="/menu"
                        className="category-card"
                    >
                        <span>🥟</span>
                        <h3>Chinese</h3>
                    </Link>

                    <Link
                        to="/menu"
                        className="category-card"
                    >
                        <span>🥘</span>
                        <h3>Main Course</h3>
                    </Link>

                    <Link
                        to="/menu"
                        className="category-card"
                    >
                        <span>🍰</span>
                        <h3>Desserts</h3>
                    </Link>

                </div>

            </section>


            {/* =========================================
                FEATURED DISHES
            ========================================= */}

            <section className="section">

                <div className="section-heading">

                    <div>
                        <span className="eyebrow">
                            CUSTOMER FAVOURITES
                        </span>

                        <h2>
                            Today's Favourites
                        </h2>
                    </div>

                    <Link
                        to="/menu"
                        className="secondary-button"
                    >
                        View Full Menu →
                    </Link>

                </div>


                <div className="food-grid">

                    <div className="category-card">
                        <span>🍛</span>

                        <h3>
                            Chicken Biryani
                        </h3>

                        <p>
                            Aromatic,
                            spicy and
                            always a
                            bestseller.
                        </p>

                        <strong>
                            ₹249
                        </strong>
                    </div>

                    <div className="category-card">
                        <span>🍕</span>

                        <h3>
                            Chicken Pizza
                        </h3>

                        <p>
                            Crispy crust,
                            chicken and
                            loads of cheese.
                        </p>

                        <strong>
                            ₹349
                        </strong>
                    </div>

                    <div className="category-card">
                        <span>🍔</span>

                        <h3>
                            Chicken Burger
                        </h3>

                        <p>
                            Juicy chicken,
                            fluffy bun,
                            big flavour.
                        </p>

                        <strong>
                            ₹179
                        </strong>
                    </div>

                    <div className="category-card">
                        <span>🍰</span>

                        <h3>
                            Chocolate Cake
                        </h3>

                        <p>
                            Rich chocolate
                            happiness in
                            every bite.
                        </p>

                        <strong>
                            ₹149
                        </strong>
                    </div>

                </div>

            </section>


            {/* =========================================
                ROOPA AI
            ========================================= */}

            <AIAssistant />


            {/* =========================================
                CTA
            ========================================= */}

            <section className="section">

                <div
                    style={{
                        background: "#fff0e5",
                        borderRadius: "28px",
                        padding: "45px",
                        textAlign: "center",
                    }}
                >

                    <span className="eyebrow">
                        READY TO EAT?
                    </span>

                    <h2
                        style={{
                            fontFamily:
                                "Playfair Display, serif",
                            fontSize:
                                "42px",
                            margin:
                                "10px 0",
                        }}
                    >
                        Your next favourite
                        meal is waiting.
                    </h2>

                    <p
                        style={{
                            color:
                                "#81756d",
                            maxWidth:
                                "600px",
                            margin:
                                "0 auto 22px",
                            lineHeight:
                                "1.6",
                        }}
                    >
                        Browse our menu,
                        ask Roopa AI,
                        and order something
                        delicious today.
                    </p>

                    <Link
                        to="/menu"
                        className="primary-button"
                        style={{
                            width:
                                "fit-content",
                            margin:
                                "0 auto",
                        }}
                    >
                        Order Now 🍽️
                    </Link>

                </div>

            </section>

        </div>
    );
}

export default Home;