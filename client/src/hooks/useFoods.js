import { useEffect, useState } from "react";
import axios from "axios";

const useFoods = () => {
    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5000/api/foods"
                );

                setFoods(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchFoods();
    }, []);

    return { foods, loading };
};

export default useFoods;