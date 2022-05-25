import "./queue-form.styles.css"
import ContainerShade from "../../container-shade/container-shade.component";
import FoodItem from "../../food/food-item/food-item.component";
import { useState, useEffect, useRef } from "react";

export default function QueueForm() {
    const [emptyName, setEmptyName] = useState(false);
    const nameInputRef = useRef();
    const [foods, setFoods] = useState(null);
    const [error, setError] = useState(false);
    
    let selectedFoods = new Array();

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

    const formSubmitHandler = event => {
        event.preventDefault();

        if(nameInputRef.current.value.trim().length === 0)
            return setEmptyName(true);
        if(selectedFoods.length === 0)
            return alert("No Food Selected");
        fetch("/api/queue", {
            method: "POST",
            body: JSON.stringify({
                name: nameInputRef.current.value,
                foods: selectedFoods
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then(response => response.json())
        .then(data => {
            if(data.success)
                return alert("Queued Successfully!");
            alert("An Error Occured!")
        })
        .catch(error => alert(error.message))
        .finally(() => {
            selectedFoods = [];
            event.target.reset();
        })
    }

    const nameInputChangeHandler = () => {
        if (emptyName)
            setEmptyName(false);
    }

    const checkboxChangeHandler = event => {
        if(event.target.checked)
            selectedFoods.push(event.target.value);
        else
           selectedFoods = selectedFoods.filter(val => val !== event.target.value);
        console.log(selectedFoods)
    }   

    return (
        <ContainerShade className="newOrder">
            <form onSubmit={formSubmitHandler}>
                <div className="newOrder_actions">
                    <button type="submit">Enqueue</button>
                    <button type="reset">Clear</button>
                </div>
                <div className="newOrder_inputs">
                    <div className="newOrder_inputContainer">
                        <label htmlFor="name">Name</label>
                        <input
                            ref={nameInputRef}
                            onChange={nameInputChangeHandler}
                            className={`${emptyName && "empty"}`}
                            type="text"
                            id="name" />
                    </div>
                    <div className="newOrder_foodList" id="foodList">
                        {error && <p>An Error Occured!</p>}
                        {!error && (!foods || (foods && foods.length === 0)) && <p>No Foods Registered</p>}
                        {!error && foods &&
                            foods.map(food => (
                                <div className="newOrder_inputContainer" key={food._id}>
                                    <input onChange={checkboxChangeHandler} type="checkbox" id={food._id} value={food._id} />
                                    <label htmlFor={food._id}>
                                        <FoodItem
                                            hideDelete={true}
                                            id={food._id}
                                            name={food.name}
                                            ingredients={food.ingredients}
                                            price={food.price} />
                                    </label>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </form>
        </ContainerShade>
    )
}