require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
	addTodo,
	getTodos,
	getTodo,
	updateTodo,
	deleteTodo,
} = require("./controllers/todo");

const app = express();

var whitelist = ["http://localhost:3000"];
var corsOptions = {
	origin: function (origin, callback) {
		if (origin === undefined || whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());

app.post("/api/todos", async (req, res, next) => {
	let { name, done } = req.body;

	try {
		let addedTodo = await addTodo({ name, done });

		res.json(addedTodo);
	} catch (error) {
		console.error(error);
		res.status(400).json({
			status: false,
		});
	}
});

app.get("/api/todos", async (req, res, next) => {
	try {
		let allTodos = await getTodos();
		res.json(allTodos);
	} catch (error) {
		console.error(error);
		res.status(404).json({
			status: false,
		});
	}
});

app.get("/api/todos/:id", async (req, res, next) => {
	let id = req.params.id;

	try {
		let todo = await getTodo(id);
		res.json(todo);
	} catch (error) {
		console.error(error);
		res.status(404).json({
			status: false,
		});
	}
});

app.put("/api/todos/:id", async (req, res, next) => {
	let id = req.params.id;

	let { name, done } = req.body;

	let options = {};

	if (typeof name !== "undefined") {
		options.name = name;
	}

	if (typeof done !== "undefined") {
		options.done = done;
	}

	try {
		let updatedTodo = await updateTodo(id, options);
		res.json(updatedTodo);
	} catch (error) {
		console.error(error);
		res.status(404).json({
			status: false,
		});
	}
});

app.delete("/api/todos/:id", async (req, res, next) => {
	let id = req.params.id;

	try {
		let deletedTodo = await deleteTodo(id);
		res.json(deletedTodo);
	} catch (error) {
		console.error(error);
		res.status(404).json({
			status: false,
		});
	}
});

const port = process.env.PORT;

app.listen(port, () => `Server running on port ${port}`);
