import "./foods.styles.css";

import ContainerShade from "../../container-shade/container-shade.component";
import FoodItem from "../food-item/food-item.component";

export default function Foods({hideDelete, foods, error, className}){
    let count = 0;
    return(
        <ContainerShade className={`foods ${className}`}>
            {error && <p>An Error Occured!</p>}
            {!error && (!foods || (foods && foods.length === 0)) && <p>No Foods Registered</p>}
            {!error && foods &&
                foods.map(food => (
                    <FoodItem
                        hideDelete={hideDelete}
                        key={hideDelete ? count++ : food._id}
                        id={food._id}
                        name={food.name}
                        ingredients={food.ingredients}
                        price={food.price}
                    />
                ))
            }
        </ContainerShade>
    )
}