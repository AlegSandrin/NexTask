import { NextRequest, NextResponse } from "next/server";
import { userValidationController } from "./user_validation";
import { ITodo } from "@/types/TodoType";

export async function createTodoController(todoData: ITodo, collectionID: string) {

    const userValidation = await userValidationController(collectionID);
    if(userValidation) return userValidation;

    if(!todoData){
        return NextResponse.json({
            message: "Error: Task data is required."
        }, { status: 400 });
    }
    
    return false;
}
