import "./login-form.styles.css"
import pass from "../../../Assets/Images/pass.svg"
import email from "../../../Assets/Images/email.svg"
import submit from "../../../Assets/Images/submit.svg"
import { useState} from "react"

export default function LoginForm({onLogin}) {
    const [enterdUsername, setEnteredUsername] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');

    const usernameChangeHandler = event => setEnteredUsername(event.target.value);

    const passwordChangeHandler = event => setEnteredPassword(event.target.value);

    const submitHandler = event => {
        event.preventDefault();
        
        const userCreds = {
            username: enterdUsername,
            password: enteredPassword
        }

        console.log(userCreds);
        onLogin('56556', true);
        setEnteredUsername('');
        setEnteredPassword('');
    }

    return (
        <form className="loginForm" onSubmit={submitHandler}>
            <div className="loginForm_inputContainer">
                <img src={email} alt="email" className="loginForm_inputImg" />
                <input onChange={usernameChangeHandler} placeholder="Username" value={enterdUsername} type="text" name="username" className="loginForm_input" />
            </div>
            <div className="loginForm_inputContainer">
                <img src={pass} alt="password" className="loginForm_inputImg" />
                <input onChange={passwordChangeHandler} value={enteredPassword} placeholder="Password" type="password" name="password" className="loginForm_input" />
            </div>
            <button className="loginForm_submit" type="submit">
                <img src={submit} alt="submit" />
            </button>
        </form>
    )
}