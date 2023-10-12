import { connectAuthDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { email, name } = await req.json();
    const userRes = await User.create({ name, email});
    
    return NextResponse.json({
        message: "User Registered!",
        id: userRes?._id,
        data: { email, name }
    }, { status: 201 });
}