import React, { useState } from "react";
import { toast } from "react-toastify";

import {
    getRecommendations,
} from "../services/aiApi";

import { addToCart } from "../services/cartApi";

function AIAssistant() {
    const [message, setMessage] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [addingId, setAddingId] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!message.trim()) {
            toast.error(
                "Tell Roopa AI what you're craving!"
            );
            return;
        }

        try {
            setLoading(true);
            setResult(null);

            const data = await getRecommendations(
                message.trim()
            );

            setResult(data);
        } catch (error) {
            console.error(
                "ROOPA AI ERROR:",
                error
            );

            setResult({
                success: false,
                message:
                    error.response?.data
                        ?.message ||
                    "Roopa AI is unavailable right now.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = async (item) => {
        try {
            const token =
                localStorage.getItem("token");

            if (!token) {
                toast.error(
                    "Please login to add items to your cart."
                );
                return;
            }

            if (!item?.id) {
                toast.error(
                    "This food item is unavailable."
                );
                return;
            }

            setAddingId(item.id);

            await addToCart(
                item.id,
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
                            {item.name}
                        </span>

                        <small>
                            ₹{item.price}
                        </small>
                    </div>
                </div>,
                {
                    position: "bottom-right",
                    autoClose: 2500,
                    closeOnClick: true,
                    pauseOnHover: true,
                }
            );
        } catch (error) {
            console.error(
                "AI ADD TO CART ERROR:",
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
                error.response?.data?.message ||
                "Unable to add item to cart."
            );
        } finally {
            setAddingId(null);
        }
    };

    return (
        <section className="ai-section">
            <div className="ai-icon">
                🤖
            </div>

            <div className="ai-content">
                <span>
                    ROOPA AI
                </span>

                <h2>
                    Meet Roopa AI
                </h2>

                <p>
                    Your personal food
                    assistant. Tell Roopa AI
                    your budget, cravings,
                    spice level, or
                    preferences.
                </p>

                <form
                    className="ai-input"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        value={message}
                        onChange={(e) =>
                            setMessage(
                                e.target.value
                            )
                        }
                        placeholder="Ask Roopa AI: I have ₹150 and want spicy veg food..."
                    />

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Roopa AI is thinking..."
                            : "Ask Roopa AI 🤖"}
                    </button>
                </form>

                {result && (
                    <div
                        className="ai-results"
                        style={{
                            marginTop:
                                "25px",
                        }}
                    >
                        {!result.success ? (
                            <p
                                style={{
                                    color:
                                        "#ffb9a0",
                                }}
                            >
                                {result.message}
                            </p>
                        ) : (
                            <>
                                <p
                                    style={{
                                        color:
                                            "white",
                                        lineHeight:
                                            "1.6",
                                    }}
                                >
                                    {result.reply}
                                </p>

                                <div
                                    className="ai-recommendations"
                                    style={{
                                        display:
                                            "grid",
                                        gap:
                                            "12px",
                                        marginTop:
                                            "16px",
                                    }}
                                >
                                    {(
                                        result.recommendations ||
                                        []
                                    ).map(
                                        (item) => (
                                            <div
                                                key={
                                                    item.id
                                                }
                                                className="ai-recommendation-card"
                                                style={{
                                                    background:
                                                        "white",
                                                    color:
                                                        "#24211f",
                                                    padding:
                                                        "16px",
                                                    borderRadius:
                                                        "16px",
                                                }}
                                            >
                                                <div
                                                    style={{
                                                        display:
                                                            "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems:
                                                            "flex-start",
                                                        gap:
                                                            "15px",
                                                    }}
                                                >
                                                    <div>
                                                        <strong
                                                            style={{
                                                                fontSize:
                                                                    "16px",
                                                            }}
                                                        >
                                                            {
                                                                item.name
                                                            }
                                                        </strong>

                                                        <div
                                                            style={{
                                                                fontSize:
                                                                    "12px",
                                                                color:
                                                                    "#81756d",
                                                                marginTop:
                                                                    "5px",
                                                                lineHeight:
                                                                    "1.5",
                                                            }}
                                                        >
                                                            {
                                                                item.reason
                                                            }
                                                        </div>
                                                    </div>

                                                    <strong
                                                        style={{
                                                            color:
                                                                "#e85d2a",
                                                            whiteSpace:
                                                                "nowrap",
                                                        }}
                                                    >
                                                        ₹
                                                        {
                                                            item.price
                                                        }
                                                    </strong>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            item
                                                        )
                                                    }
                                                    disabled={
                                                        addingId ===
                                                        item.id
                                                    }
                                                    style={{
                                                        width:
                                                            "100%",
                                                        marginTop:
                                                            "12px",
                                                        border:
                                                            "none",
                                                        background:
                                                            "#e85d2a",
                                                        color:
                                                            "white",
                                                        padding:
                                                            "11px 14px",
                                                        borderRadius:
                                                            "999px",
                                                        fontWeight:
                                                            "800",
                                                        cursor:
                                                            "pointer",
                                                        opacity:
                                                            addingId ===
                                                            item.id
                                                                ? 0.6
                                                                : 1,
                                                    }}
                                                >
                                                    {addingId ===
                                                    item.id
                                                        ? "Adding..."
                                                        : "🛒 Add to Cart"}
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}

export default AIAssistant;