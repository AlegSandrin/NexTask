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

export default function Home() {

  const { data: session, status } = useSession();
  const router = useRouter();
  const name = session?.user?.name;
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
      <div className="rounded-md h-full w-full flex flex-col gap-2 py-2">

        <header className="flex flex-col justify-center items-center leading-3 tracking-tighter">
          <span className="-sm:text-3xl text-4xl font-semibold tracking-tighter">{helloMessage()} <label className="font-bold text-[2rem] underline ">{shortName}</label>! </span>
          <span className="flex items-center gap-2 -sm:text-2xl text-3xl font-semibold">
            como vão as coisas? 
            <FaHandSparkles className="text-5xl text-app-palette-400 rotate-12 animate-glow"/>
          </span>
        </header>

        <div className="flex justify-center items-center">
          <CustomButton 
          Text="Adicionar tarefa" 
          onClick={() => openAddTodo(!addTodo)}
          className="bg-app-palette-500 text-app-palette-100 font-semibold w-fit"
          Icon={MdAddTask}
          IconStyle="text-2xl text-app-palette-400"
          />
        </div>
        <Collapse in={addTodo}>
          <AddTodoForm/>
        </Collapse>

        <div className="flex justify-center items-center">
          <TodoList/>
        </div>

      </div>
    </main>
  )
}
