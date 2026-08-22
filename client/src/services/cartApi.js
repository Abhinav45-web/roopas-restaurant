import axios from "axios";
import { API_URL } from "./api";


// ==========================================
// GET CART
// ==========================================

export const getCart = async (
    token
) => {
    const response = await axios.get(
        `${API_URL}/cart`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


// ==========================================
// ADD TO CART
// ==========================================

export const addToCart = async (
    foodId,
    quantity,
    token
) => {
    const response = await axios.post(
        `${API_URL}/cart/add`,
        {
            foodId,
            quantity,
        },
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return response.data;
};


// ==========================================
// REMOVE FROM CART
// ==========================================

export const removeFromCart =
    async (
        foodId,
        token
    ) => {
        const response =
            await axios.delete(
                `${API_URL}/cart/remove`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },

                    data: {
                        foodId,
                    },
                }
            );

        return response.data;
    };


// ==========================================
// INCREASE QUANTITY
// ==========================================

export const increaseQuantity =
    async (
        foodId,
        token
    ) => {
        const response =
            await axios.put(
                `${API_URL}/cart/increase`,
                {
                    foodId,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    };


// ==========================================
// DECREASE QUANTITY
// ==========================================

export const decreaseQuantity =
    async (
        foodId,
        token
    ) => {
        const response =
            await axios.put(
                `${API_URL}/cart/decrease`,
                {
                    foodId,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    };