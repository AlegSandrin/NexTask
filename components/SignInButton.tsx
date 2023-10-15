'use client';

import { FaUserClock } from 'react-icons/fa';

export const SignInButton = () => {
    return (
        <button 
        onClick={() => {}}
        className="flex items-center shadow-xl rounded-lg gap-2 group hover:scale-105 transition-transform"
        >
            <FaUserClock className="text-4xl ml-5 mr-1 text-app-palette-100"/>
            <span className='font-bold py-4 group-bg-app-palette-500 w-full
            text-app-palette-200  bg-app-palette-100 group-hover:bg-app-palette-400 transition-colors'>
                Entar sem cadastrar
            </span>
        </button>
    )
}