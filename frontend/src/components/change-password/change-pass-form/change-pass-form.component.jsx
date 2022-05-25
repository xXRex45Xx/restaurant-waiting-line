import { useReducer, useRef, useContext } from "react";

import ContainerShade from "../../container-shade/container-shade.component";
import LogoutContext from "../../../store/logout.context";
import "./change-pass-form.styles.css";

const emptyFieldsReducer = (state, action) => {
    switch (action) {
        case "SET_EMPTY_OLDPASS":
            return { ...state, oldPass: true }
        case "SET_EMPTY_NEWPASS":
            return { ...state, newPass: true }
        case "SET_EMPTY_CONFIRMPASS":
            return { ...state, confirmPass: true }
        case "SET_FILLED_OLDPASS":
            return { ...state, oldPass: false }
        case "SET_FILLED_NEWPASS":
            return { ...state, newPass: false }
        case "SET_FILLED_CONFIRMPASS":
            return { ...state, confirmPass: false }
        case "RESET":
            return { name: false, price: false, username: false }
        default:
            return state;
    }
}

export default function ChangePassForm() {
    const oldPassInputRef = useRef();
    const newPassInputRef = useRef();
    const confirmPassInputRef = useRef();
    const {onLogout} = useContext(LogoutContext);
    const [emptyFields, dispatchEmptyFields] = useReducer(emptyFieldsReducer, { oldPass: false, newPass: false, confirmPass: false });

    const formSubmitHandler = event => {
        let empty = false;
        event.preventDefault();

        if (oldPassInputRef.current.value === '') {
            dispatchEmptyFields("SET_EMPTY_OLDPASS");
            empty = true;
        }
        if (newPassInputRef.current.value === '') {
            dispatchEmptyFields("SET_EMPTY_NEWPASS");
            empty = true;
        }
        if (confirmPassInputRef.current.value === '') {
            dispatchEmptyFields("SET_EMPTY_CONFIRMPASS")
            empty = true;
        }

        if (empty)
            return;
        if(newPassInputRef.current.value !== confirmPassInputRef.current.value)
            return alert("Passwords Don't Match");
        
        fetch("/api/changepass", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                oldPassword: oldPassInputRef.current.value,
                newPassword: newPassInputRef.current.value
            }),
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if(data.success)
                onLogout();
            alert(data.error.message);
        })
        .catch(error => console.log(error))
        .finally(() => {
            dispatchEmptyFields("RESET");
            oldPassInputRef.current.value = '';
            newPassInputRef.current.value = '';
            confirmPassInputRef.current.value = '';
        })
    }

    const oldPassInputChangeHandler = () => {
        if (emptyFields.oldPass)
            dispatchEmptyFields("SET_FILLED_OLDPASS");
    }

    const newPassInputChangeHandler = () => {
        if (emptyFields.newPass)
            dispatchEmptyFields("SET_FILLED_NEWPASS");
    }

    const confirmPassInputChangeHandler = () => {
        if (emptyFields.confirmPass)
            dispatchEmptyFields("SET_FILLED_CONFIRMPASS");
    }

    return (
        <ContainerShade className="changePass">
            <form onSubmit={formSubmitHandler}>
                <div className="changePass_inputs">
                    <div className="changePass_inputContainer">
                        <label htmlFor="oldPass">Old Password</label>
                        <input
                            onChange={oldPassInputChangeHandler}
                            className={`${emptyFields.oldPass && "empty"}`}
                            ref={oldPassInputRef}
                            type="password"
                            id="oldPass" />
                    </div>
                    <div className="changePass_inputContainer">
                        <label htmlFor="newPass">New Password</label>
                        <input
                            onChange={newPassInputChangeHandler}
                            className={`${emptyFields.newPass && "empty"}`}
                            ref={newPassInputRef}
                            type="password"
                            id="newPass" />
                    </div>
                    <div className="changePass_inputContainer">
                        <label htmlFor="confirmPass">Confirm Password</label>
                        <input
                            onChange={confirmPassInputChangeHandler}
                            className={`${emptyFields.confirmPass && "empty"}`}
                            ref={confirmPassInputRef}
                            id="confirmPass"
                            type="password"
                        />
                    </div>
                </div>
                <div className="changePass_actions">
                    <button type="submit">Chage Password</button>
                    <button type="reset">Clear</button>
                </div>
            </form>
        </ContainerShade>
    )
}