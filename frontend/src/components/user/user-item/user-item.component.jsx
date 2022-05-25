import { useContext } from "react"

import "./user-item.styles.css"
import ContainerShade from "../../container-shade/container-shade.component"
import UserDelete from "../../../store/userDelete.context"

export default function UserItem({ name, phoneNumber, username, id }) {
    const {onUserDelete} = useContext(UserDelete);

    const userDeleteHandler = () => {
        fetch(`/api/user/${id}`,{
            method: "DELETE",
            credentials: "include"
        })
        .then(response => response.json())
        .then(data => {
            if(data.success)
                onUserDelete(id);
        })
        .catch(error => console.log(error));
        
    };

    return (
        <ContainerShade className="userItemContainer">
            <div className="userItem">
                <div className="userItem_phoneNumber">{phoneNumber}</div>
                <div className="userItem_description">
                    <h2>Name: {name}</h2>
                    <h3>Username: {username}</h3>
                </div>
            </div>
            <button onClick={userDeleteHandler}>Delete User</button>
        </ContainerShade>
    )
}