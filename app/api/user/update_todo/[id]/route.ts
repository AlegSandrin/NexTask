import { connectUserDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";
import { updateTodoController } from "@/app/api/apiUtils/controllers/update_todo";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
    const todoData = await req.json();
    const todoID = todoData._id;
    const collectionID = params.id;

    const todoValidation = await updateTodoController(todoData, collectionID);
    if(todoValidation) return todoValidation;
    
    const todoRes = await Todo(collectionID).updateOne({_id: todoID}, todoData);
    await connectUserDB().close();

    if(todoRes.modifiedCount === 0){
        return NextResponse.json({
            message: "Error: Task not updated."
        }, { status: 500 });
    }

    return NextResponse.json({
        message: "Task updated!",
        data: {...todoRes}
    }, { status: 201 });
}
