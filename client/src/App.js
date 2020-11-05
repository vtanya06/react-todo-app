import "./App.css";
import AddTodo from "./components/add-todo";
import Todos from "./components/todos";
import Container from "react-bootstrap/Container";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
	const [todos, setTodos] = useState([]);

	useEffect(() => {
		getTodos();
	}, []);

	async function getTodos() {
		try {
			let allTodos = await axios.get("http://localhost:5000/api/todos");

			setTodos(allTodos.data.data);
		} catch (error) {
			console.log(error);
		}
	}

	async function addTodo(name) {
		try {
			await axios.post("http://localhost:5000/api/todos", {
				name: name,
			});

			getTodos();
		} catch (error) {
			console.log(error);
		}
	}

	async function markAsDone(id) {
		try {
			await axios.put(`http://localhost:5000/api/todos/${id}`, {
				done: true,
			});

			getTodos();
		} catch (error) {
			console.log(error);
		}
	}

	async function deleteTodo(id) {
		try {
			await axios.delete(`http://localhost:5000/api/todos/${id}`);

			getTodos();
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<div className="App">
			<h1>Todo Application</h1>
			<Container>
				<AddTodo addTodo={addTodo} />
				<div className="mt-20">
					<Todos
						todos={todos}
						markAsDone={markAsDone}
						deleteTodo={deleteTodo}
					/>
				</div>
			</Container>
		</div>
	);
}

export default App;
