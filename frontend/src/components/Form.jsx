import React, { useState } from "react";

const Form = ({ createTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createTodo(value);
    setValue("");
  };
  return (
    <form
      className="mb-4 w-full flex items-center justify-between"
      onSubmit={handleSubmit}
    >
      <input
        required
        type="text"
        className="outline-none bg-transparent border border-grey-500 p-4 w-[350px] text-white mb-6 rounded placeholder: text-grey-300"
        placeholder="Enter your todo task"
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
      <button className="bg-gray-500 border-none p-4 text-white cursor-pointer rounded ml-2 mb-6">
        Add Task
      </button>
    </form>
  );
};

export default Form;
