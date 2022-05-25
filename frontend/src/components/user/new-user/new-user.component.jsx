import { useReducer, useRef } from "react";

import "./new-user.styles.css";
import ContainerShade from "../../container-shade/container-shade.component";

const emptyFieldsReducer = (state, action) => {
    switch (action) {
        case "SET_EMPTY_NAME":
            return { ...state, name: true }
        case "SET_EMPTY_PHONENUMBER":
            return { ...state, phoneNumber: true }
        case "SET_EMPTY_USERNAME":
            return { ...state, username: true }
        case "SET_FILLED_NAME":
            return { ...state, name: false }
        case "SET_FILLED_PHONENUMBER":
            return { ...state, phoneNumber: false }
        case "SET_FILLED_USERNAME":
            return { ...state, username: false }
        case "RESET":
            return { name: false, price: false, username: false }
        default:
            return state;
    }
}

export default function NewUser({ onNewUser }) {
    const nameInputRef = useRef();
    const phoneNumberInputRef = useRef();
    const usernameInputRef = useRef();
    const [emptyFields, dispatchEmptyFields] = useReducer(emptyFieldsReducer, { name: false, phoneNumber: false, username: false });

    const formSubmitHandler = event => {
        let empty = false;
        event.preventDefault();

        if (nameInputRef.current.value === '') {
            dispatchEmptyFields("SET_EMPTY_NAME");
            empty = true;
        }
        if (phoneNumberInputRef.current.value === '') {
            dispatchEmptyFields("SET_EMPTY_PHONENUMBER");
            empty = true;
        }
        if (usernameInputRef.current.value === '') {
            dispatchEmptyFields("SET_EMPTY_USERNAME")
            empty = true;
        }
        if (empty)
            return;
        const user = {
            name: nameInputRef.current.value,
            username: usernameInputRef.current.value,
            phoneNumber: phoneNumberInputRef.current.value,
            password: usernameInputRef.current.value,
            isAdmin: false
        }
        fetch("/api/user/", {
            method: "POST",
            body: JSON.stringify({
                user
            }),
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(user);
                    dispatchEmptyFields("RESET");
                    user._id = data.insertedUser;
                    nameInputRef.current.value = '';
                    phoneNumberInputRef.current.value = '';
                    usernameInputRef.current.value = '';
                    onNewUser(user);
                }
            })
            .catch(error => console.log(error));
    }

    const nameInputChangeHandler = () => {
        if (emptyFields.name)
            dispatchEmptyFields("SET_FILLED_NAME");
    }

    const phoneNumberInputChangeHandler = () => {
        if (emptyFields.phoneNumber)
            dispatchEmptyFields("SET_FILLED_PHONENUMBER");
    }

    const usernameInputChangeHandler = () => {
        if (emptyFields.username)
            dispatchEmptyFields("SET_FILLED_USERNAME");
    }

    return (
        <ContainerShade className="newUser">
            <form onSubmit={formSubmitHandler}>
                <div className="newUser_inputs">
                    <div className="newUser_inputContainer">
                        <label htmlFor="name">Name</label>
                        <input
                            onChange={nameInputChangeHandler}
                            className={`${emptyFields.name && "empty"}`}
                            ref={nameInputRef}
                            type="text"
                            id="name" />
                    </div>
                    <div className="newUser_inputContainer">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            onChange={phoneNumberInputChangeHandler}
                            className={`${emptyFields.phoneNumber && "empty"}`}
                            ref={phoneNumberInputRef}
                            type="tel"
                            id="phoneNumber" />
                    </div>
                    <div className="newUser_inputContainer">
                        <label htmlFor="username">Username</label>
                        <input
                            onChange={usernameInputChangeHandler}
                            className={`${emptyFields.username && "empty"}`}
                            ref={usernameInputRef}
                            id="username"
                            cols="10"
                            rows="10"/>
                    </div>
                </div>
                <div className="newUser_actions">
                    <button type="submit">Add User</button>
                    <button type="reset">Clear</button>
                </div>
            </form>
        </ContainerShade>
    )
}