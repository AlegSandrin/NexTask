'use client';

import { Loading } from "@/components/Loading";
import { SignInButton } from "@/components/SignInButton"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Banner from "../../public/NexTask-banner.png";

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
    <main className="flex flex-col justify-center items-center">
      <Image src={Banner} alt="Banner NexTask" className="object-cover"/>
      <SignInButton/>
    </main>
  )
}

export default Login;