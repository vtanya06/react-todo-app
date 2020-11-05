import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

function AddTodo(props) {
	const [name, setName] = useState("");

	return (
		<Form>
			<Form.Group>
				<Form.Label>Add New Todo Below</Form.Label>
				<Form.Control
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</Form.Group>
			<Button
				variant="primary"
				type="button"
				onClick={() => {
					props.addTodo(name);
					setName("");
				}}
			>
				Add
			</Button>
		</Form>
	);
}

export default AddTodo;
