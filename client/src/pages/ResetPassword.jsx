import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ResetPassword() {
    const { token } = useParams();

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(
                `http://localhost:5000/api/password/reset-password/${token}`,
                {
                    password,
                }
            );

            alert(
                "Password updated successfully."
            );
        } catch (error) {
            console.log(error);

            alert("Unable to update password.");
        }
    };

    return (
        <div className="auth-page">
            <form
                className="auth-card"
                onSubmit={handleSubmit}
            >
                <h1>Reset Password</h1>

                <input
                    type="password"
                    placeholder="Enter a new password"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                />

                <button type="submit">
                    Reset Password
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;