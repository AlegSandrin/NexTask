'use client';

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbLogout2 } from "react-icons/tb";
import NexTaskLogo from "../public/NexTask-logo.png";

export const Navbar = () => {

    const { status, data: session } = useSession();
    const userImage = session?.user?.image;

    return (
        <nav className="p-2 max-h-24 flex justify-between items-center shadow-md bg-app-palette-100 text-app-palette-200">
            <Link href={"/home"}>
                <Image 
                src={NexTaskLogo} 
                alt="Logo NexTask"
                className="h-[5.5rem] w-[5.5rem]"
                /> 
            </Link>
            {
                status === 'authenticated' ? (
                    <span className="flex items-center gap-4">
                        { userImage && 
                            <Image 
                            src={userImage} 
                            alt="Foto de perfil do usuário" 
                            width={50} height={50}
                            className="rounded-full"
                            /> 
                        }
                        <button 
                        onClick={() => signOut()}
                        className="bg-app-palette-400 text-app-palette-200 font-medium p-2 pr-[10px] flex gap-1 rounded-full"
                        >
                        <span>Sair</span>
                        <TbLogout2 className="text-2xl"/>
                        </button>
                    </span>
                ) :
                status === 'loading' ? (
                    <AiOutlineLoading3Quarters className="animate-spin text-xl text-app-palette-500"/>
                ) : 
                (
                    <button 
                    onClick={() => signIn()}
                    className="bg-app-palette-300 text-app-palette-100 font-medium px-6 py-2 rounded-md"
                    >Conectar
                    </button>
                )
            }
        </nav>
    )
}