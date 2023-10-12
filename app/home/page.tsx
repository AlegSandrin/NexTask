'use client';

import { Loading } from "@/components/Loading";
import { FaHandSparkles } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AddTodoForm } from "@/components/AddTodoForm";

export default function Home() {

  const { data: session, status } = useSession();
  const router = useRouter();
  const name = session?.user?.name;
  const shortName = name?.split(' ')[0];

  function helloMessage() {
    var today = new Date()
    var curHr = today.getHours()

    if (curHr < 12) {
      return "Bom dia";
    } else if (curHr < 18) {
      return "Boa tarde";
    } else {
      return "Boa noite";
    }
  }

  useEffect(() => {
    if (!session) {
      // Se o usuário não estiver logado, redireciona para página de login
      router.push('/login');
    }

    return () => {};
  },[])

  if (status === 'loading') return <Loading/>
  
  if (session)
  return (
    <main className="flex justify-center items-center h-full px-1 py-2">
      <div className="border border-app-palette-100 rounded-md h-full w-full flex flex-col">
        <header className="flex flex-col justify-center items-center leading-3">
          <span className="text-3xl font-semibold">{helloMessage()} <label className="font-bold text-[2rem] underline ">{shortName}</label>! </span>
          <span className="flex items-center gap-2 text-2xl font-semibold">
            como vão as coisas? 
            <FaHandSparkles className="text-5xl text-app-palette-400 rotate-12 animate-glow"/>
          </span>
        </header>

        <AddTodoForm/>

      </div>
    </main>
  )
}
