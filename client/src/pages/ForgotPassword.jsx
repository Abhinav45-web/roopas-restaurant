import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                "http://localhost:5000/api/password/forgot-password",
                {
                    email,
                }
            );

            alert(
                "Password reset link sent successfully."
            );
        } catch (error) {
            console.log(error);

            alert(
                "Unable to send password reset link."
            );
        }
    };

    return (
        <div className="auth-page">
            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >
                <h1>Forgot Password</h1>

                <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) =>
                        setEmail(e.target.value)
                    }
                />

                <button type="submit">
                    Send Link
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;