import { useReducer, useRef } from "react";

import "./new-food.styles.css";
import ContainerShade from "../../container-shade/container-shade.component";

const emptyFieldsReducer = (state, action) => {
    switch (action) {
        case "SET_EMPTY_NAME":
            return { ...state, name: true }
        case "SET_EMPTY_PRICE":
            return { ...state, price: true }
        case "SET_EMPTY_INGREDIENT":
            return { ...state, ingredient: true }
        case "SET_FILLED_NAME":
            return { ...state, name: false }
        case "SET_FILLED_PRICE":
            return { ...state, price: false }
        case "SET_FILLED_INGREDIENT":
            return { ...state, ingredient: false }
        case "RESET":
            return { name: false, price: false, ingredient: false }
        default:
            return state;
    }
}

export default function NewFood({ onNewFood }) {
    const nameInputRef = useRef();
    const priceInputRef = useRef();
    const ingredientsInputRef = useRef();
    const [emptyFields, dispatchEmptyFields] = useReducer(emptyFieldsReducer, { name: false, price: false, ingredient: false });

    const formSubmitHandler = event => {
        let empty = false;
        event.preventDefault();
        
        if (nameInputRef.current.value === '') {
            dispatchEmptyFields("SET_EMPTY_NAME");
            empty = true;
        }
        if (priceInputRef.current.value === '') {
            dispatchEmptyFields("SET_EMPTY_PRICE");
            empty = true;
        }
        if (ingredientsInputRef.current.value === '') {
            dispatchEmptyFields("SET_EMPTY_INGREDIENT")
            empty = true;
        }
        if (empty)
            return;
        const food = {
            name: nameInputRef.current.value,
            ingredients: ingredientsInputRef.current.value,
            price: parseFloat(priceInputRef.current.value)
        }
        fetch("/api/food/", {
            method: "POST",
            body: JSON.stringify({
                food
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    dispatchEmptyFields("RESET");
                    food._id = data.insertedId;
                    nameInputRef.current.value = '';
                    priceInputRef.current.value = '';
                    ingredientsInputRef.current.value = '';
                    onNewFood(food);
                }
            })
            .catch(error=> console.log(error));
    }

    const nameInputChangeHandler = () => {
        if (emptyFields.name)
            dispatchEmptyFields("SET_FILLED_NAME");
    }

    const priceInputChangeHandler = () => {
        if (emptyFields.price)
            dispatchEmptyFields("SET_FILLED_PRICE");
    }

    const ingredientInputChangeHandler = () => {
        if (emptyFields.ingredient)
            dispatchEmptyFields("SET_FILLED_INGREDIENT");
    }

    return (
        <ContainerShade className="newFood">
            <form onSubmit={formSubmitHandler}>
                <div className="newFood_inputs">
                    <div className="newFood_inputContainer">
                        <label htmlFor="name">Name</label>
                        <input onChange={nameInputChangeHandler} className={`${emptyFields.name && "empty"}`} ref={nameInputRef} type="text" id="name" />
                    </div>
                    <div className="newFood_inputContainer">
                        <label htmlFor="price">Price</label>
                        <input onChange={priceInputChangeHandler} className={`${emptyFields.price && "empty"}`} ref={priceInputRef} type="number" min="0" step="0.01" id="price" />
                    </div>
                    <div className="newFood_inputContainer">
                        <label htmlFor="ingredients">Ingredients</label>
                        <textarea onChange={ingredientInputChangeHandler} className={`${emptyFields.ingredient && "empty"}`} ref={ingredientsInputRef} id="ingredients" cols="10" rows="10"></textarea>
                    </div>
                </div>
                <div className="newFood_actions">
                    <button type="submit">Add Food</button>
                    <button type="reset">Clear</button>
                </div>
            </form>
        </ContainerShade>
    )
}