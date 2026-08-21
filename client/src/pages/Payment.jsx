import React, { useState } from "react";
import "./Payment.css";

function Payment() {
    const [paymentMethod, setPaymentMethod] =
        useState("");

    const handlePayment = () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        alert(
            `Payment successful using ${paymentMethod}`
        );
    };

    return (
        <div className="payment-container">
            <div className="payment-card">
                <h1>💳 Payment</h1>

                <p>Select a payment method.</p>

                <label>
                    <input
                        type="radio"
                        value="UPI"
                        name="payment"
                        onChange={(e) =>
                            setPaymentMethod(
                                e.target.value
                            )
                        }
                    />

                    UPI
                </label>

                <label>
                    <input
                        type="radio"
                        value="Credit Card"
                        name="payment"
                        onChange={(e) =>
                            setPaymentMethod(
                                e.target.value
                            )
                        }
                    />

                    Credit Card
                </label>

                <label>
                    <input
                        type="radio"
                        value="Debit Card"
                        name="payment"
                        onChange={(e) =>
                            setPaymentMethod(
                                e.target.value
                            )
                        }
                    />

                    Debit Card
                </label>

                <label>
                    <input
                        type="radio"
                        value="Cash on Delivery"
                        name="payment"
                        onChange={(e) =>
                            setPaymentMethod(
                                e.target.value
                            )
                        }
                    />

                    Cash on Delivery
                </label>

                <button
                    className="payment-btn"
                    onClick={handlePayment}
                >
                    Proceed to Pay
                </button>
            </div>
        </div>
    );
}

export default Payment;