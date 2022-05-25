import { Fragment, useState, useEffect } from "react";
import NewUser from "../new-user/new-user.component";
import Users from "../users/users.component";
import UserDelete from "../../../store/userDelete.context";

export default function UserTab() {
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(false);

    const getUsers = () => {
        fetch("/api/user", {
            credentials: "include"
        })
            .then(response => response.json())
            .then(data => setUsers(data.filter(user => !user.isAdmin)))
            .catch(() => setError(true))
    };

    useEffect(() => {
        getUsers()
    }, []);
    const onNewUser = (user) => {
        setUsers(prevUsers => {
            if (prevUsers === null)
                return setUsers([user]);
            setUsers([
                user,
                ...prevUsers
            ]);
        })
    };

    const onUserDelete = (userId) => {
        setUsers(prevUsers => {
            return prevUsers.filter(user => user._id !== userId)
        })
    };
    
    return (
        <Fragment>
            <NewUser onNewUser={onNewUser} />
            <UserDelete.Provider
                value={{onUserDelete}}
            >
                <Users users={users} error={error} />
            </UserDelete.Provider>
        </Fragment>
    );
}