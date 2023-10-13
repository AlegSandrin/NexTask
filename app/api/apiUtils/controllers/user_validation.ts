import { connectAuthDB } from "@/lib/mongodb";
import User from "@/models/user";
import { isObjectIdOrHexString } from "mongoose";
import { NextResponse } from "next/server";

export async function userValidationController(collectionID: string) {
    if(!collectionID){
        return NextResponse.json({
            message: "Error: User ID is required."
        }, { status: 400 });
    }

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

    return false;
}