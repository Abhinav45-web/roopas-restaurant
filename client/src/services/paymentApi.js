import axios from "axios";

const API_URL =
    "http://localhost:5000/api/payment";

export const createPaymentOrder = async (
    token
) => {
    const response = await axios.post(
        `${API_URL}/create`,
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

export const verifyPayment = async (
    paymentData,
    token
) => {
    const response = await axios.post(
        `${API_URL}/verify`,
        paymentData,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const createDemoOrder = async (
    token
) => {
    const response = await axios.post(
        `${API_URL}/demo`,
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