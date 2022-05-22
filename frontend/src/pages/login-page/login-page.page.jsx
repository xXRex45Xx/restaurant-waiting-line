import "./login-page.styles.css"
import "../../Assets/Images/login-page-bg.png"
import CenterShade from "../../components/center-shade/center-shade.component"
import LoginForm from "../../components/login/login-form/login-form.component"

export default function LoginPage({onLogin}) {

    return (
        <div className="loginPage">
            <CenterShade>
                <h2>Sign in</h2>
                <h3>Welcome Back</h3>
                <LoginForm onLogin={onLogin}/>
            </CenterShade>
        </div>
    )
}