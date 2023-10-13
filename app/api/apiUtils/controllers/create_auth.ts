import { NextRequest, NextResponse } from "next/server";

export async function createAuthController(reqData: { email: string, name: string }) {

    if(!reqData.email || !reqData.name){
        return NextResponse.json({
            message: "Error: User data is missing."
        }, { status: 400 });
    }

    return false
}