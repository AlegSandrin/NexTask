import mongoose from "mongoose"

export const connectAuthDB = () => {
    // try {
    //     await mongoose.connect(process.env.MONGODB_USERS_AUTH_URL as string);
    // } catch (error) {
    //     console.error("Erro ao conectar ao MongoDB", error);
    // }
    return mongoose.createConnection(process.env.MONGODB_USERS_AUTH_URL as string);
};

export const connectUserDB = () => {
    // try {
    //     await mongoose.connect(process.env.MONGODB_USERS_DB_URL as string);
    // } catch (error) {
    //     console.error("Erro ao conectar ao MongoDB", error);
    // }
    return mongoose.createConnection(process.env.MONGODB_USERS_DB_URL as string);
};