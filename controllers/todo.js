const Todo = require("../models/todo");

async function addTodo({ name, done }) {
	let newTodo = new Todo({
		name: name,
		done: done || false,
	});

	try {
		let addedTodo = await newTodo.save();
		return {
			status: true,
			data: addedTodo,
		};
	} catch (error) {
		console.error(error);
		return {
			status: false,
		};
	}
}

async function getTodos() {
	try {
		let allTodos = await Todo.find({});
		return {
			status: true,
			data: allTodos,
		};
	} catch (error) {
		console.error(error);
		return {
			status: false,
		};
	}
}

async function getTodo(id) {
	try {
		let todo = await Todo.findById(id).exec();
		return {
			status: true,
			data: todo,
		};
	} catch (error) {
		console.error(error);
		return {
			status: false,
		};
	}
}

async function updateTodo(id, options) {
	try {
		let todo = await Todo.updateOne({ _id: id }, options);
		return {
			status: true,
			data: todo,
		};
	} catch (error) {
		console.error(error);
		return {
			status: false,
		};
	}
}

async function deleteTodo(id) {
	try {
		let todo = await Todo.deleteOne({ _id: id });
		return {
			status: true,
			data: todo,
		};
	} catch (error) {
		console.error(error);
		return {
			status: false,
		};
	}
}

module.exports.addTodo = addTodo;
module.exports.getTodos = getTodos;
module.exports.getTodo = getTodo;
module.exports.updateTodo = updateTodo;
module.exports.deleteTodo = deleteTodo;
