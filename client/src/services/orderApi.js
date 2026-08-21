import axios from "axios";

const API_URL =
    "http://localhost:5000/api/orders";

export const placeOrder = async (
    token
) => {
    const response = await axios.post(
        API_URL,
        {},
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getMyOrders = async (
    token
) => {
    const response = await axios.get(
        `${API_URL}/my-orders`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const getOrderById = async (
    orderId,
    token
) => {
    const response = await axios.get(
        `${API_URL}/${orderId}`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return response.data;
};