import React, { useState } from "react";
import "./AddFood.css";

function AddFood() {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "Biryani",
        price: "",
        rating: "4.5",
        time: "20-30 min",
        type: "veg",
        bestseller: false,
        available: true,
        emoji: "🍽️",
    });

    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const {
            name,
            value,
            type,
            checked,
        } = e.target;

        setFormData({
            ...formData,
            [name]:
                type === "checkbox"
                    ? checked
                    : value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImage(file);

        setPreview(
            URL.createObjectURL(file)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            alert("Please select a food image.");
            return;
        }

        try {
            setLoading(true);

            const data = new FormData();

            data.append(
                "name",
                formData.name
            );

            data.append(
                "description",
                formData.description
            );

            data.append(
                "category",
                formData.category
            );

            data.append(
                "price",
                formData.price
            );

            data.append(
                "rating",
                formData.rating
            );

            data.append(
                "time",
                formData.time
            );

            data.append(
                "type",
                formData.type
            );

            data.append(
                "bestseller",
                formData.bestseller
            );

            data.append(
                "available",
                formData.available
            );

            data.append(
                "emoji",
                formData.emoji
            );

            data.append(
                "image",
                image
            );

            const response = await fetch(
                "http://localhost:5000/api/foods",
                {
                    method: "POST",
                    body: data,
                }
            );

            const result =
                await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message ||
                    "Unable to add food"
                );
            }

            alert(
                "Food added successfully! 🎉"
            );

            // Reset
            setFormData({
                name: "",
                description: "",
                category: "Biryani",
                price: "",
                rating: "4.5",
                time: "20-30 min",
                type: "veg",
                bestseller: false,
                available: true,
                emoji: "🍽️",
            });

            setImage(null);
            setPreview("");

        } catch (error) {
            console.error(error);

            alert(
                error.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-food-page">

            <div className="add-food-card">

                <div className="add-food-header">
                    <span>👨‍🍳</span>

                    <div>
                        <p>Add to Menu</p>

                        <h1>
                            Create New Dish
                        </h1>
                    </div>
                </div>


                <form
                    onSubmit={handleSubmit}
                >

                    <div className="form-group">

                        <label>
                            Food Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={
                                formData.name
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Chicken Biryani"
                            required
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            placeholder="Delicious spicy chicken biryani..."
                            required
                        />

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Category
                            </label>

                            <select
                                name="category"
                                value={
                                    formData.category
                                }
                                onChange={
                                    handleChange
                                }
                            >
                                <option>
                                    Biryani
                                </option>

                                <option>
                                    Pizza
                                </option>

                                <option>
                                    Burger
                                </option>

                                <option>
                                    Dessert
                                </option>

                                <option>
                                    Veg
                                </option>

                                <option>
                                    Non-Veg
                                </option>

                                <option>
                                    Chinese
                                </option>

                                <option>
                                    South Indian
                                </option>
                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Price (₹)
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={
                                    formData.price
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="250"
                                min="1"
                                required
                            />

                        </div>

                    </div>


                    <div className="form-row">

                        <div className="form-group">

                            <label>
                                Food Type
                            </label>

                            <select
                                name="type"
                                value={
                                    formData.type
                                }
                                onChange={
                                    handleChange
                                }
                            >
                                <option value="veg">
                                    Vegetarian
                                </option>

                                <option value="non-veg">
                                    Non-Vegetarian
                                </option>
                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Preparation Time
                            </label>

                            <input
                                type="text"
                                name="time"
                                value={
                                    formData.time
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>

                    </div>


                    <div className="form-group">

                        <label>
                            Food Image
                        </label>

                        <div className="image-upload">

                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                />
                            ) : (
                                <div className="upload-placeholder">
                                    <span>
                                        📷
                                    </span>

                                    <p>
                                        Click to select
                                        food image
                                    </p>
                                </div>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleImageChange
                                }
                                required
                            />

                        </div>

                    </div>


                    <div className="checkbox-row">

                        <label>
                            <input
                                type="checkbox"
                                name="bestseller"
                                checked={
                                    formData.bestseller
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            Bestseller
                        </label>


                        <label>
                            <input
                                type="checkbox"
                                name="available"
                                checked={
                                    formData.available
                                }
                                onChange={
                                    handleChange
                                }
                            />

                            Available
                        </label>

                    </div>


                    <button
                        type="submit"
                        className="add-food-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Uploading..."
                            : "Add Food to Menu 🍽️"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default AddFood;