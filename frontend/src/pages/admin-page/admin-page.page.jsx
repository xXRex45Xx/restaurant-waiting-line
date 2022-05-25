import { useContext, useReducer } from "react";

import "./admin-page.styles.css";
import ContainerShade from "../../components/container-shade/container-shade.component";
import LogoutContext from "../../store/logout.context";
import NavigationBar from "../../components/navigation-bar/navigation-bar.component";
import FoodTab from "../../components/food/food-tab/food-tab.compoonent";
import UserTab from "../../components/user/user-tab/user-tab.compoonent";
import ChangePassTab from "../../components/change-password/change-pass-tab/change-pass-tab.component";

const reduceSelection = (state, action) => {
    switch (action) {
        case "SELECT_FOODS":
            return { foods: true };
        case "SELECT_USERS":
            return { users: true };
        case "SELECT_CHANGE_PASS":
            return { changePass: true };
        default:
            return state;
    }
}

export default function AdminPage() {
    const [selectedContent, dispatchSelection] = useReducer(reduceSelection, { foods: true });

    const foodsButtonClickHandler = () => dispatchSelection("SELECT_FOODS");
    const usersButtonClickHandler = () => dispatchSelection("SELECT_USERS");
    const changePassClickHandler = () => dispatchSelection("SELECT_CHANGE_PASS");

    const { onLogout } = useContext(LogoutContext);
    return (
        <div className="adminPage">
            <ContainerShade className="navBarContainer">
                <NavigationBar onChangePass={changePassClickHandler} changePassSelected={selectedContent.changePass && true}>
                    <button
                        onClick={foodsButtonClickHandler}
                        className={`navigationBar_button ${selectedContent.foods && "navigationBar_button--active"}`}
                    >Foods</button>
                    <button
                        onClick={usersButtonClickHandler}
                        className={`navigationBar_button ${selectedContent.users && "navigationBar_button--active"}`}
                    >Users</button>
                </NavigationBar>
            </ContainerShade>
            <main className={selectedContent.changePass && "adminPage_main"}>
                {selectedContent.foods && <FoodTab/>}
                {selectedContent.users && <UserTab/>}
                {selectedContent.changePass && <ChangePassTab/>}
            </main>
        </div>
    )
}