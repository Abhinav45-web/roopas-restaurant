import React, {
    useEffect,
    useState,
} from "react";

import axios from "axios";

function AdminOrders() {
    const [orders, setOrders] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const statuses = [
        "Pending",
        "Preparing",
        "Cooking",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
    ];

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

            const response =
                await axios.get(
                    "http://localhost:5000/api/orders/admin/all",
                    {
                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },
                    }
                );

            setOrders(
                response.data.orders ||
                    []
            );
        } catch (error) {
            console.error(
                "ADMIN ORDERS ERROR:",
                error.response
                    ?.data ||
                    error.message
            );
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (
        orderId,
        status
    ) => {
        try {
            const token =
                localStorage.getItem(
                    "token"
                );

            await axios.put(
                `http://localhost:5000/api/orders/admin/${orderId}/status`,
                {
                    status,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            await fetchOrders();

            alert(
                `Order updated to ${status}`
            );
        } catch (error) {
            console.error(
                "STATUS UPDATE ERROR:",
                error.response
                    ?.data ||
                    error.message
            );

            alert(
                error.response
                    ?.data
                    ?.message ||
                    "Unable to update order."
            );
        }
    };

    if (loading) {
        return (
            <div
                style={{
                    padding: "40px",
                    textAlign:
                        "center",
                }}
            >
                <h2>
                    Loading orders...
                </h2>
            </div>
        );
    }

    return (
        <div
            style={{
                padding:
                    "40px 8%",
                background:
                    "#fffaf5",
                minHeight:
                    "80vh",
            }}
        >
            <h1
                style={{
                    fontFamily:
                        "Playfair Display, serif",
                    marginBottom:
                        "30px",
                }}
            >
                Admin Orders
            </h1>

            {orders.length ===
            0 ? (
                <div>
                    <h2>
                        No orders found.
                    </h2>

                    <p>
                        Place an order
                        from the customer
                        side first.
                    </p>
                </div>
            ) : (
                <div
                    style={{
                        display:
                            "flex",
                        flexDirection:
                            "column",
                        gap: "20px",
                    }}
                >
                    {orders.map(
                        (order) => (
                            <div
                                key={
                                    order._id
                                }
                                style={{
                                    background:
                                        "white",
                                    padding:
                                        "25px",
                                    borderRadius:
                                        "18px",
                                    border:
                                        "1px solid #eee2d9",
                                    boxShadow:
                                        "0 10px 30px rgba(0,0,0,0.05)",
                                }}
                            >
                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        gap:
                                            "20px",
                                        flexWrap:
                                            "wrap",
                                    }}
                                >
                                    <div>
                                        <h2>
                                            Order #
                                            {order._id
                                                .slice(
                                                    -6
                                                )
                                                .toUpperCase()}
                                        </h2>

                                        <p>
                                            Customer:{" "}
                                            {order
                                                .user
                                                ?.name ||
                                                "Unknown"}
                                        </p>

                                        <p>
                                            Email:{" "}
                                            {order
                                                .user
                                                ?.email ||
                                                "Unknown"}
                                        </p>
                                    </div>

                                    <div>
                                        <h2
                                            style={{
                                                color:
                                                    "#e85d2a",
                                            }}
                                        >
                                            ₹
                                            {
                                                order.totalAmount
                                            }
                                        </h2>
                                    </div>
                                </div>

                                <hr />

                                <h3>
                                    Items
                                </h3>

                                {order.items.map(
                                    (
                                        item,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                item
                                                    .food
                                                    ?._id ||
                                                index
                                            }
                                            style={{
                                                display:
                                                    "flex",
                                                justifyContent:
                                                    "space-between",
                                                padding:
                                                    "10px 0",
                                                borderBottom:
                                                    "1px solid #eee",
                                            }}
                                        >
                                            <span>
                                                {
                                                    item
                                                        .food
                                                        ?.name
                                                }{" "}
                                                ×{" "}
                                                {
                                                    item.quantity
                                                }
                                            </span>

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

                                <div
                                    style={{
                                        marginTop:
                                            "20px",
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap:
                                            "15px",
                                        flexWrap:
                                            "wrap",
                                    }}
                                >
                                    <strong>
                                        Current
                                        Status:
                                    </strong>

                                    <select
                                        value={
                                            order.status
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            updateStatus(
                                                order._id,
                                                e
                                                    .target
                                                    .value
                                            )
                                        }
                                        style={{
                                            padding:
                                                "10px 14px",
                                            border:
                                                "1px solid #ddd",
                                            borderRadius:
                                                "10px",
                                            background:
                                                "white",
                                        }}
                                    >
                                        {statuses.map(
                                            (
                                                status
                                            ) => (
                                                <option
                                                    key={
                                                        status
                                                    }
                                                    value={
                                                        status
                                                    }
                                                >
                                                    {
                                                        status
                                                    }
                                                </option>
                                            )
                                        )}
                                    </select>
                                </div>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default AdminOrders;