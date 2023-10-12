import { connectAuthDB } from "@/lib/mongodb";
import { Schema } from "mongoose";

// Schema para coleção de autenticação dos usuários "users_auth"
const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true
        },
    },
    { timestamps: true, _id: true, collection: "users" }
);

const User = connectAuthDB().model("User", userSchema);

export default User;