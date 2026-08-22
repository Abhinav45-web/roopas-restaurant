import axios from "axios";
import { API_URL } from "./api";


// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

export const createPaymentOrder =
    async (
        token
    ) => {
        const response =
            await axios.post(
                `${API_URL}/payment/create`,
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


// ==========================================
// VERIFY PAYMENT
// ==========================================

export const verifyPayment =
    async (
        paymentData,
        token
    ) => {
        const response =
            await axios.post(
                `${API_URL}/payment/verify`,
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


// ==========================================
// FREE DEMO ORDER
// ==========================================

export const createDemoOrder =
    async (
        token
    ) => {
        const response =
            await axios.post(
                `${API_URL}/payment/demo`,
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