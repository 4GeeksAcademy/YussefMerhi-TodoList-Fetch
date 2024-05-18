import React, { useState } from 'react'

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
	const [tasks, setTasks] = useState(["Make the bed"])
    const [newTask, setNewTask] = useState("")

	function addTask(e) {
        if(e.key === "Enter" && newTask.trim() !== "") { // Checkea que la tarea escrita no este vacia y borra los espacios en blanco de antes y despues. Y tambien que se pulse Enter.
            const trimmedTask = newTask.trim(); // borra los espacios en blanco de antes y despues
            const capitalizedTask = trimmedTask.charAt(0).toUpperCase() + trimmedTask.slice(1); // chartAt(0).toUpperCase() pone la primera letra en mayuscula y slice(1) añade el resto
            setTasks([...tasks, capitalizedTask])
            setNewTask("")
        }
    }

	function deleteTask(indexToDelete) {
        setTasks(tasks.filter((task, index) => index !== indexToDelete))
    }

	return (
		<> 
			<div className='container'>
				<h1 className='title'>TODOS</h1>
				<div className='list-container'>
					<ul>
						<li>
                        <input 
                            type="text" 
                            onChange={(e)=>setNewTask(e.target.value)} 
                            onKeyDown={addTask} 
                            value={newTask} 
                            className="list-container ps-3 input-no-tasks input-task" maxLength="34" 
                            placeholder={
                                tasks.length > 0
                                    ? "What needs to be done"
                                    : "No task, add your tasks please."
                            }
                        /> 
						</li>
						{tasks.map((task,index) =>      
                                <li key={index} className="d-flex align-items-center">
                                    {task}
                                    <i onClick={()=>deleteTask(index)} className="fa-solid fa-xmark btn fs-2"></i>
                                </li>
                            )}
						<li className="d-flex align-items-center items">
                                <div className="lines-item"></div>
                                {tasks.length} {tasks.length === 1 ? `item` : `items`} left.
                            </li>
					</ul>
                    <ul className="ul-secondary list-container">
                    <li id="second-paper"></li>
                    <li id="third-paper"></li>
                    </ul>
				</div>
			</div>
        </>
	);
};

export default Home;
