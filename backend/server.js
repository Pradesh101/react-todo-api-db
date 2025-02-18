const express = require("express");
const cors = require("cors");
// const corsOptions = {
//   origin: ["http://localhost:5173"],
// };
const bodyParser = require("body-parser");
//import dotenv from "dotenv";
const dotenv = require("dotenv");
const { connectDB } = require("./config/db.js");
const mongoose = require("mongoose");
const Todo = require("./models/todo.model.js");

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173",
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Get all todos
app.get("/api/todos", async (req, res) => {
  //res.json(todos);
  try {
    const todos = await Todo.find({});
    res.status(200).json({ success: true, data: todos });
  } catch (error) {
    console.error("Error fetching todos:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Add a new todo
app.post("/api/todos", async (req, res) => {
  //console.log(req.body);
  //const { task } = req.body;
  const todo = req.body;
  if (!todo.task) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide a todo" });
  }
  const newTodo = new Todo(todo);
  try {
    await newTodo.save();
    res.status(201).json({ success: true, data: newTodo });
  } catch (error) {
    console.error("Error saving todo:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
  // const newTodo = {
  //   id: Date.now(), // Unique ID for each todo
  //   task: task,
  // };
  // todos.push(newTodo);
  // res.status(201).json(newTodo);
  // console.log(todos);
});

app.put("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, todo, { new: true });
    if (!updatedTodo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }
    res.status(200).json({ success: true, data: updatedTodo });
  } catch (error) {
    console.error("Error updating todo:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Delete a todo by ID
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "Invalid ID" });
  }
  try {
    await Todo.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Todo deleted successfully" });
  } catch (error) {
    console.error("Error deleting todo:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  connectDB();
  console.log(`Server running at http://localhost:${port}`);
});
