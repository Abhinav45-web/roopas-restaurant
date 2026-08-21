import React, { useEffect, useState } from "react";
import FoodCard from "./FoodCard";
import { getFoods } from "../services/foodApi";

function PopularDishes() {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        fetchFoods();
    }, []);

    const fetchFoods = async () => {
        try {
            const data = await getFoods();

            const popularFoods = data.filter(
                (food) => food.bestseller
            );

            setFoods(popularFoods);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="popular-dishes">
            {foods.map((food) => (
                <FoodCard
                    key={food._id}
                    food={food}
                />
            ))}
        </div>
    );
}

export default PopularDishes;