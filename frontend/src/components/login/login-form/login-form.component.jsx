import "./login-form.styles.css"
import pass from "../../../Assets/Images/pass.svg"
import email from "../../../Assets/Images/email.svg"
import submit from "../../../Assets/Images/submit.svg"

export default function LoginForm() {
    const emailChangeHandler = (event) => console.log(event.nativeEvent.data);
    return (
        <form className="loginForm" action="" method="get">
            <div className="loginForm_inputContainer">
                <img src={email} alt="email" className="loginForm_inputImg" />
                <input onChange={emailChangeHandler} placeholder="Email Address" type="email" name="email" className="loginForm_input" />
            </div>
            <div className="loginForm_inputContainer">
                <img src={pass} alt="password" className="loginForm_inputImg" />
                <input placeholder="Password" type="password" name="password" className="loginForm_input" />
            </div>
            <button className="loginForm_submit" type="submit">
                <img src={submit} alt="submit" />
            </button>
        </form>
    )
}