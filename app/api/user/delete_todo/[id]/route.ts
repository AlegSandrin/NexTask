import { userValidationController } from "@/app/api/apiUtils/controllers/user_validation";
import { connectUserDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

export async function POST( body: NextRequest, { params }: { params: { id: string } }) {
    const collectionID = params.id;
    const data = await body.json();

    if(!data.id){
        return NextResponse.json({
            message: "Error: Task ID is missing."
        }, { status: 400 });
    }

    const userValidation = await userValidationController(collectionID);
    if(userValidation) return userValidation;
    
    const res = await Todo(collectionID).deleteOne({ _id: data.id });
    await connectUserDB().close();

    if(res.deletedCount === 0){
        return NextResponse.json({
            message: "Error: Task not found."
        }, { status: 500 });
    }

    return NextResponse.json({message: "Task deleted!", ...res}, { status: 200 });
}