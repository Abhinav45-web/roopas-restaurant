import React, {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import axios from "axios";

function Login() {
    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({
            email: "",
            password: "",
        });

    const [loading, setLoading] =
        useState(false);

    const handleChange = (e) => {
        const {
            name,
            value,
        } = e.target;

        setFormData(
            (previous) => ({
                ...previous,
                [name]: value,
            })
        );
    };

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        if (
            !formData.email ||
            !formData.password
        ) {
            alert(
                "Please enter email and password."
            );

            return;
        }

        try {
            setLoading(true);

            const response =
                await axios.post(
                    "http://localhost:5000/api/auth/login",
                    {
                        email:
                            formData.email.trim(),

                        password:
                            formData.password,
                    }
                );

            const data =
                response.data;

            console.log(
                "LOGIN RESPONSE:",
                data
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                        "Login failed."
                );
            }

            // ==========================================
            // SAVE AUTH DATA
            // ==========================================

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "userName",
                data.user?.name ||
                    ""
            );

            localStorage.setItem(
                "userEmail",
                data.user?.email ||
                    formData.email
            );

            localStorage.setItem(
                "userRole",
                data.user?.role ||
                    "user"
            );

            // ==========================================
            // UPDATE NAVBAR IMMEDIATELY
            // ==========================================

            window.dispatchEvent(
                new Event(
                    "authChanged"
                )
            );

            alert(
                "✅ Login successful!"
            );

            // ==========================================
            // REDIRECT
            // ==========================================

            if (
                data.user?.role ===
                "admin"
            ) {
                navigate(
                    "/admin"
                );
            } else {
                navigate("/");
            }
        } catch (error) {
            console.error(
                "LOGIN ERROR:",
                error
            );

            alert(
                error.response?.data
                    ?.message ||
                    error.message ||
                    "Unable to login."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <span className="eyebrow">
                    WELCOME BACK
                </span>

                <h1>
                    Login
                </h1>

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={
                            formData.email
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Enter your email"
                        autoComplete="email"
                    />


                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        value={
                            formData.password
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Enter your password"
                        autoComplete="current-password"
                    />


                    <button
                        type="submit"
                        disabled={
                            loading
                        }
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"}
                    </button>

                </form>


                <p>
                    Don't have an account?{" "}
                    <Link to="/register">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Login;