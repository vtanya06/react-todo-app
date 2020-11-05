import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "../App.css";

function Todos(props) {
	let listItems = props.todos.map((todo) => (
		<ListGroup.Item key={todo._id}>
			<Container>
				<Row>
					<Col sm={8}>
						<p className={`${todo.done ? "strike" : ""}`}>
							{todo.name}
						</p>
					</Col>
					<Col sm={4}>
						{!todo.done && (
							<Button
								variant="outline-primary"
								type="button"
								onClick={() => props.markAsDone(todo._id)}
							>
								Mark as done
							</Button>
						)}
						<Button
							className="ml-20"
							variant="outline-danger"
							type="button"
							onClick={() => props.deleteTodo(todo._id)}
						>
							Delete
						</Button>
					</Col>
				</Row>
			</Container>
		</ListGroup.Item>
	));

	return <ListGroup>{listItems}</ListGroup>;
}

export default Todos;
