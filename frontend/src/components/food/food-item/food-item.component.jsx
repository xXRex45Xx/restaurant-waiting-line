import { useContext } from "react"

import "./food-item.styles.css"
import ContainerShade from "../../container-shade/container-shade.component"
import FoodDelete from "../../../store/foodDelete.context"

export default function FoodItem({ hideDelete, name, ingredients, price, id }) {
    const {onFoodDelete} = useContext(FoodDelete);

    const foodDeleteHandler = () => {
        fetch(`/api/food/${id}`,{
            method: "DELETE",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if(data.success)
                onFoodDelete(id);
        })
        .catch(error => console.log(error));
        
    };

    return (
        <ContainerShade className="foodItemContainer">
            <div className="foodItem">
                <div className="foodItem_price">{price}</div>
                <div className="foodItem_description">
                    <h2>{name}</h2>
                    <p>{ingredients}</p>
                </div>
            </div>
            {hideDelete ? null : <button onClick={foodDeleteHandler}>Delete Food</button>}
        </ContainerShade>
    )
}