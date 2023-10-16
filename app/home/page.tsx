/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { Loading } from "@/components/Loading";
import { FaHandSparkles } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AddTodoForm } from "@/components/AddTodoForm";
import { Collapse } from "@mui/material";
import CustomButton from "@/components/CustomButton";
import { MdAddTask } from "react-icons/md";
import { TodoList } from "@/components/TodoList";
import { useNoSigInSession } from "@/hooks/states";

export default function Home() {

  const { data: session, status } = useSession();
  const username = useNoSigInSession().username;
  const router = useRouter();
  const name = username ? username : session?.user?.name;
  const shortName = name?.split(' ')[0];
  const [ addTodo, openAddTodo ] = useState(false);

  function helloMessage() {
    var today = new Date();
    var curHr = today.getHours();

    if (curHr < 12) { return "Bom dia" } 
    else if (curHr < 18) { return "Boa tarde" } 
    else { return "Boa noite" }
  }

  useEffect(() => {
    if (!session && !username) {
      // Se o usuário não estiver logado, redireciona para página de login
      router.push('/login');
    }
    return () => {};
  },[session])

  if (!username && status === 'loading') return <Loading/>
  
  if(session || username)
  return (
    <main className="flex -md:flex-col md:flex-row-reverse md:overflow-hidden w-full h-full -md:px-1 -md:py-2 md:border-2 md:border-app-palette-100 md:border-opacity-50">

      <div className="flex max-w-full lg:min-w-[400px] flex-col gap-3 py-2 md:p-2 md:overflow-y-auto
      md:border-l-2 md:border-app-palette-100 md:border-opacity-50"
      >
        <header className="flex flex-col justify-center items-center leading-3 tracking-tighter">
          <span className="-sm:text-2xl text-4xl font-semibold tracking-tighter">
            {helloMessage()} {' '}
            <label className="font-bold -sm:text-[1.7rem] text-[2rem] underline">
              {shortName}
            </label>! 
          </span>
          <span className="flex flex-grow break-words text-center justify-center items-center gap-2 -sm:text-xl text-3xl font-semibold">
            como vão as coisas?
          </span>
          <FaHandSparkles className="-sm:text-4xl text-5xl lg:text-6xl text-app-palette-400 rotate-12 animate-glow"/>
        </header>

        <div className="flex justify-center items-center">
          <CustomButton 
          Text="Adicionar tarefa" 
          onClick={() => openAddTodo(!addTodo)}
          className="bg-app-palette-500 text-app-palette-100 font-semibold w-fit -sm:text-sm"
          Icon={MdAddTask}
          IconStyle="text-2xl -sm:text-xl text-app-palette-400"
          />
        </div>
        <Collapse in={addTodo}>
          <AddTodoForm/>
        </Collapse>
      </div>

      <div className="w-full h-full md:overflow-y-auto">
        <TodoList/>
      </div>

    </main>
  )
}
