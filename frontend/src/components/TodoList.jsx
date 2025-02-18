import React, { useState, useEffect } from "react";
import Form from "./Form";
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import axios from "axios";
uuidv4();

const TodoList = () => {
  const API_URL = "http://localhost:3000/api/todos";

  const [todoValue, setTodo] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  async function fetchTodos() {
    try {
      const response = await axios.get(API_URL);
      console.log("Fetched todos:", response.data);
      setTodo(response.data.data); // Remove the extra array brackets
      console.log("My Todo", todoValue);
      console.log("My todo length", todoValue.length);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }

  const createTodo = async (todo) => {
    //console.log(todo);

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: todo }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      fetchTodos();
    }
  };

  const updateTodo = async (id, updatedTask) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        task: updatedTask,
      });

      console.log(`Response status: ${response.status}`);
      console.log("Updated todo:", response.data);

      await fetchTodos();
    } catch (error) {
      console.error(
        "Error updating todo:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container bg-gray-700 mt-20 p-8 rounded-md w-[550px] ">
      <div className="text-white mb-5 text-3xl flex justify-center items-center">
        Todo App
      </div>
      <Form createTodo={createTodo} />
      {/* {todoValue.map((todo) => (
        <Todo
          id={todo.id}
          key={todo.id}
          task={todo.task}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))} */}
      {todoValue.length > 0 ? (
        todoValue.map((todo) => (
          <Todo
            key={todo.id || todo._id}
            _id={todo.id || todo._id}
            task={todo.task}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))
      ) : (
        <p className="text-white">No todos available</p>
      )}
    </div>
  );
};

export default TodoList;
