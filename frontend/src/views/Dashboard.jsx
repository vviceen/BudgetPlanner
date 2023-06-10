import { useEffect, useState } from "react";
import { getUser } from "../api/task.api";

export function Dashboard() {
    const [users, setUsers] = useState();

    useEffect(() => {
        async function loadUser() {
            const theUsers = await getUser();
            setUsers(theUsers.data);
        }
        loadUser();
    }, []);

    useEffect(() => {
        if (users && users.length > 0) {
            console.log(users);
        }
    }, [users]);

    return (
        <>
            <h1>Dashboard</h1>
            <div>
                {users && users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.user_id}>
                            <p>User ID: {user.user_id}</p>
                            <p>User Name: {user.user_name}</p>
                            <p>Email: {user.email}</p>
                            <p>Budget: {user.budget}</p>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}
            </div>
        </>
    );
}