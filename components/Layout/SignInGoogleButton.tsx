'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import GoogleIcon from '../../public/google-icon-edit.png';

export const SignInGoogleButton = () => {
    return (
        <button 
        onClick={() => signIn("google", undefined, { prompt: "login"})}
        className="flex items-center shadow-lg rounded-lg gap-2 group hover:scale-105 transition-transform"
        >
            <Image src={GoogleIcon} alt="Google" className="h-12 ml-2 w-auto object-contain"/>
            <span className='font-bold py-4 group-bg-app-palette-500 w-full
            bg-app-palette-500 group-hover:bg-app-palette-400 group-hover:text-app-palette-200 transition-colors'>
                Entrar com conta Google
            </span>
        </button>
    )
}