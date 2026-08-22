import React, {
    useState,
} from "react";

import {
    Link,
    useNavigate,
} from "react-router-dom";

import axios from "axios";

import {
    API_URL,
} from "../services/api";

function Register() {
    const navigate =
        useNavigate();

    const [formData, setFormData] =
        useState({
            name: "",
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

        const name =
            formData.name.trim();

        const email =
            formData.email
                .trim()
                .toLowerCase();

        const password =
            formData.password;

        if (
            !name ||
            !email ||
            !password
        ) {
            alert(
                "Please fill all fields."
            );
            return;
        }

        if (password.length < 6) {
            alert(
                "Password must be at least 6 characters."
            );
            return;
        }

        try {
            setLoading(true);

            console.log(
                "REGISTER API:",
                `${API_URL}/auth/register`
            );

            const response =
                await axios.post(
                    `${API_URL}/auth/register`,
                    {
                        name,
                        email,
                        password,
                    }
                );

            const data =
                response.data;

            console.log(
                "REGISTER RESPONSE:",
                data
            );

            if (!data.success) {
                throw new Error(
                    data.message ||
                        "Registration failed."
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
                    name
            );

            localStorage.setItem(
                "userEmail",
                data.user?.email ||
                    email
            );

            localStorage.setItem(
                "userRole",
                data.user?.role ||
                    "user"
            );

            // ==========================================
            // UPDATE NAVBAR
            // ==========================================

            window.dispatchEvent(
                new Event(
                    "authChanged"
                )
            );

            alert(
                "🎉 Registration successful!"
            );

            navigate("/");
        } catch (error) {
            console.error(
                "REGISTER ERROR:",
                error
            );

            console.error(
                "REGISTER STATUS:",
                error.response
                    ?.status
            );

            console.error(
                "REGISTER DATA:",
                error.response
                    ?.data
            );

            console.error(
                "REGISTER URL:",
                `${API_URL}/auth/register`
            );

            alert(
                error.response?.data
                    ?.message ||
                    error.message ||
                    "Registration failed."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">

                <span className="eyebrow">
                    JOIN ROOPA'S RESTAURANT
                </span>

                <h1>
                    Create Account
                </h1>

                <form
                    onSubmit={
                        handleSubmit
                    }
                >

                    <label htmlFor="name">
                        Name
                    </label>

                    <input
                        id="name"
                        type="text"
                        name="name"
                        value={
                            formData.name
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Enter your name"
                        autoComplete="name"
                    />


                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
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


                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={
                            formData.password
                        }
                        onChange={
                            handleChange
                        }
                        placeholder="Create a password"
                        autoComplete="new-password"
                    />


                    <button
                        type="submit"
                        disabled={
                            loading
                        }
                    >
                        {loading
                            ? "Creating Account..."
                            : "Register"}
                    </button>

                </form>

                <p>
                    Already have an account?{" "}
                    <Link to="/login">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Register;