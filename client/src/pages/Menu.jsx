import React, {
    useEffect,
    useMemo,
    useState,
} from "react";

import FoodCard from "../components/FoodCard";
import {
    getFoods,
} from "../services/foodApi";

function Menu() {
    const [foods, setFoods] = useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [search, setSearch] =
        useState("");

    const [category, setCategory] =
        useState("All");

    const [foodType, setFoodType] =
        useState("All");

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            setLoading(true);
            setError("");

            const data =
                await getFoods();

            console.log(
                "FOODS RESPONSE:",
                data
            );

            setFoods(
                Array.isArray(
                    data
                )
                    ? data
                    : data.foods || []
            );
        } catch (error) {
            console.error(
                "GET FOODS ERROR:",
                error
            );

            setError(
                error.response?.data
                    ?.message ||
                    "Unable to load menu."
            );
        } finally {
            setLoading(false);
        }
    };

    const categories = useMemo(() => {
        const uniqueCategories = [
            ...new Set(
                foods
                    .map(
                        (food) =>
                            food.category
                    )
                    .filter(Boolean)
            ),
        ];

        return [
            "All",
            ...uniqueCategories,
        ];
    }, [foods]);

    const filteredFoods = useMemo(() => {
        return foods.filter(
            (food) => {
                const matchesSearch =
                    food.name
                        ?.toLowerCase()
                        .includes(
                            search
                                .toLowerCase()
                        ) ||
                    food.description
                        ?.toLowerCase()
                        .includes(
                            search
                                .toLowerCase()
                        );

                const matchesCategory =
                    category ===
                        "All" ||
                    food.category ===
                        category;

                const matchesType =
                    foodType ===
                        "All" ||
                    food.type ===
                        foodType;

                return (
                    matchesSearch &&
                    matchesCategory &&
                    matchesType
                );
            }
        );
    }, [
        foods,
        search,
        category,
        foodType,
    ]);

    if (loading) {
        return (
            <div className="menu-page">
                <div className="menu-hero">
                    <h1>
                        Loading our
                        <span>
                            delicious
                        </span>{" "}
                        menu...
                    </h1>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="menu-page">
                <div className="menu-hero">
                    <h1>
                        Oops! 🍽️
                    </h1>

                    <p
                        style={{
                            color:
                                "#d84635",
                            marginTop:
                                "15px",
                        }}
                    >
                        {error}
                    </p>

                    <button
                        className="primary-button"
                        onClick={
                            fetchFoods
                        }
                        style={{
                            border:
                                "none",
                            margin:
                                "20px auto 0",
                        }}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="menu-page">

            {/* HERO */}

            <section className="menu-hero">

                <span className="eyebrow">
                    ROOPA'S RESTAURANT
                </span>

                <h1>
                    Explore Our{" "}
                    <span>
                        Menu
                    </span>
                </h1>

                <p>
                    From comfort food to
                    cravings worth
                    breaking your diet for. 😋
                </p>

                <div className="menu-search">

                    <span>
                        🔍
                    </span>

                    <input
                        type="text"
                        placeholder="Search for biryani, pizza, burger..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target
                                    .value
                            )
                        }
                    />

                </div>

            </section>


            {/* MENU CONTAINER */}

            <div className="menu-container">

                {/* CATEGORY FILTERS */}

                <div className="category-filters">

                    {categories.map(
                        (item) => (
                            <button
                                key={
                                    item
                                }
                                className={`filter-button ${
                                    category ===
                                    item
                                        ? "active-filter"
                                        : ""
                                }`}
                                onClick={() =>
                                    setCategory(
                                        item
                                    )
                                }
                            >
                                {item}
                            </button>
                        )
                    )}

                </div>


                {/* TOOLBAR */}

                <div className="menu-toolbar">

                    <div className="food-type-filter">

                        <button
                            className={`type-button ${
                                foodType ===
                                "All"
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setFoodType(
                                    "All"
                                )
                            }
                        >
                            🍽️ All
                        </button>

                        <button
                            className={`type-button ${
                                foodType ===
                                "veg"
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setFoodType(
                                    "veg"
                                )
                            }
                        >
                            <span className="veg-dot"></span>
                            Veg
                        </button>

                        <button
                            className={`type-button ${
                                foodType ===
                                "non-veg"
                                    ? "selected"
                                    : ""
                            }`}
                            onClick={() =>
                                setFoodType(
                                    "non-veg"
                                )
                            }
                        >
                            <span className="nonveg-dot"></span>
                            Non-Veg
                        </button>

                    </div>

                </div>


                {/* RESULTS */}

                <div className="menu-results">

                    <h2>
                        Our Dishes
                    </h2>

                    <p>
                        {filteredFoods.length}{" "}
                        delicious item
                        {filteredFoods.length !==
                        1
                            ? "s"
                            : ""}{" "}
                        available
                    </p>

                </div>


                {/* FOOD GRID */}

                {filteredFoods.length >
                0 ? (
                    <div className="food-grid">

                        {filteredFoods.map(
                            (food) => (
                                <FoodCard
                                    key={
                                        food._id
                                    }
                                    food={
                                        food
                                    }
                                />
                            )
                        )}

                    </div>
                ) : (
                    <div className="no-results">

                        <span>
                            🍽️
                        </span>

                        <h2>
                            No dishes found
                        </h2>

                        <p>
                            Try another search
                            or category.
                        </p>

                        <button
                            onClick={() => {
                                setSearch(
                                    ""
                                );
                                setCategory(
                                    "All"
                                );
                                setFoodType(
                                    "All"
                                );
                            }}
                        >
                            Clear Filters
                        </button>

                    </div>
                )}

            </div>

        </div>
    );
}

export default Menu;