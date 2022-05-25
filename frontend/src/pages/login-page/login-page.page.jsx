import "./login-page.styles.css"
import "../../Assets/Images/login-page-bg.png"
import CenterShade from "../../components/center-shade/center-shade.component"
import LoginForm from "../../components/login/login-form/login-form.component"
import { Fragment } from "react"

export default function LoginPage({ onLogin, children }) {
    return (
        <div className="loginPage">
            <CenterShade>
                {children && children}
                {!children &&
                    <Fragment>
                        <h2>Sign in</h2>
                        <h3>Welcome Back</h3>
                        <LoginForm onLogin={onLogin}/>
                    </Fragment>
                }
            </CenterShade>
        </div>
    )
}