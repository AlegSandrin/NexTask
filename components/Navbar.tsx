'use client';

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { TbLogout2 } from "react-icons/tb";
import NexTaskLogo from "../public/NexTask-logo.png";
import { CircularProgress } from "@mui/material";

export const Navbar = () => {

    const { status, data: session } = useSession();
    const userName = session?.user?.name;
    const userImage = session?.user?.image;

    if(status !== "authenticated" ) return <></>;

    return (
        <nav className="p-2 -md:p-1 max-h-24 flex justify-between items-center shadow-md bg-app-palette-100 text-app-palette-200">
            <Link href={"/home"}>
                <Image 
                src={NexTaskLogo} 
                alt="Logo NexTask"
                className="md:h-[5.5rem] md:w-[5.5rem] h-[4.5rem] w-[4.5rem]"
                /> 
            </Link>
            {
                status === 'authenticated' ? (
                    <span className="flex items-center gap-2 -sm:max-w-[70%] max-w-[350px]">
                        { userName && 
                            <span className="-sm:max-w-[45%] w-full text-end">
                                <label className="font-medium break-words -sm:text-xs">{userName}</label>
                            </span>
                        }
                        { userImage && 
                            <Image 
                            src={userImage} 
                            alt="Foto de perfil do usuário"
                            width={50} height={50}
                            className="rounded-full h-[50px] w-[50px] -sm:h-[35px] -sm:w-[35px]"
                            /> 
                        }
                        <button 
                        onClick={() => signOut()}
                        className="bg-app-palette-400 text-app-palette-200 font-medium ml-1 p-2 pr-[10px] -sm:p-1 -sm:pr-[5px] flex items-center gap-1 rounded-full"
                        >
                        <span className="text-sm -sm:text-xs">Sair</span>
                        <TbLogout2 className="text-lg -sm:text-base"/>
                        </button>
                    </span>
                ) :
                status === 'loading' ? (
                    // <AiOutlineLoading3Quarters className="animate-spin text-xl text-app-palette-500"/>
                    <CircularProgress style={{ color: "rgb(227 208 129)" }}/>
                ) 
                : <></> 
            }
        </nav>
    )
}