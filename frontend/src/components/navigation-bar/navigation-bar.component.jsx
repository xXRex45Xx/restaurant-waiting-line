import { useContext } from "react";

import "./navigation-bar.styles.css";
import LogoutContext from "../../store/logout.context";

export default function NavigationBar({children, onChangePass, changePassSelected}){
    return(
        <nav className="navigationBar">
            {children}
            <div className="navigationBar_userButtons">
                <button onClick={onChangePass} className={`navigationBar_button ${changePassSelected && "navigationBar_button--active"}`}>Change Password</button>
                <button onClick={useContext(LogoutContext).onLogout} className="navigationBar_button">Logout</button>
            </div>
        </nav>
    )
}