import { userValidationController } from "@/app/api/apiUtils/controllers/user_validation";
import { connectUserDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

export async function GET( _: NextRequest, { params }: { params: { id: string } }) {
    const collectionID = params.id;

    const userValidation = await userValidationController(collectionID);
    if(userValidation) return userValidation;
    
    const todos = await Todo(collectionID).find({});
    await connectUserDB().close();

    if(!todos){
        return NextResponse.json({
            message: "Error: Tasks not found."
        }, { status: 500 });
    }

    return NextResponse.json(todos, { status: 200 });
}