import React, { useEffect, useState } from "react";
import {
    Link,
    NavLink,
    useNavigate,
} from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const [darkMode, setDarkMode] =
        useState(
            localStorage.getItem("theme") ===
                "dark"
        );

    const [loggedIn, setLoggedIn] =
        useState(
            Boolean(
                localStorage.getItem(
                    "token"
                )
            )
        );

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add(
                "dark-mode"
            );

            localStorage.setItem(
                "theme",
                "dark"
            );
        } else {
            document.body.classList.remove(
                "dark-mode"
            );

            localStorage.setItem(
                "theme",
                "light"
            );
        }
    }, [darkMode]);

    useEffect(() => {
        const updateAuthState = () => {
            setLoggedIn(
                Boolean(
                    localStorage.getItem(
                        "token"
                    )
                )
            );
        };

        window.addEventListener(
            "authChanged",
            updateAuthState
        );

        window.addEventListener(
            "storage",
            updateAuthState
        );

        updateAuthState();

        return () => {
            window.removeEventListener(
                "authChanged",
                updateAuthState
            );

            window.removeEventListener(
                "storage",
                updateAuthState
            );
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem(
            "userName"
        );
        localStorage.removeItem(
            "userEmail"
        );

        window.dispatchEvent(
            new Event("authChanged")
        );

        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link
                to="/"
                className="brand"
            >
                <div className="brand-icon">
                    🍽️
                </div>

                <div>
                    <h2>
                        Roopa's Restaurant
                    </h2>

                    <span>
                        FRESH • DELICIOUS
                    </span>
                </div>
            </Link>

            <div className="nav-links">
                <NavLink to="/">
                    Home
                </NavLink>

                <NavLink to="/menu">
                    Menu
                </NavLink>

                {loggedIn && (
                    <NavLink to="/orders">
                        Orders
                    </NavLink>
                )}

                {loggedIn && (
                    <NavLink to="/profile">
                        Profile
                    </NavLink>
                )}

                {loggedIn &&
                    localStorage.getItem(
                        "userRole"
                    ) === "admin" && (
                        <NavLink to="/admin">
                            Admin
                        </NavLink>
                    )}
            </div>

            <div className="nav-actions">
                <button
                    type="button"
                    className="theme-toggle"
                    onClick={() =>
                        setDarkMode(
                            (previous) =>
                                !previous
                        )
                    }
                >
                    {darkMode
                        ? "☀️"
                        : "🌙"}
                </button>

                <button
                    type="button"
                    className="icon-button"
                    onClick={() =>
                        navigate("/cart")
                    }
                >
                    🛒
                </button>

                {loggedIn ? (
                    <button
                        type="button"
                        className="login-button"
                        onClick={
                            handleLogout
                        }
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="login-button"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}

export default Navbar;