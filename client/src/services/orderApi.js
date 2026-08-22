import axios from "axios";
import { API_URL } from "./api";


// ==========================================
// GET MY ORDERS
// ==========================================

export const getMyOrders =
    async (
        token
    ) => {
        const response =
            await axios.get(
                `${API_URL}/orders/my-orders`,
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
// GET SINGLE ORDER
// ==========================================

export const getOrderById =
    async (
        orderId,
        token
    ) => {
        const response =
            await axios.get(
                `${API_URL}/orders/${orderId}`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

        return response.data;
    };