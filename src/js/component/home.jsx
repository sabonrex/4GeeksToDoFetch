import React, { useState } from "react";
import "../../styles/index.css";

const Home = () => {
	const [ inputValue, setInputValue] = useState("");
	const [ toDoItem, settoDoItem ] = useState([]);
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
						if (e.key === "Enter") {
							settoDoItem(toDoItem.concat([inputValue]));
							setInputValue("");
							}
								}}
							placeholder="Add Task"></input>
					</li>
						{toDoItem.map((item, index) => (
						<li className="list-item">{item}
						<button className="invisible btn btn-sm btn-default" type="button" onClick={() => settoDoItem(toDoItem.filter((item, currentIndex) => index != currentIndex))}><i className="fas fa-trash-alt"></i></button>
						</li>
						))}
			</ul>
				<p><sub>{toDoItem.length} task(s) left</sub></p>
			</div>
		</>
	);
};

export default Home;
