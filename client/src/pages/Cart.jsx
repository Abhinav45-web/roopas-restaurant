import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
} from "../services/cartApi";

function Cart() {
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Please login first.");
                navigate("/login");
                return;
            }

            const data = await getCart(token);

            setCart(data);
        } catch (error) {
            console.error(
                "GET CART ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                    "Unable to load cart."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleIncrease = async (foodId) => {
        try {
            const token =
                localStorage.getItem("token");

            const data =
                await increaseQuantity(
                    foodId,
                    token
                );

            setCart(data);
        } catch (error) {
            console.error(
                "INCREASE QUANTITY ERROR:",
                error
            );
        }
    };

    const handleDecrease = async (foodId) => {
        try {
            const token =
                localStorage.getItem("token");

            const data =
                await decreaseQuantity(
                    foodId,
                    token
                );

            setCart(data);
        } catch (error) {
            console.error(
                "DECREASE QUANTITY ERROR:",
                error
            );
        }
    };

    const handleRemove = async (foodId) => {
        try {
            const token =
                localStorage.getItem("token");

            const data =
                await removeFromCart(
                    foodId,
                    token
                );

            setCart(data);
        } catch (error) {
            console.error(
                "REMOVE CART ITEM ERROR:",
                error
            );
        }
    };

    const calculateTotal = () => {
        if (!cart?.items) {
            return 0;
        }

        return cart.items.reduce(
            (total, item) => {
                const price =
                    item.food?.price || 0;

                return (
                    total +
                    price * item.quantity
                );
            },
            0
        );
    };

    if (loading) {
        return (
            <div className="cart-page">
                <div className="empty-page">
                    <span>🛒</span>
                    <h2>
                        Loading your cart...
                    </h2>
                </div>
            </div>
        );
    }

    if (
        !cart ||
        !cart.items ||
        cart.items.length === 0
    ) {
        return (
            <div className="cart-page">
                <div className="empty-page">
                    <span>🛒</span>

                    <h1>
                        Your cart is empty
                    </h1>

                    <p>
                        Looks like you
                        haven't added anything
                        delicious yet.
                    </p>

                    <button
                        className="checkout-button cart-menu-button"
                        onClick={() =>
                            navigate("/menu")
                        }
                    >
                        Browse Menu →
                    </button>
                </div>
            </div>
        );
    }

    const total = calculateTotal();

    return (
        <div className="cart-page">
            <div className="cart-header">
                <span className="eyebrow">
                    YOUR ORDER
                </span>

                <h1>Your Cart 🛒</h1>

                <p>
                    Review your delicious
                    choices before checkout.
                </p>
            </div>

            <div className="cart-layout">
                {/* CART ITEMS */}

                <div className="cart-items">
                    {cart.items.map(
                        (item, index) => {
                            const food =
                                item.food;

                            return (
                                <div
                                    className="cart-item"
                                    key={
                                        food?._id ||
                                        index
                                    }
                                >
                                    {/* IMAGE */}

                                    <div className="cart-food-image">
                                        {food?.image ? (
                                            <img
                                                src={
                                                    food.image
                                                }
                                                alt={
                                                    food.name
                                                }
                                                style={{
                                                    width:
                                                        "100%",
                                                    height:
                                                        "100%",
                                                    objectFit:
                                                        "cover",
                                                    borderRadius:
                                                        "16px",
                                                }}
                                            />
                                        ) : (
                                            food?.emoji ||
                                            "🍽️"
                                        )}
                                    </div>

                                    {/* INFO */}

                                    <div className="cart-food-info">
                                        <span>
                                            {
                                                food?.category
                                            }
                                        </span>

                                        <h3>
                                            {food?.name ||
                                                "Food Item"}
                                        </h3>

                                        <p>
                                            ₹
                                            {food?.price ||
                                                0}{" "}
                                            per item
                                        </p>
                                    </div>

                                    {/* QUANTITY */}

                                    <div className="quantity-control">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleDecrease(
                                                    food?._id
                                                )
                                            }
                                        >
                                            −
                                        </button>

                                        <span>
                                            {
                                                item.quantity
                                            }
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleIncrease(
                                                    food?._id
                                                )
                                            }
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* ITEM TOTAL */}

                                    <strong className="item-total">
                                        ₹
                                        {(
                                            (food?.price ||
                                                0) *
                                            item.quantity
                                        )}
                                    </strong>

                                    {/* REMOVE */}

                                    <button
                                        type="button"
                                        className="remove-button"
                                        onClick={() =>
                                            handleRemove(
                                                food?._id
                                            )
                                        }
                                    >
                                        ✕
                                    </button>
                                </div>
                            );
                        }
                    )}
                </div>

                {/* ORDER SUMMARY */}

                <div className="order-summary">
                    <h2>
                        Order Summary
                    </h2>

                    <div className="summary-row">
                        <span>
                            Items
                        </span>

                        <span>
                            {cart.items.reduce(
                                (
                                    total,
                                    item
                                ) =>
                                    total +
                                    item.quantity,
                                0
                            )}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span>
                            Subtotal
                        </span>

                        <span>
                            ₹{total}
                        </span>
                    </div>

                    <div className="summary-row">
                        <span>
                            Delivery
                        </span>

                        <span>
                            Free
                        </span>
                    </div>

                    <div className="summary-divider"></div>

                    <div className="summary-total">
                        <span>
                            Total
                        </span>

                        <strong>
                            ₹{total}
                        </strong>
                    </div>

                    <button
                        type="button"
                        className="checkout-button"
                        onClick={() =>
                            navigate(
                                "/checkout"
                            )
                        }
                    >
                        Proceed to Checkout →
                    </button>

                    <p className="payment-message">
                        🔒 Secure payment
                        powered by Razorpay
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Cart;