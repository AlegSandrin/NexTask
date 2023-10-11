import mongoose, { Schema, models } from "mongoose";

// Schema para coleção de "To do's" de cada usuário
const todoSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false
        },
        category: {
            type: String,
            required: false
        },
        priority: {
            type: String,
            required: false
        },
        completed: {
            type: Boolean,
            required: false
        }
    },
    { timestamps: true }
);

const Todo = models.Todo || mongoose.model("Todo", todoSchema);

export default Todo;