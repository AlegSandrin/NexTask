import { ITodo } from "@/types/TodoType";
import { createTodoController } from "./create_todo";
import { NextResponse } from "next/server";

export async function updateTodoController(todoData: ITodo, collectionID: string) {

    const validation = await createTodoController(todoData, collectionID);
    if(validation) return validation;

    if(!todoData._id){
        return NextResponse.json({
            message: "Error: Task ID is required."
        }, { status: 400 });
    }

    return false;
}