import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    task: { type: String, required: true },
  },
  { timestamps: true } //createdAt and updatedAt fields will be automatically added to the schema
);

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
