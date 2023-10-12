'use client';

import { Loading } from "@/components/Loading";
import { SignInButton } from "@/components/SignInButton"
import { Button } from "@mui/material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Login = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      // Se o usuário estiver logado, redireciona para página home
      router.push('/home');
    }
    return () => {};
  },[session])  
  if (status === 'loading') return <Loading/> 
  if(!session)
  return (
    <div>
      <SignInButton/>
    </div>
  )
}

export default Login;