import React, {
    useEffect,
    useState,
} from "react";

import {
    getMyOrders,
} from "../services/orderApi";

import "./Orders.css";

const statuses = [
    "Pending",
    "Preparing",
    "Cooking",
    "Out for Delivery",
    "Delivered",
];

function Orders() {
    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {
                setLoading(false);
                return;
            }

            const data =
                await getMyOrders(token);

            setOrders(
                data.orders || []
            );
        } catch (error) {
            console.error(
                "GET ORDERS ERROR:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    const getStatusIndex = (
        status
    ) => {
        return statuses.indexOf(status);
    };

    if (loading) {
        return (
            <div className="orders-page">
                <div className="orders-empty">
                    <span>🍽️</span>
                    <h2>
                        Loading your orders...
                    </h2>
                </div>
            </div>
        );
    }

    if (orders.length === 0) {
        return (
            <div className="orders-page">
                <div className="orders-empty">
                    <span>📦</span>

                    <h1>
                        No Orders Yet
                    </h1>

                    <p>
                        Your delicious journey
                        hasn't started yet.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="orders-page">
            <div className="orders-header">
                <span className="orders-eyebrow">
                    ROOPA'S RESTAURANT
                </span>

                <h1>My Orders</h1>

                <p>
                    Track your delicious
                    orders from kitchen
                    to doorstep.
                </p>
            </div>

            <div className="orders-list">
                {orders.map(
                    (order) => {
                        const currentIndex =
                            getStatusIndex(
                                order.status
                            );

                        return (
                            <div
                                className="order-card"
                                key={
                                    order._id
                                }
                            >
                                <div className="order-card-header">
                                    <div>
                                        <span className="order-label">
                                            ORDER
                                        </span>

                                        <h2>
                                            #
                                            {order._id
                                                .slice(
                                                    -6
                                                )
                                                .toUpperCase()}
                                        </h2>
                                    </div>

                                    <div className="order-date">
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleDateString()}
                                    </div>
                                </div>

                                <div className="order-items">
                                    {order.items.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <div
                                                className="order-item"
                                                key={
                                                    item
                                                        .food
                                                        ?._id ||
                                                    index
                                                }
                                            >
                                                <div className="order-food-icon">
                                                    {
                                                        item
                                                            .food
                                                            ?.emoji
                                                    }
                                                </div>

                                                <div className="order-food-info">
                                                    <h3>
                                                        {item
                                                            .food
                                                            ?.name ||
                                                            "Food Item"}
                                                    </h3>

                                                    <p>
                                                        Qty:{" "}
                                                        {
                                                            item.quantity
                                                        }
                                                    </p>
                                                </div>

                                                <strong>
                                                    ₹
                                                    {(
                                                        item
                                                            .food
                                                            ?.price ||
                                                        0
                                                    ) *
                                                        item.quantity}
                                                </strong>
                                            </div>
                                        )
                                    )}
                                </div>

                                <div className="order-total">
                                    <span>
                                        Total
                                    </span>

                                    <strong>
                                        ₹
                                        {
                                            order.totalAmount
                                        }
                                    </strong>
                                </div>

                                <div className="tracking-section">
                                    <div className="tracking-title">
                                        <h3>
                                            Order Tracking
                                        </h3>

                                        <span>
                                            {
                                                order.status
                                            }
                                        </span>
                                    </div>

                                    <div className="tracking-timeline">
                                        {statuses.map(
                                            (
                                                status,
                                                index
                                            ) => {
                                                const completed =
                                                    index <=
                                                    currentIndex;

                                                return (
                                                    <div
                                                        className={`tracking-step ${
                                                            completed
                                                                ? "completed"
                                                                : ""
                                                        }`}
                                                        key={
                                                            status
                                                        }
                                                    >
                                                        <div className="tracking-icon">
                                                            {completed
                                                                ? "✓"
                                                                : "○"}
                                                        </div>

                                                        <div className="tracking-label">
                                                            {
                                                                status
                                                            }
                                                        </div>

                                                        {index <
                                                            statuses.length -
                                                                1 && (
                                                            <div
                                                                className={`tracking-line ${
                                                                    index <
                                                                    currentIndex
                                                                        ? "completed"
                                                                        : ""
                                                                }`}
                                                            />
                                                        )}
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
}

export default Orders;