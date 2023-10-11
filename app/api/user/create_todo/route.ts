import { connectUserDB } from "@/lib/mongodb";
import Todo from "@/models/todo";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const todoData = await req.json();
    await connectUserDB();
    const todo = await Todo.db.collection(todoData.id).insertMany(todoData);

    return NextResponse.json({
        message: "Task created!",
        todo
    }, { status: 201 });
}