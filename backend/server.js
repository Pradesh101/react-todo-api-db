const express = require("express");
const cors = require("cors");
const corsOptions = {
  origin: ["http://localhost:5173"],
};
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// In-memory array to store todos
const todos = [];

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  //console.log(req.body);
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "todo is required" });
  }
  const newTodo = {
    id: Date.now(), // Unique ID for each todo
    task: task,
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
  console.log(todos);
});

app.put("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  const todo = todos.find((t) => t.id === Number(id));
  if (todo) {
    todo.task = task || todo.task;
    res.json(todo);
  } else {
    console.log(`Todo with id ${id} not found`);
    res.status(404).json({ error: "Todo not found" });
  }
});

// Delete a todo by ID
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  const index = todos.findIndex((todo) => todo.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }
  todos.splice(index, 1);
  res.status(204).end();
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
