import mongoose from "mongoose"

// Conexão com o MongoDB

// Conexão com o banco de dados de autenticação dos usuários
export const connectAuthDB = () => {
    // try {
    //     await mongoose.connect(process.env.MONGODB_USERS_AUTH_URL as string);
    // } catch (error) {
    //     console.error("Erro ao conectar ao MongoDB", error);
    // }
    return mongoose.createConnection(process.env.MONGODB_USERS_AUTH_URL as string);
};

// Conexão com o banco de dados de tarefas dos usuários
export const connectUserDB = () => {
    // try {
    //     await mongoose.connect(process.env.MONGODB_USERS_DB_URL as string);
    // } catch (error) {
    //     console.error("Erro ao conectar ao MongoDB", error);
    // }
    return mongoose.createConnection(process.env.MONGODB_USERS_DB_URL as string);
};