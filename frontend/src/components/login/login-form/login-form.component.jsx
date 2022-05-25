import "./login-form.styles.css"
import pass from "../../../Assets/Images/pass.svg"
import email from "../../../Assets/Images/email.svg"
import submit from "../../../Assets/Images/submit.svg"
import { useState, useRef} from "react"

export default function LoginForm({ onLogin }) {
    const usernameInputRef = useRef();
    const passwordInputRef = useRef();
    const [emptyUsername, setEmptyUsername] = useState(false);
    const [emptyPassword, setEmptyPassword] = useState(false);

    const usernameChangeHandler = () => {
        if(usernameInputRef.current.value.trim().length > 0)
            setEmptyUsername(false);
    };

    const passwordChangeHandler = () => {
        if(passwordInputRef.current.value.trim().length > 0)
            setEmptyPassword(false);
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        if(usernameInputRef.current.value.trim().length === 0)
            return setEmptyUsername(true);
        if(passwordInputRef.current.value.trim().length === 0)
            return setEmptyPassword(true);

        const response = await (await fetch("/api/login",{
            method: "POST",
            body: JSON.stringify({
                username: usernameInputRef.current.value.trim(),
                password: passwordInputRef.current.value.trim()
            }),
            headers:{
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })).json();
        usernameInputRef.current.value = '';
        passwordInputRef.current.value = '';
        if(!response.success)
            return alert(response.error.message);
        onLogin(response.user);
    }

    return (
        <form className="loginForm" onSubmit={submitHandler}>
            <div className="loginForm_inputContainer">
                <label className="loginForm_inputLabel" htmlFor="username">
                    <img src={email} alt="email" className="loginForm_inputImg" />
                </label>
                <input
                    id="username"
                    placeholder="Username"
                    onChange={usernameChangeHandler}
                    type="text" name="username"
                    className={`loginForm_input ${emptyUsername ? "loginForm_input--invalid" : ''}`}
                    ref={usernameInputRef} />
            </div>
            <div className="loginForm_inputContainer">
                <label className="loginForm_inputLabel" htmlFor="password">
                    <img src={pass} alt="password" className="loginForm_inputImg" />
                </label>
                <input
                    id="password"
                    placeholder="Password" type="password"
                    onChange={passwordChangeHandler}
                    name="password"
                    className={`loginForm_input ${emptyPassword ? "loginForm_input--invalid" : ''}`}
                    ref={passwordInputRef} />
            </div>
            <button className="loginForm_submit" type="submit">
                <img src={submit} alt="submit" />
            </button>
        </form>
    )
}