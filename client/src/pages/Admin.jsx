


import React from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

function Admin() {
    return (
        <div className="admin-container">

            {/* HEADER */}
            <div className="admin-header">

                <div>
                    <p className="admin-eyebrow">
                        ROOPA'S RESTAURANT
                    </p>

                    <h1>
                        👨‍💼 Admin Dashboard
                    </h1>

                    <p>
                        Manage your restaurant
                        from one place.
                    </p>
                </div>

                <Link
                    to="/admin/add-food"
                    className="admin-add-food-button"
                >
                    + Add New Food
                </Link>

            </div>


            {/* ADMIN CARDS */}
            <div className="admin-grid">

                {/* FOOD MANAGEMENT */}
                <div className="admin-card">

                    <div className="admin-card-icon">
                        🍔
                    </div>

                    <h2>
                        Food Items
                    </h2>

                    <p>
                        Add dishes, upload
                        images, and manage
                        your restaurant menu.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection:
                                "column",
                            gap: "8px",
                        }}
                    >
                        <Link to="/admin/foods">
                            Manage Foods →
                        </Link>

                        <Link to="/admin/add-food">
                            + Add New Food
                        </Link>
                    </div>

                </div>


                {/* ORDER MANAGEMENT */}
                <div className="admin-card">

                    <div className="admin-card-icon">
                        📦
                    </div>

                    <h2>
                        Orders
                    </h2>

                    <p>
                        View customer orders
                        and update their
                        delivery status.
                    </p>

                    <Link to="/admin/orders">
                        Manage Orders →
                    </Link>

                </div>


                {/* USERS */}
                <div className="admin-card">

                    <div className="admin-card-icon">
                        👤
                    </div>

                    <h2>
                        Users
                    </h2>

                    <p>
                        View and manage
                        registered customers.
                    </p>

                </div>


                {/* REVENUE */}
                <div className="admin-card">

                    <div className="admin-card-icon">
                        💰
                    </div>

                    <h2>
                        Revenue
                    </h2>

                    <p>
                        Monitor restaurant
                        sales and order
                        performance.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Admin;