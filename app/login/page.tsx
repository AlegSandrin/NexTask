/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Loading } from "@/components/Loading";
import { SignInGoogleButton } from "@/components/SignInGoogleButton"
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Banner from "../../public/NexTask-banner.png";
import { AiFillCrown } from "react-icons/ai";
import { SignInButton } from "@/components/SignInButton";

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
    <main className="h-full w-full pt-3 overflow-x-hidden">
      <div className="w-full h-full justify-center items-center flex-col">
        <Image src={Banner} alt="Banner NexTask" className="object-contain -md:max-h-[250px] max-h-[350px] animate-glow_saturate mx-auto"/>
        <div className="flex flex-col -md:w-[80%] max-w-[500px] gap-4 self-center mx-auto my-3 text-center p-2 pb-3 shadow-xl">
          <h2 className="text-2xl font-semibold leading-5">Seja bem-vindo(a) ao</h2>
          <h1 className="text-4xl font-bold leading-5 flex justify-center items-center my-3"> <label className="animate-logo text-[#54494B]">NexTask </label>
            <span className="flex text-app-palette-400 animate-bounce">
              🤩 <AiFillCrown className="absolute text-[2.9rem] -translate-y-10 translate-x-3 rotate-[20deg] opacity-90 animate-crown"/>
            </span>
          </h1>
          <span>
            <label className="text-lg font-medium">Seu app para gerenciar suas tarefas!</label>
            <br/>
            <label>Para começar, cadastre-se com sua conta do Google, ou experimente os serviços entrando sem cadastro</label>
          </span>
          <SignInGoogleButton/>
          <SignInButton/>
        </div>
      </div>
      
    </main>
  )
}

export default Login;