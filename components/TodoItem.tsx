import { ITodo } from "@/types/TodoType"
import { Box, Collapse, List, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";
import { BsCheck2Circle, BsCircleFill, BsExclamationCircleFill, BsCheckSquareFill, BsSquare } from "react-icons/bs";
import { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { useAlertController, useDialogController } from "@/hooks/states";
import { useGetTodos } from "@/hooks/apiRequest";
import { useSession } from "next-auth/react";
import { dateFormatter } from "@/lib/date";
import { BorderLinearProgress, changeCompleted, deleteTodo, editTodo } from "@/lib/todoItem";

export type ITodoItem = {
    todo: ITodo;
    todoIndex: number;
    late?: boolean;
    task?: boolean;
}

export const TodoItem = ( { todo, todoIndex, late, task }: ITodoItem ) => {

    const [ details, openDetails ] = useState(false);
    const { refetch } = useGetTodos();
    const setAlertProps = useAlertController().setAlertProps;
    const setDialogProps = useDialogController().setDialogProps;
    const { data: session, status } = useSession();
    const userData: any = session?.user;
    const userID = userData ? userData?.id : "";
    const generalProps = {
        userID,
        todoData: todo,
        localData: status === "authenticated" ? false : true,
        refetch,
        setAlertProps,
        setDialogProps
    }

    const deleteTask = (todoIndex: number) => deleteTodo({...generalProps, todoIndex});
    const editTask = () => editTodo(generalProps);
    const changeCompletedTask = (todoIndex: number) => changeCompleted({...generalProps, todoIndex});
    
    return <div className="flex flex-col border border-[rgba(227, 227, 227, 0.8)] drop-shadow-md">
        <ListItemButton
        sx={{ width: '100%' }}
        >
            <div className="flex w-full justify-between">
                <span
                className="flex flex-grow items-center"
                onClick={() => openDetails(!details)}
                >
                    <ListItemAvatar sx={{ minWidth: '40px'}}>
                        {
                            late ? (
                                <BsCircleFill className="text-2xl text-gray-500"/>
                            ) :
                            todo.completed === true ? (
                                <BsCheck2Circle className="text-3xl text-app-palette-300"/>
                            ) :
                            todo.priority === "Urgente" ? (
                                <BsExclamationCircleFill className="text-2xl text-red-500 animate-saturate"/>
                            ) :
                            todo.priority === "Alta" ? (
                                <BsCircleFill className="text-2xl text-red-400"/>
                            ) :
                            todo.priority === "Média" ? (
                                <BsCircleFill className="text-2xl text-orange-400"/>
                            ) :
                            // todo.priority === "Baixa"
                            (
                                <BsCircleFill className="text-2xl text-blue-400"/>
                            )
                        }
                    </ListItemAvatar>
                    <ListItemText
                    primary={(
                        <span className="flex flex-col">
                            {
                                !task &&
                                    <div className="flex flex-col border border-app-palette-100 border-opacity-50 rounded-lg w-fit 
                                    -sm:px-1 -sm:py-[1px] -md:px-2 -md:py-1 md:p-1 mb-1 text-sm -md:text-sm -sm:text-[0.6rem] 
                                    font-semibold text-app-palette-100">
                                        {
                                            todo?.conclusion_date &&
                                            <label className="-sm:leading-3 leading-4">
                                                {todo?.completedAt && todo.completed && "Previsão: "} {dateFormatter(new Date(todo?.conclusion_date))}
                                            </label>
                                        }
                                        {
                                            todo?.completedAt && todo.completed &&
                                            <label className="-sm:leading-3 leading-4">
                                                {"Conclusão: "} {dateFormatter(new Date(todo.completedAt))}
                                            </label>
                                        }
                                    </div>
                            }
                            <label className="text-base -md:text-sm">{todo.title}</label>
                        </span>
                    )}
                    secondary={(
                        <label className="break-all opacity-80 mr-2">{todo.category}</label>
                    )}
                    />
                </span>

                <span className="flex items-center gap-[6px] sm:gap-2 md:gap-3">
                    {
                        todo.completed ?
                        <BsCheckSquareFill
                        className="text-4xl -xs:text-3xl mr-1 text-app-palette-300 hover:scale-110 hover:brightness-[0.8] transition"
                        onClick={() => changeCompletedTask(todoIndex)} 
                        />
                        :
                        <BsSquare
                        className="text-4xl -xs:text-3xl mr-1 text-app-palette-300 hover:scale-110 hover:bg-gray-300 rounded-sm transition"
                        onClick={() => changeCompletedTask(todoIndex)} 
                        />
                    }
                    <button
                    className="bg-[#e7e7e7] h-min -xs:p-[6px] -sm:p-1 p-2 rounded-full hover:scale-105 hover:opacity-80 transition-opacity"
                    >
                        <MdModeEditOutline 
                        className="text-2xl -xs:text-xl text-app-palette-100"
                        onClick={() => editTask()}
                        />
                    </button>
                    <button
                    className="bg-[#e7e7e7] h-min -xs:p-[6px] -sm:p-1 p-2 rounded-full hover:scale-105 hover:opacity-80 transition-opacity"
                    >
                        <AiFillDelete
                        className="text-2xl -xs:text-xl text-app-palette-400"
                        onClick={() => deleteTask(todoIndex)} 
                        />
                    </button>
                </span>
            </div>
        </ListItemButton>
        <Collapse 
        in={details} 
        timeout="auto" 
        unmountOnExit 
        sx={{ width: '100%' }}
        >
            <List component="div" sx={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingX: '5px' }}>
                <Box sx={{ flexGrow: 1}}>
                    <span className="flex justify-between">
                        <label>Progresso:</label>
                        {
                            todo.completed === true ? (
                                <FaTrophy className="text-3xl text-[#ccb14b]"/>
                            ) :
                            <label>{todo.completed ? 100 : todo.progress}%</label>
                        }
                    </span>
                    <BorderLinearProgress 
                    sx={{marginY: '5px'}}
                    value={todo.completed ? 100 : todo.progress}
                    variant="determinate"
                    />
                </Box>
                <TextField
                fullWidth
                variant="standard"
                label="Descrição"
                aria-readonly
                value={todo.description}
                multiline
                />
                <span className="flex flex-col leading-3">
                    <label className="text-xs italic opacity-60 mt-1 leading-3">
                        Data de criação: <strong>{dateFormatter(new Date(todo.createdAt))}</strong>
                    </label>
                    {
                        todo.createdAt !== todo.updatedAt &&
                        <label className="text-xs italic opacity-60 mt-1 leading-3">
                            Última modificação: <strong>{dateFormatter(new Date(todo.updatedAt))}</strong>
                        </label>
                    }
                    <label className="text-xs italic opacity-60 mt-1 leading-3">ID da tarefa: {todo._id}</label>
                </span>
            </List>
        </Collapse>
    </div>
    
}