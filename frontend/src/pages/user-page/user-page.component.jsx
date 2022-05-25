import { useContext, useReducer } from "react";

import "./user-page.styles.css";
import ContainerShade from "../../components/container-shade/container-shade.component";
import LogoutContext from "../../store/logout.context";
import NavigationBar from "../../components/navigation-bar/navigation-bar.component";
import ChangePassTab from "../../components/change-password/change-pass-tab/change-pass-tab.component";
import QueueTab from "../../components/queue/queue-tab/queue-tab.component";
import QueueForm from "../../components/queue/queue-form/queue-form.component";

const reduceSelection = (state, action) => {
    switch (action) {
        case "SELECT_QUEUE":
            return { queue: true };
        case "SELECT_NEW_ORDER":
            return { newOrder: true };
        case "SELECT_CHANGE_PASS":
            return { changePass: true };
        default:
            return state;
    }
}

export default function UserPage() {
    const [selectedContent, dispatchSelection] = useReducer(reduceSelection, { queue: true });

    const queueClickHandler = () => dispatchSelection("SELECT_QUEUE");
    const newOrderClickHandler = () => dispatchSelection("SELECT_NEW_ORDER");
    const changePassClickHandler = () => dispatchSelection("SELECT_CHANGE_PASS");

    return (
        <div className="adminPage">
            <ContainerShade className="navBarContainer">
                <NavigationBar onChangePass={changePassClickHandler} changePassSelected={selectedContent.changePass && true}>
                    <button
                        onClick={queueClickHandler}
                        className={`navigationBar_button ${selectedContent.queue && "navigationBar_button--active"}`}>
                        Queue
                    </button>
                    <button
                    onClick={newOrderClickHandler}
                    className={`navigationBar_button ${selectedContent.newOrder && "navigationBar_button--active"}`}>
                        NewOrder
                    </button>
                </NavigationBar>
            </ContainerShade>
            <main className={selectedContent.changePass && "adminPage_main"}>
                {selectedContent.queue && <QueueTab />}
                {selectedContent.changePass && <ChangePassTab />}
                {selectedContent.newOrder && <QueueForm/>}
            </main>
        </div>
    )
}