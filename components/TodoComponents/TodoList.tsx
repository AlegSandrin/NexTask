/* eslint-disable react-hooks/exhaustive-deps */
import { ITodo } from "@/types/TodoType";
import { TodoItem } from "./TodoItem";
import { useGetTodos } from "@/hooks/apiRequest";
import { BsCheck2Circle, BsCircleFill, BsExclamationCircleFill, BsFillExclamationCircleFill } from "react-icons/bs";
import { BiSolidFlagAlt } from "react-icons/bi";
import { RiVipCrown2Fill } from "react-icons/ri";
import { useEffect, useState } from "react";
import { organizeData } from "@/lib/todoList";
import { SkeletonLoading } from "../Layout/SkeletonLoading";
import { useSession } from "next-auth/react";
import { useNoSigInSession } from "@/hooks/states";

export const TodoList = () => {

    const { data, isLoading } = useGetTodos();
    const { status } = useSession();
    const { localData } = useNoSigInSession();
    const [ dataList, setDataList ] = useState<{ [group: string]: ITodo[] }>({
        tasks: [],
        today: [],
        pending: [],
        late: [],
        completed: []
    });

    useEffect(() => {
        // Observa sempre que a variavel "data" sofrer modificações 
        // OBS: Serve para atualizar os dados da lista a cada "refetch"
        const organizedData = organizeData(status === "authenticated" ? data : localData);
        setDataList(organizedData);
    },[data, localData]);

    if(isLoading) return <div className="max-h-[95vh] overflow-hidden"><SkeletonLoading/></div>

    if( status === "authenticated" && data?.length === 0 ) 
        return <h1 data-testid="loading" className="font-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center self-center my-3">Nenhuma tarefa registrada... 😴</h1>
    else if( status === "unauthenticated" && (localData?.length === 0 || !localData)) 
        return <h1 data-testid="loading" className="font-medium text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center self-center my-3">Nenhuma tarefa registrada... 😴</h1>

    return <>
        <div className="flex flex-col flex-grow h-max justify-center items-center -md:mt-2 md:px-1 md:pb-2">
            <div className="flex flex-col p-1">
                <label className="flex font-medium items-center text-[#5e5e5e] italic -sm:text-xs text-sm lg:text-base">
                    <BiSolidFlagAlt/> Prioridades:
                </label>
                <span className="flex flex-wrap justify-center items-center -md:text-xs text-sm lg:text-base gap-2 md:gap-3 text-[#5e5e5e]">
                    <span className="flex items-center"><BsCircleFill className="font-semibold text-blue-400"/> <label>:Baixa</label></span>
                    <span className="flex items-center"><BsCircleFill className="font-semibold text-orange-400"/> <label>:Média</label></span>
                    <span className="flex items-center"><BsCircleFill className="font-semibold text-red-400"/> <label>:Alta</label></span>
                    <span className="flex items-center"><BsExclamationCircleFill className="font-semibold text-red-500 animate-saturate"/> <label>:Urgente</label></span>
                    <span className="flex items-center"><BsCircleFill className="font-semibold text-gray-500"/> <label>:Em atraso</label></span>
                    <span className="flex items-center"><BsCheck2Circle className="font-semibold text-app-palette-300 -md:text-[.95rem] text-[1.15rem]"/> <label>:Concluída</label></span>
                </span>
            </div>
                
            <div className="flex flex-col h-full overflow-y w-full border border-[#c7c7c7] shadow-lg">
                {
                    dataList.tasks.length > 0 &&
                    <div className="flex flex-col h-full max-h-[300px] overflow-y-auto">
                        <span className="flex items-center -sm:text-2xl text-3xl gap-1 pl-1 pt-2 md:pt-3 pb-[2px] 
                        underline sticky top-0 bg-[#e8e8e8] border border-[#c7c7c7] z-30 opacity-80">
                            <label>Afazeres:</label>
                        </span>
                        {
                            dataList.tasks.map((todo: ITodo, index) => <TodoItem todo={todo} key={todo._id!} task/>)
                        }
                    </div>
                }
                {
                    dataList.today.length > 0 &&
                    <div className="flex flex-col h-full max-h-[300px] overflow-y-auto">
                        <span className="flex items-center -sm:text-2xl text-3xl gap-1 pl-1 pt-2 md:pt-3 pb-[2px] 
                        underline sticky top-0 bg-[#e8e8e8] border border-[#c7c7c7] z-30 opacity-80">
                            <BsFillExclamationCircleFill className="text-orange-400 animate-bounce -sm:text-2xl text-3xl"/>
                            <label>Para hoje!:</label>
                        </span>
                        {
                            dataList.today.map((todo: ITodo, index) => <TodoItem todo={todo} key={todo._id!} />)
                        }
                    </div>
                }

                {
                    dataList.pending.length > 0 &&
                    <div className="flex flex-col h-full max-h-[300px] overflow-y-auto">
                        <span className="flex items-center -sm:text-2xl text-3xl gap-1 pl-1 pt-2 md:pt-3 pb-[2px] 
                        underline sticky top-0 bg-[#e8e8e8] border border-[#c7c7c7] z-30 opacity-80">
                            <label>Pendentes:</label>
                        </span>
                        {
                            dataList.pending.map((todo: ITodo, index) => <TodoItem todo={todo} key={todo._id!} />)
                        }
                    </div>
                }

                {
                    dataList.late.length > 0 &&
                    <div className="flex flex-col h-full max-h-[300px] overflow-y-auto">
                        <span className="flex items-center -sm:text-2xl text-3xl gap-1 pl-1 pt-2 md:pt-3 pb-[2px] 
                        underline sticky top-0 bg-[#e8e8e8] border border-[#c7c7c7] z-30 opacity-80">
                            <label>Em atraso:</label>
                        </span>
                        {
                            dataList.late.map((todo: ITodo, index) => <TodoItem todo={todo} key={todo._id!} late/>)
                        }
                    </div>
                }

                {   
                    dataList.completed.length > 0 &&
                    <div className="flex flex-col h-full max-h-[300px] overflow-y-auto">
                        <span className="flex items-center -sm:text-2xl text-3xl gap-1 pl-1 pt-2 md:pt-3 pb-[2px] 
                        underline sticky top-0 bg-[#e8e8e8] border border-[#adadad] z-30 opacity-80"> 
                            <RiVipCrown2Fill className="text-app-palette-400 animate-crown -sm:text-3xl text-4xl"/>
                            <label>Completas:</label>
                        </span> 
                        {
                            dataList.completed.map((todo: ITodo, index) => <TodoItem todo={todo} key={todo._id!} />)
                        }
                    </div>
                }
            </div>
        </div>
    </>
}