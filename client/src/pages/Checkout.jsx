import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCart } from "../services/cartApi";
import {
    createPaymentOrder,
    verifyPayment,
    createDemoOrder,
} from "../services/paymentApi";

import "./Checkout.css";

function Checkout() {
    const navigate = useNavigate();

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        try {
            setLoading(true);
            setError("");

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const data = await getCart(token);

            console.log("CHECKOUT CART:", data);

            setCart(data);
        } catch (err) {
            console.error("CHECKOUT ERROR:", err);

            const status = err.response?.status;
            const message =
                err.response?.data?.message ||
                err.message ||
                "Unable to load cart.";

            console.log("STATUS:", status);
            console.log("MESSAGE:", message);

            if (status === 401) {
                localStorage.removeItem("token");
                alert("Session expired. Please login again.");
                navigate("/login");
                return;
            }

            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const total =
        cart?.items?.reduce((sum, item) => {
            const price = Number(item.food?.price || 0);
            const quantity = Number(item.quantity || 0);

            return sum + price * quantity;
        }, 0) || 0;

    const handleDemoOrder = async () => {
        try {
            setProcessing(true);

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const result = await createDemoOrder(token);

            if (result.success) {
                alert("🎉 Free demo order placed!");
                navigate("/orders");
            }
        } catch (err) {
            console.error("DEMO ORDER ERROR:", err);

            alert(
                err.response?.data?.message ||
                "Unable to place demo order."
            );
        } finally {
            setProcessing(false);
        }
    };

    const handleRazorpay = async () => {
        try {
            setProcessing(true);

            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }

            const paymentData = await createPaymentOrder(token);

            if (!window.Razorpay) {
                throw new Error(
                    "Razorpay checkout script is not loaded."
                );
            }

            const razorpay = new window.Razorpay({
                key: paymentData.key,
                amount: paymentData.razorpayOrder.amount,
                currency: paymentData.razorpayOrder.currency,
                name: "Roopa's Restaurant",
                description: "Roopa's Restaurant Test Payment",
                order_id: paymentData.razorpayOrder.id,

                handler: async (response) => {
                    try {
                        const result = await verifyPayment(
                            {
                                razorpay_order_id:
                                    response.razorpay_order_id,

                                razorpay_payment_id:
                                    response.razorpay_payment_id,

                                razorpay_signature:
                                    response.razorpay_signature,
                            },
                            token
                        );

                        if (result.success) {
                            alert(
                                "✅ Payment successful! Order placed."
                            );

                            navigate("/orders");
                        }
                    } catch (err) {
                        console.error(
                            "VERIFY ERROR:",
                            err
                        );

                        alert(
                            err.response?.data?.message ||
                            "Payment verification failed."
                        );
                    } finally {
                        setProcessing(false);
                    }
                },

                modal: {
                    ondismiss: () => {
                        setProcessing(false);
                    },
                },

                theme: {
                    color: "#e85d2a",
                },
            });

            razorpay.on("payment.failed", (response) => {
                console.error(
                    "RAZORPAY FAILED:",
                    response
                );

                alert(
                    response.error?.description ||
                    "Payment failed."
                );

                setProcessing(false);
            });

            razorpay.open();
        } catch (err) {
            console.error(
                "RAZORPAY ERROR:",
                err
            );

            alert(
                err.response?.data?.message ||
                err.message ||
                "Unable to start payment."
            );

            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="checkout-page">
                <div className="checkout-card">
                    <h2>Loading checkout...</h2>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="checkout-page">
                <div className="checkout-card">
                    <h1>Unable to load cart</h1>

                    <p style={{ marginTop: "15px" }}>
                        {error}
                    </p>

                    <button
                        className="pay-button"
                        onClick={loadCart}
                        style={{ marginTop: "20px" }}
                    >
                        Retry
                    </button>

                    <button
                        className="pay-button"
                        onClick={() => navigate("/cart")}
                        style={{
                            marginTop: "10px",
                            background: "#28221f",
                        }}
                    >
                        Back to Cart
                    </button>
                </div>
            </div>
        );
    }

    if (
        !cart ||
        !Array.isArray(cart.items) ||
        cart.items.length === 0
    ) {
        return (
            <div className="checkout-page">
                <div className="checkout-card">
                    <h1>🛒 Cart is empty</h1>

                    <button
                        className="pay-button"
                        onClick={() => navigate("/menu")}
                        style={{ marginTop: "20px" }}
                    >
                        Browse Menu
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-page">
            <div className="checkout-card">

                <div className="checkout-header">
                    <span>ROOPA'S RESTAURANT</span>

                    <h1>Checkout</h1>

                    <p>Almost there! 🍽️</p>
                </div>

                <div className="checkout-items">
                    {cart.items.map((item, index) => (
                        <div
                            className="checkout-item"
                            key={item.food?._id || index}
                        >
                            <div>
                                <h3>
                                    {item.food?.name ||
                                        "Food Item"}
                                </h3>

                                <p>
                                    Qty: {item.quantity}
                                </p>
                            </div>

                            <strong>
                                ₹
                                {(item.food?.price || 0) *
                                    item.quantity}
                            </strong>
                        </div>
                    ))}
                </div>

                <div className="checkout-total">
                    <span>Total</span>

                    <strong>₹{total}</strong>
                </div>

                <button
                    className="pay-button"
                    onClick={handleDemoOrder}
                    disabled={processing}
                >
                    🧪 Free Demo Order — ₹0
                </button>

                <button
                    className="pay-button"
                    onClick={handleRazorpay}
                    disabled={processing}
                    style={{ marginTop: "12px" }}
                >
                    💳 Razorpay Test — ₹1
                </button>

                <p className="checkout-note">
                    Demo mode = ₹0
                </p>

                <p className="checkout-note">
                    Razorpay = Test Mode
                </p>
            </div>
        </div>
    );
}

export default Checkout;