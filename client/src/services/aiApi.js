import axios from "axios";

const API_URL = "http://localhost:5000/api/ai";

export const getRecommendations = async (message) => {
    const response = await axios.post(
        `${API_URL}/recommend`,
        {
            message,
        }
    );

    return response.data;
};