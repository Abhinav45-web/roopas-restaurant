import axios from "axios";

const API_URL = "http://localhost:5000/api/reviews";

// Get reviews for a food
export const getFoodReviews = async (foodId) => {
    const response = await axios.get(
        `${API_URL}/food/${foodId}`
    );

    return response.data;
};

// Add review
export const addReview = async (
    foodId,
    rating,
    comment,
    token
) => {
    const response = await axios.post(
        `${API_URL}/food/${foodId}`,
        {
            rating,
            comment,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

// Delete review
export const deleteReview = async (
    reviewId,
    token
) => {
    const response = await axios.delete(
        `${API_URL}/${reviewId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};