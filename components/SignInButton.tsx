'use client';

import { useNoSigInSession } from '@/hooks/states';
import { Collapse, TextField } from '@mui/material';
import { useState } from 'react';
import { FaUserClock } from 'react-icons/fa';
import CustomButton from './CustomButton';
import { BiUserCheck } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

export const SignInButton = () => {

    const [ username, setUsername ] = useState(localStorage.getItem('user') || '');
    const { setUsernameSession } = useNoSigInSession();
    const [ openInput, setOpenInput ] = useState(false);

    const router = useRouter();

    function signInLocal(){
        router.push('/home');
        localStorage.setItem('user', username);
        setUsernameSession(username);
    }

    return <div className='flex flex-col'>
        <button 
        onClick={() => setOpenInput(!openInput)}
        className="flex items-center shadow-lg rounded-lg gap-2 group hover:scale-105 transition-transform"
        >
            <FaUserClock className="text-4xl ml-5 mr-1 text-app-palette-100"/>
            <span className='font-bold py-4 group-bg-app-palette-500 w-full
            text-app-palette-200 bg-app-palette-100 group-hover:bg-app-palette-400 transition-colors'>
                Entar sem cadastrar
            </span>
        </button>
        <Collapse sx={{ marginY: '10px'}} in={openInput}>
            <TextField
            autoFocus
            margin="dense"
            variant="outlined"
            type="search"
            fullWidth
            label="Forneça um nome de usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
            />
            {  
                username.length > 20 || username.length < 3 ?
                <span className='float-left ml-1 py-1 text-app-palette-400'>
                    O nome de usuário precisa ter entre 3 e 20 caracteres
                </span>
                : null
            }
            <CustomButton
            onClick={() => signInLocal()}
            disabled={username.length < 3 || username.length > 20 ? true : false}
            Text="Entrar"
            className="float-right bg-app-palette-100 text-app-palette-200 font-semibold -sm:text-sm -sm:px-[8px] -sm:py-[6px]"
            Icon={BiUserCheck}
            IconStyle="-sm:text-lg text-2xl text-app-palette-200"
            />
        </Collapse>
    </div>
}