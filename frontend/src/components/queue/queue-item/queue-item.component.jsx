import { useContext, useEffect, useState } from "react"
import { createPortal } from "react-dom"

import "./queue-item.styles.css"
import ContainerShade from "../../container-shade/container-shade.component"
import Backdrop from "../../backdrop/backdrop.component";
import Foods from "../../food/foods/foods.component";

export default function QueueItem({ name, foodList, totalPrice }) {
    const [foodData, setFoodData] = useState(null);
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        const foodInfoList = new Array();
        foodList.forEach(async foodId => {
            const foodInfo = await (await fetch(`/api/food/${foodId}`, {
                credentials: "include"
            })).json();
            foodInfoList.push(foodInfo);
        });
        setFoodData(foodInfoList);
    }, [])

    return (
        <ContainerShade className="queueItemContainer">
            {selected && createPortal(
                <Backdrop
                    onConfirm={() => setSelected(false)}
                />,
                document.getElementById("backdrop-root")
            )}
            {selected && createPortal(
                    <Foods hideDelete={true} className="overlay" foods={foodData} />
                ,
                document.getElementById("overlay-root"))}
            <div className="queueItem" onClick={() => setSelected(true)}>
                <div className="queueItem_totalPrice">{totalPrice}</div>
                <div className="queueItem_description">
                    <h2>{name}</h2>
                </div>
            </div>
        </ContainerShade>
    )
}