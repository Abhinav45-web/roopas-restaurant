import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

// Get cart
export const getCart = async (token) => {
    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

// Add item
export const addToCart = async (
    foodId,
    quantity,
    token
) => {
    const response = await axios.post(
        `${API_URL}/add`,
        {
            foodId,
            quantity,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Remove item
export const removeFromCart = async (
    foodId,
    token
) => {
    const response = await axios.delete(
        `${API_URL}/remove`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                foodId,
            },
        }
    );

    return response.data;
};

// Increase quantity
export const increaseQuantity = async (
    foodId,
    token
) => {
    const response = await axios.put(
        `${API_URL}/increase`,
        {
            foodId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Decrease quantity
export const decreaseQuantity = async (
    foodId,
    token
) => {
    const response = await axios.put(
        `${API_URL}/decrease`,
        {
            foodId,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};