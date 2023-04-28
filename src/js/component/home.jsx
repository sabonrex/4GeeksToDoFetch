import React, { useState, useEffect } from "react";
import "../../styles/index.css";

const Home = () => {
	const [ inputValue, setInputValue] = useState("");
	const [ toDoItem, settoDoItem ] = useState([]);
	

	const fetchToDoItemList = async () => {
		try {
			const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/sabona");
			const data = await response.json();
			settoDoItem(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchToDoItemList();
	}, []);

	const updateList = async (newList) => {
		try {
			const response = await fetch("https://assets.breatheco.de/apis/fake/todos/user/sabona", {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(newList)
			});
			const data = await response.json();
			console.log(data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleAddItem = (newItem) => {
		const newList = toDoItem.concat({ label: newItem, done: false });
		settoDoItem(newList);
		updateList(newList);
	};

	const handleDeleteToDo = (index) => {
		const newList = toDoItem.filter((_, currentIndex) => index !== currentIndex);
		settoDoItem(newList);
		updateList(newList);
	};
	return (
		<>
		<div className="container-fluid row d-flex justify-content-center align-items-center p-2">
			<h1 className="row justify-content-center">To Do List</h1>
			<ul className="list-container shadow col-12">
					<li className="list-title">
						<input 
						className="text" 
						onChange={(e) => setInputValue(e.target.value)} 
						value={inputValue}
						onKeyPress={(e) => {
							if (e.key === "Enter" && !/^\s*$/.test(inputValue)) {
								handleAddItem(inputValue);
								setInputValue("");
							}
						}}
							placeholder="Add Task"></input>
					</li>
						{toDoItem && toDoItem.length > 0 && toDoItem.map((item, index) => (
						<li key={index} className="list-item">{item.label}
						<button className="invisible btn btn-sm btn-default" type="button" onClick={() => handleDeleteToDo(index)}><i className="fas fa-trash-alt"></i></button>
						</li>
						))}
			</ul>
				<p><sub>{toDoItem.length} task(s) left</sub></p>
			</div>
		</>
	);
};

export default Home;
