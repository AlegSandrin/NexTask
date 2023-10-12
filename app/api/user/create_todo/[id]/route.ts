import { connectAuthDB, connectUserDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import User from "@/models/user";
import { isObjectIdOrHexString } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
    const todoData = await req.json();
    const collectionID = params.id;

    if(!isObjectIdOrHexString(collectionID)){
        return NextResponse.json({
            message: "Error: Invalid user ID."
        }, { status: 404 });
    }

    const userExist = await User.findOne({ _id: collectionID }).exec();
    await connectAuthDB().close();

    if(!userExist){
        return NextResponse.json({
            message: "Error: User not found."
        }, { status: 404 });
    }

    if(!todoData){
        return NextResponse.json({
            message: "TError: ask data is required."
        }, { status: 400 });
    }

    if(!collectionID){
        return NextResponse.json({
            message: "Error: User ID is required."
        }, { status: 400 });
    }
    
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