import React, { useState } from "react";
import "./Profile.css";

function Profile() {
    const [user, setUser] = useState({
        name: "Abhinav Teja",
        email: "abhinav@gmail.com",
        phone: "+91 9876543210",
        address: "Warangal",
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h1>👨‍🍳 My Profile</h1>

                <div className="profile-image">
                    👤
                </div>

                <input
                    type="text"
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                />

                <input
                    type="email"
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                />

                <input
                    type="text"
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                />

                <textarea
                    name="address"
                    value={user.address}
                    onChange={handleChange}
                    placeholder="Enter your address"
                />

                <button className="save-btn">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default Profile;