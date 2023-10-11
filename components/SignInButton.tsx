'use client';

import { signIn } from 'next-auth/react';

export const SignInButton = () => {
    return (
        <button 
        onClick={() => signIn("google")}
        className="flex items-center shadow-xl rounded-lg p-4 border border-black"
        >
            <span>
                Logar/Cadastrar com Google
            </span>
        </button>
    )
}