import { connectAuthDB } from "@/lib/mongodb";
import User from "@/models/user";
import api from "@/services/api";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        // No callback da função de autenticação cria um novo usuário com o email da conta Google (caso ainda não exista)
        async signIn({ user, account }): Promise<any> {
            let { email, name } = user;

            if (account?.provider === "google") {
                try {
                    // Conecta ao MongoDB e faz uma busca verificando se existe um usuário com esse email
                    await connectAuthDB();
                    const userExists = await User.findOne({email});

                    if(!userExists) {
                        const response = await api.post("/user/create_auth", { email, name});

                        if(response.status === 201){
                            return user;
                        }
                    }
                } 
                catch (error) {
                    console.error(error);
                }
            }

            return user;
        },
        async session({session}) {

            const email = session.user?.email;
            await connectAuthDB();
            const userID = await User.findOne({email});
            
            return {
                ...session,
                user: {
                    ...session.user,
                    id: userID?._id
                }
            };
        }
    }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };