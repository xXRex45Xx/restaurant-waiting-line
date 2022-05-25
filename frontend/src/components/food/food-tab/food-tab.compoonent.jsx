import { Fragment, useState, useEffect } from "react";
import NewFood from "../new-food/new-food.component";
import Foods from "../foods/foods.component";
import FoodDelete from "../../../store/foodDelete.context";

export default function FoodTab() {
    const [foods, setFoods] = useState(null);
    const [error, setError] = useState(false);

    const getFoods = () => {
        fetch("/api/food", {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => setFoods(data))
            .catch(() => setError(true))
    };

    useEffect(() => {
        getFoods()
    }, []);

    const onNewFood = (food) => {
        setFoods(prevFoods => {
            if (prevFoods === null)
                return setFoods([food]);
            setFoods([
                food,
                ...prevFoods
            ]);
        })
    }

    const onFoodDelete = (foodId) => {
        setFoods(prevFoods => {
            return prevFoods.filter(food => food._id !== foodId)
        })
    }
    return (
        <Fragment>
            <NewFood onNewFood={onNewFood} />
            <FoodDelete.Provider
                value={{onFoodDelete}}
            >
                <Foods foods={foods} error={error} />
            </FoodDelete.Provider>
        </Fragment>
    );
}