import React, { useEffect, useState } from "react";
import Home from "./home";
import Modal from "./modal";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [newUser, setNewUser] = useState("");
    const [modalSuccess, setModalSuccess] = useState(false);
    const [modalFail, setModalFail] = useState(false);

    const getUsers = async () => {
        try {
            const response = await fetch("https://playground.4geeks.com/todo/users?offset=0&limit=100");
            const data = await response.json();
            setUsers(data.users);
        } catch (error) {
            console.log('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const addUser = async (e) => {
        if (e.key === "Enter" && newUser.trim() === "") {
            setModalFail(true);
        } else if (e.key === "Enter" && newUser.trim() !== "") {
            const trimmedUser = newUser.trim();
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            };
            try {
                const response = await fetch(
                    `https://playground.4geeks.com/todo/users/${trimmedUser}`,
                    requestOptions
                );
                await response.json();
                getUsers();
                setModalSuccess(true);
            } catch (error) {
                console.log("Error adding user:", error);
            }
            setNewUser("");
        }
    };

    const deleteUser = async (userName) => {
        try {
            const response = await fetch(
                `https://playground.4geeks.com/todo/users/${userName}`,
                { method: "DELETE" }
            );
            if (response.ok) {
                getUsers();
            } else {
                console.log("Error deleting user:", response.statusText);
            }
        } catch (error) {
            console.log("Error deleting user:", error);
        }
    };

    const handleUserSelect = (user) => {
        setSelectedUser(user);
    };

    return (
        <>
            <div className="text-center d-flex justify-content-between p-4">
                <div className="dropdown">
                    <button
                        className="btn dropdown-toggle fs-4 users"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {selectedUser === "" ? "Users" : selectedUser}
                    </button>
                    <ul className="dropdown-menu ">
                        {users.map((user, index) => (
                            <li key={index} className="d-flex justify-content-between align-items-center">
                                <a
                                    className="dropdown-item text-white fw-semibold"
                                    href="#"
                                    onClick={() => handleUserSelect(user.name)}
                                >
                                    {user.name}
                                </a>
                                <button
                                    className="btn btn-danger ms-2"
                                    onClick={() => deleteUser(user.name)}
                                >
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text users fs-4" id="input-user">
                        New user
                    </span>
                    <input
                        type="text"
                        onChange={(e) => setNewUser(e.target.value)}
                        onKeyDown={addUser}
                        value={newUser}
                        aria-describedby="input-user"
                        className="form-control users fs-4"
                        maxLength="50"
                        placeholder="Add here a new user (MAX 50 chars)"
                    />
                </div>
            </div>
            {selectedUser === "" ? <h1 className="text-center mt-5 ">Select an user</h1> :
                <Home currentUser={selectedUser} />
            }
            {modalSuccess && (
                <Modal
                    onClose={() => setModalSuccess(false)}
                    message={"User created successfully!"}
                    faceIcon={"fa-regular fa-face-smile-beam ms-2 mt-2 fs-5"}
                />
            )}
            {modalFail && (
                <Modal
                    onClose={() => setModalFail(false)}
                    message={"You cannot create an empty user, please enter at least one character to create a user"}
                    faceIcon={"fa-regular fa-face-frown ms-2 mt-2 fs-5"}
                />
            )}
        </>
    );
};

export default Users