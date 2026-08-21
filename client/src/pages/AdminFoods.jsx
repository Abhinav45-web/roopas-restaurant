import React, {
    useEffect,
    useState,
} from "react";

import {
    getFoods,
    updateFood,
    deleteFood,
} from "../services/foodApi";

function AdminFoods() {
    const [foods, setFoods] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [uploadingId, setUploadingId] =
        useState(null);

    const fetchFoods = async () => {
        try {
            const data =
                await getFoods();

            setFoods(
                data.foods || []
            );
        } catch (error) {
            console.error(
                "ADMIN FOODS ERROR:",
                error
            );

            alert(
                "Unable to load foods."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFoods();
    }, []);

    const handleImageUpload = async (
        foodId,
        event
    ) => {
        const file =
            event.target.files?.[0];

        if (!file) {
            return;
        }

        if (
            !file.type.startsWith(
                "image/"
            )
        ) {
            alert(
                "Please choose an image."
            );
            return;
        }

        if (
            file.size >
            5 * 1024 * 1024
        ) {
            alert(
                "Image must be below 5MB."
            );
            return;
        }

        try {
            setUploadingId(foodId);

            const formData =
                new FormData();

            formData.append(
                "image",
                file
            );

            const result =
                await updateFood(
                    foodId,
                    formData
                );

            alert(
                "✅ Image uploaded successfully!"
            );

            setFoods(
                (previous) =>
                    previous.map(
                        (food) =>
                            food._id ===
                            foodId
                                ? result.food
                                : food
                    )
            );
        } catch (error) {
            console.error(
                "IMAGE UPLOAD ERROR:",
                error
            );

            alert(
                error.response?.data
                    ?.message ||
                    "Unable to upload image."
            );
        } finally {
            setUploadingId(null);

            event.target.value = "";
        }
    };

    const handleDelete = async (
        foodId,
        foodName
    ) => {
        const confirmed =
            window.confirm(
                `Delete ${foodName}?`
            );

        if (!confirmed) {
            return;
        }

        try {
            await deleteFood(
                foodId
            );

            setFoods(
                (previous) =>
                    previous.filter(
                        (food) =>
                            food._id !==
                            foodId
                    )
            );

            alert(
                "Food deleted successfully."
            );
        } catch (error) {
            console.error(
                "DELETE FOOD ERROR:",
                error
            );

            alert(
                error.response?.data
                    ?.message ||
                    "Unable to delete food."
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
                    Loading foods...
                </h2>
            </div>
        );
    }

    return (
        <div
            style={{
                minHeight:
                    "80vh",
                padding:
                    "50px 8%",
                background:
                    "#fffaf5",
            }}
        >
            <div
                style={{
                    marginBottom:
                        "30px",
                }}
            >
                <span
                    style={{
                        color:
                            "#e85d2a",
                        fontSize:
                            "11px",
                        fontWeight:
                            "800",
                        letterSpacing:
                            "2px",
                    }}
                >
                    ROOPA'S RESTAURANT
                </span>

                <h1
                    style={{
                        fontFamily:
                            "Playfair Display, serif",
                        fontSize:
                            "44px",
                        margin:
                            "8px 0",
                    }}
                >
                    Manage Foods
                </h1>

                <p
                    style={{
                        color:
                            "#81756d",
                    }}
                >
                    Upload images,
                    manage dishes,
                    and keep your
                    menu fresh.
                </p>
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: "22px",
                }}
            >
                {foods.map(
                    (food) => (
                        <div
                            key={
                                food._id
                            }
                            style={{
                                background:
                                    "white",
                                border:
                                    "1px solid #eee2d9",
                                borderRadius:
                                    "20px",
                                overflow:
                                    "hidden",
                                boxShadow:
                                    "0 10px 30px rgba(74,46,27,0.06)",
                            }}
                        >
                            <div
                                style={{
                                    height:
                                        "190px",
                                    background:
                                        "#f7e7db",
                                    display:
                                        "grid",
                                    placeItems:
                                        "center",
                                    overflow:
                                        "hidden",
                                }}
                            >
                                {food.image ? (
                                    <img
                                        src={
                                            food.image
                                        }
                                        alt={
                                            food.name
                                        }
                                        style={{
                                            width:
                                                "100%",
                                            height:
                                                "100%",
                                            objectFit:
                                                "cover",
                                        }}
                                    />
                                ) : (
                                    <span
                                        style={{
                                            fontSize:
                                                "80px",
                                        }}
                                    >
                                        {food.emoji ||
                                            "🍽️"}
                                    </span>
                                )}
                            </div>

                            <div
                                style={{
                                    padding:
                                        "20px",
                                }}
                            >
                                <h2
                                    style={{
                                        fontFamily:
                                            "Playfair Display, serif",
                                        fontSize:
                                            "22px",
                                        marginBottom:
                                            "8px",
                                    }}
                                >
                                    {
                                        food.name
                                    }
                                </h2>

                                <p
                                    style={{
                                        color:
                                            "#81756d",
                                        fontSize:
                                            "13px",
                                        minHeight:
                                            "40px",
                                    }}
                                >
                                    {
                                        food.description
                                    }
                                </p>

                                <div
                                    style={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        margin:
                                            "15px 0",
                                    }}
                                >
                                    <strong
                                        style={{
                                            color:
                                                "#e85d2a",
                                            fontSize:
                                                "20px",
                                        }}
                                    >
                                        ₹
                                        {
                                            food.price
                                        }
                                    </strong>

                                    <span>
                                        ⭐{" "}
                                        {
                                            food.rating
                                        }
                                    </span>
                                </div>

                                <label
                                    style={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "center",
                                        width:
                                            "100%",
                                        padding:
                                            "12px",
                                        borderRadius:
                                            "999px",
                                        background:
                                            "#fff0e5",
                                        color:
                                            "#e85d2a",
                                        fontWeight:
                                            "800",
                                        cursor:
                                            "pointer",
                                        boxSizing:
                                            "border-box",
                                    }}
                                >
                                    {uploadingId ===
                                    food._id
                                        ? "Uploading..."
                                        : food.image
                                        ? "Replace Image"
                                        : "Upload Image"}

                                    <input
                                        type="file"
                                        accept="image/png,image/jpeg,image/webp"
                                        onChange={(
                                            event
                                        ) =>
                                            handleImageUpload(
                                                food._id,
                                                event
                                            )
                                        }
                                        style={{
                                            display:
                                                "none",
                                        }}
                                    />
                                </label>

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(
                                            food._id,
                                            food.name
                                        )
                                    }
                                    style={{
                                        width:
                                            "100%",
                                        marginTop:
                                            "10px",
                                        padding:
                                            "11px",
                                        border:
                                            "none",
                                        borderRadius:
                                            "999px",
                                        background:
                                            "#fff0ed",
                                        color:
                                            "#d84635",
                                        fontWeight:
                                            "700",
                                        cursor:
                                            "pointer",
                                    }}
                                >
                                    Delete Food
                                </button>
                            </div>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}

export default AdminFoods;