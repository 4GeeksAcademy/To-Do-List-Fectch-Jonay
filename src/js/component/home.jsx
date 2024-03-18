import React, { useState, useEffect } from "react";


//create your first component
const Home = () => {

	const [newTask,setNewTask]=useState("")
 	const [tasks,setTasks]=useState([])

////// -------------Esta funcion añade una task nueva en el Array al presionar ENTER----------------------////
	function writeTask(event) {
		// console.log(event);
		if (event.key === "Enter") {
			// console.log("Agregar task");
			setTasks(tasks.concat( { label: newTask, done: false }))
			setNewTask("");
			putTask(tasks.concat( { label: newTask, done: false }));
		}
	}

 ////// -------------Esta funcion elimina una position del Array por su indice----------------------////
	function deletetask(position) {
		const arrayfiltered = tasks.filter((item, index) => index !== position)
		setTasks(arrayfiltered)
		putTask(arrayfiltered);
		}

		
	function createUser() {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/JonayJ0', {
			method:'POST',
			body: JSON.stringify([]),
			headers:{
				"Content-Type": "application/json"
			}
		})
		.then((response)=>response.json())
		.then((data)=>console.log(data))
		.catch((error)=>console.log(error))
	 }

	 // esta funcion trae la lista de tareas de la Api 
	 function getInfo() {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/JonayJ0', {
			method:'GET'
		})
		.then((response)=>{
			console.log(response);
			if (response.status === 404) {
				createUser()
			}
			return response.json()
		})
		.then((data)=>
			// console.log(data)
			setTasks(data))
		.catch((error)=>console.log(error))
	 }


	 //Actualiza las tareas
	function putTask(tasks) {
		fetch('https://playground.4geeks.com/apis/fake/todos/user/JonayJ0', {
		method: "PUT",
		body: JSON.stringify(tasks),
		headers: {
			"Content-Type": "application/json"
		}
		})
		.then(resp => {
			console.log(resp.ok); // Será true si la respuesta es exitosa
			console.log(resp.status); // El código de estado 200, 300, 400, etc.
			console.log(resp.text()); // Intentará devolver el resultado exacto como string
			return resp.json(); // Intentará parsar el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
		})
		.then(data => {
			// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
			console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
		})
		.catch(error => {console.log(error);});
	}

	//  function putTask(tasks) {
	// 	fetch('https://playground.4geeks.com/apis/fake/todos/user/JonayJ0', {
	// 		method:'PUT'
	//      body: JSON.stringify(tasks),
	// 		headers {
	// 		"Content-Type": "application/json"
	// 	}
    //   		// PARAMS: None,
	// 	})
	// 	.then((response)=>response.json())
	// 	.then((data)=>console.log(data))
	// 	.catch((error)=>console.log(error))
	//  }
// console.log(data);

 function deleteList() {
	fetch('https://playground.4geeks.com/apis/fake/todos/user/JonayJ0', {
			method:'DELETE'
		})
		.then((response)=>
			console.log(response))
		.then((data)=>
			console.log(data))
		
		.catch((error)=>console.log(error))
 }

// function deleteAll() {
// 	const arrayFiltered = [{"done": false, "label": "GET/POST/PUT/DELETE"}];
// 	setTasks(arrayFiltered);
// 	putLista(arrayFiltered);
// }

		useEffect(()=>{
			getInfo()
			
		},[])

	return (
		<>
		<h1 className="text-center mt-5"><b>LISTA DE TAREAS</b></h1>
		<div className="blog container">
			<input className="list container border-0 py-3" type="text" 
					onChange={(event) => {setNewTask(event.target.value)}} 
					onKeyDown={writeTask} value={newTask} placeholder="Añadir nueva tarea"/>
					
			<ul className="list-group list-group-flush">
					{tasks.map((task,index) => { return (<li className="list-group-item py-3 ms-3" key={index}> {task.label}   
						<span className="delete" onClick={() => deletetask(index)}><i className="fa-solid fa-xmark"></i></span></li>)
					}
					)}	
			</ul>
				<div className="contador border-top p-3"><span>{tasks.length} tasks</span></div>	
		</div>
		<div>
			<span className="buttonDelete" onClick={() => deleteList()}><button className="btn btn-danger mt-4" type="button">DELETE</button></span>
			</div>
		</>
	);
};

export default Home;



//  function deletetask(indextask) {
// 	const taskEliminada = tasks.filter((task, index) => index !== indextask);
// 	settasks(taskEliminada);
// 	}


