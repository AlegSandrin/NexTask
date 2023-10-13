import { connectAuthDB } from "@/lib/mongodb";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { createAuthController } from "../../apiUtils/controllers/create_auth";

export async function POST(req: NextRequest) {
    const reqData = await req.json();
    const validUserData = await createAuthController(reqData);
    if(validUserData) return validUserData;

    const { email, name } = reqData;
    const userRes = await User.create({ name, email});
    
    return NextResponse.json({
        message: "User Registered!",
        id: userRes?._id,
        data: { email, name }
    }, { status: 201 });
}