import mongoose, { Schema, models } from "mongoose";

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
    { timestamps: true }
);

const User = models.User || mongoose.model("User", userSchema);

export default User;