import { createTodoController } from "@/app/api/apiUtils/controllers/create_todo";
import { userValidationController } from "@/app/api/apiUtils/controllers/user_validation";
import { connectAuthDB, connectUserDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import User from "@/models/user";
import { isObjectIdOrHexString } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const todoData = await req.json();
    const collectionID = params.id;

    const todoValidation = await createTodoController(todoData, collectionID);
    if(todoValidation) return todoValidation;
    
    const todoRes = await Todo(collectionID).insertMany(todoData);
    await connectUserDB().close();

    if(!todoRes || todoRes.length === 0){
        return NextResponse.json({
            message: "Error: Task not created."
        }, { status: 500 });
    }

    return NextResponse.json({
        message: "Task created!",
        data: {...todoRes}
    }, { status: 201 });
}