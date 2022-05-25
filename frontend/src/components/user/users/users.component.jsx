import "./users.styles.css";

import ContainerShade from "../../container-shade/container-shade.component";
import UserItem from "../user-item/user-item.component";

export default function Users({users, error}){
    return(
        <ContainerShade className="users">
            {error && <p>An Error Occured!</p>}
            {!error && (!users || (users && users.length === 0)) && <p>No Users Registered</p>}
            {!error && users &&
                users.map(user => (
                    <UserItem
                        key={user._id}
                        id={user._id}
                        name={user.name}
                        phoneNumber={user.phoneNumber}
                        username={user.username}
                    />
                ))
            }
        </ContainerShade>
    )
}