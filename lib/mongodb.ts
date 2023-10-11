import mongoose from "mongoose"

export const connectAuthDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_USERS_AUTH_URL as string);
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB", error);
    }
};

export const connectUserDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_USERS_DB_URL as string);
    } catch (error) {
        console.error("Erro ao conectar ao MongoDB", error);
    }
};