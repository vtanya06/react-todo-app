const mongoose = require("../bin/db");

const Todo = mongoose.model("todo", { name: String, done: Boolean });

module.exports = Todo;
