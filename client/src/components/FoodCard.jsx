import React from "react";
import { toast } from "react-toastify";

import { addToCart } from "../services/cartApi";

function FoodCard({ food }) {
    const handleAddToCart = async () => {
        try {
            const token =
                localStorage.getItem("token");

            if (!token) {
                toast.error(
                    "Please login to add items to cart."
                );
                return;
            }

            if (!food?._id) {
                toast.error(
                    "Food item is unavailable."
                );
                return;
            }

            await addToCart(
                food._id,
                1,
                token
            );

            toast(
                <div className="cart-toast">
                    <div className="cart-toast-icon">
                        🛒
                    </div>

                    <div className="cart-toast-content">
                        <strong>
                            Added to Cart!
                        </strong>

                        <span>
                            {food.name}
                        </span>

                        <small>
                            ₹{food.price}
                        </small>
                    </div>
                </div>,
                {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    pauseOnHover: true,
                    hideProgressBar: false,
                }
            );
        } catch (error) {
            console.error(
                "ADD TO CART ERROR:",
                error
            );

            if (
                error.response?.status === 401
            ) {
                localStorage.removeItem(
                    "token"
                );

                toast.error(
                    "Session expired. Please login again."
                );

                return;
            }

            toast.error(
                error.response?.data
                    ?.message ||
                    "Unable to add item to cart."
            );
        }
    };

    return (
        <div className="food-card-wrapper">
            <div className="food-card">

                <div className="food-image">

                    {food.image ? (
                        <img
                            src={food.image}
                            alt={food.name}
                        />
                    ) : (
                        <span className="food-emoji">
                            {food.emoji ||
                                "🍽️"}
                        </span>
                    )}

                    {food.bestseller && (
                        <span className="bestseller-badge">
                            <span className="badge-fire">
                                🔥
                            </span>
                            Bestseller
                        </span>
                    )}

                    <div className="rating">
                        ⭐{" "}
                        {Number(
                            food.rating || 0
                        ).toFixed(1)}
                    </div>
                </div>

                <div className="food-info">

                    <span className="food-category">
                        {food.category}
                    </span>

                    <h3>
                        {food.name}
                    </h3>

                    <p>
                        {food.description}
                    </p>

                    <div className="food-meta">

                        <span
                            className={`food-type ${
                                food.type ===
                                "veg"
                                    ? "veg"
                                    : "nonveg"
                            }`}
                        >
                            <i></i>

                            {food.type ===
                            "veg"
                                ? "VEG"
                                : "NON-VEG"}
                        </span>

                        {food.time && (
                            <span className="food-time">
                                ⏱️{" "}
                                {food.time}
                            </span>
                        )}
                    </div>

                    <div className="food-bottom">

                        <strong>
                            ₹{food.price}
                        </strong>

                        <button
                            type="button"
                            onClick={
                                handleAddToCart
                            }
                        >
                            + Add
                        </button>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default FoodCard;