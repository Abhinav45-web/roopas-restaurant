import axios from "axios";

const API_URL =
    "http://localhost:5000/api/foods";

export const getFoods = async () => {
    const response = await axios.get(
        API_URL
    );

    return response.data;
};

export const getFoodById = async (
    foodId
) => {
    const response = await axios.get(
        `${API_URL}/${foodId}`
    );

    return response.data;
};

export const updateFood = async (
    foodId,
    formData
) => {
    const response = await axios.put(
        `${API_URL}/${foodId}`,
        formData
    );

    return response.data;
};

export const deleteFood = async (
    foodId
) => {
    const response = await axios.delete(
        `${API_URL}/${foodId}`
    );

    return response.data;
};