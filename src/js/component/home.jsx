import React, { useEffect, useState } from 'react'

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = ({ currentUser }) => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")


    useEffect(() => {
        getTasks()
    }, [currentUser])

    function getTasks() {
        fetch(`https://playground.4geeks.com/todo/users/${currentUser}`)
            .then((response) => response.json())
            .then((data) => setTasks(data.todos))
    }

    function addTask(e) {
        if (e.key === "Enter" && newTask.trim() !== "") { // Checkea que la tarea escrita no este vacia y borra los espacios en blanco de antes y despues. Y tambien que se pulse Enter
            const trimmedTask = newTask.trim(); // borra los espacios en blanco de antes y despues
            const capitalizedTask = trimmedTask.charAt(0).toUpperCase() + trimmedTask.slice(1); // chartAt(0).toUpperCase() pone la primera letra en mayuscula y slice(1) añade el resto

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                        "label": capitalizedTask,
                        "is_done": false
                    }
                )
            };
            fetch(`https://playground.4geeks.com/todo/todos/${currentUser}`, requestOptions)
                .then(response => response.json())
                .then(() => getTasks())
            setNewTask("")
        }
    }

    function deleteTask(indexToDelete) {
        fetch(`https://playground.4geeks.com/todo/todos/${tasks[indexToDelete].id}`, { method: 'DELETE' })
            .then(() => getTasks())
    }

    function todoListItem(tasks) {
        let message;
        if (tasks.length === 0) {
            message = "No items added yet";
        } else if (tasks.length === 1) {
            message = "1 item left";
        } else {
            message = `${tasks.length} items left`;
        }
        return message
    }

    return (
        <div className="text-center container">
            <h1 className="text-center mt-5">TODO LIST</h1>
            <div className="todo-input">
                <div className="input-content">
                    <div className="todos-container">
                        <div className="input-container">
                            <input
                                type="text"
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyDown={addTask}
                                value={newTask}
                                className="input-is input-no-tasks" maxLength="34"
                                placeholder={
                                    tasks.length > 0
                                        ? "What needs to be done"
                                        : "No task, add your tasks please."
                                }
                            />
                        </div>
                        <ul className="todo">
                            {tasks.map((task, index) =>
                                <li key={index} className="d-flex justify-content-between align-items-center">
                                    {task.label}
                                    <i onClick={() => deleteTask(index)} className="fa-solid fa-xmark btn fs-2"></i>
                                </li>
                            )}
                            <li className="input-is text-start p-0 items">
                                {todoListItem(tasks)}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
