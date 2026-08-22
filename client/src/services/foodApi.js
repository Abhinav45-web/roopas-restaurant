import axios from "axios";
import { API_URL } from "./api";

// ==========================================
// GET ALL FOODS
// ==========================================

export const getFoods = async () => {
    const response = await axios.get(
        `${API_URL}/foods`
    );

    return response.data;
};


// ==========================================
// GET SINGLE FOOD
// ==========================================

export const getFoodById = async (
    foodId
) => {
    const response = await axios.get(
        `${API_URL}/foods/${foodId}`
    );

    return response.data;
};


// ==========================================
// CREATE FOOD
// ADMIN ONLY
// ==========================================

export const createFood = async (
    formData,
    token
) => {
    const response = await axios.post(
        `${API_URL}/foods`,
        formData,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return response.data;
};


// ==========================================
// UPDATE FOOD
// ADMIN ONLY
// ==========================================

export const updateFood = async (
    foodId,
    formData,
    token
) => {
    const response = await axios.put(
        `${API_URL}/foods/${foodId}`,
        formData,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
                "Content-Type":
                    "multipart/form-data",
            },
        }
    );

    return response.data;
};


// ==========================================
// DELETE FOOD
// ADMIN ONLY
// ==========================================

export const deleteFood = async (
    foodId,
    token
) => {
    const response = await axios.delete(
        `${API_URL}/foods/${foodId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return response.data;
};