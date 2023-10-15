import { connectUserDB } from "@/lib/mongodb";
import mongoose, { Schema, models } from "mongoose";

// Schema para coleção de "To do's" de cada usuário
function Todo (id: string) {
    const todoSchema = new Schema(
        {
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true
            },
            category: {
                type: String,
                required: true
            },
            priority: {
                type: String,
                required: true
            },
            conclusion_date: {
                type: String,
                required: false,
            },
            progress: {
                type: Number,
                required: true
            },
            completed: {
                type: Boolean,
                required: true,
            },
            completedAt: {
                type: String,
                required: false,
            },
        },
        { timestamps: true, collection: id }
    );
    
    const todoModel = connectUserDB().model("Todo", todoSchema);
    return todoModel;
}

export default Todo;