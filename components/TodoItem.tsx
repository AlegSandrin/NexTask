import { ITodo } from "@/types/TodoType"
import { Avatar, Box, Collapse, IconButton, List, ListItemAvatar, ListItemButton, ListItemText, TextField, styled } from "@mui/material";
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { AiFillDelete } from "react-icons/ai";
import { MdModeEditOutline } from "react-icons/md";
import { BsCheck2Circle, BsCircleFill, BsExclamationCircleFill } from "react-icons/bs";
import { useState } from "react";
import { FaTrophy } from "react-icons/fa";
import api from "@/services/api";
import { useAlertController, useDialogController } from "@/hooks/states";
import { useGetTodos } from "@/hooks/apiRequest";
import CustomButton from "./CustomButton";
import { useSession } from "next-auth/react";
import { dateFormatter } from "@/lib/date";
import { AddTodoForm } from "./AddTodoForm";

export type ITodoItem = {
    todo: ITodo;
}

export const TodoItem = ( { todo }: ITodoItem ) => {

    const [ details, openDetails ] = useState(false);
    const { setAlertProps } = useAlertController();
    const { refetch } = useGetTodos();
    const { setDialogProps } = useDialogController();
    const { data: session } = useSession();
    const userData: any = session?.user;
    const userID = userData.id;

    function handleDeleteTodo(todoID: string) {
      api.post(`/user/delete_todo/${userID}`, {id: todoID})
      .then(() => {
        refetch();
        setAlertProps({
          severity: "success",
          title: "Tudo certo.",
          message: "Tarefa excluída com sucesso!"
        })
        setDialogProps(null);
      })
      .catch((error) => {
        setAlertProps({
          severity: "error",
          title: "Algo deu errado...",
          message: "Erro ao excluir tarefa. Tente novamente."
        })
        console.error(error);
      })
    }

    function deleteTodo() {
        setDialogProps({
            title: "Excluir Tarefa",
            contentText: "Tem certeza que deseja excluir esta tarefa?",
            styles: {
                title: { backgroundColor: "#B33951", color: "#F1F7ED" },
                contentText: { fontWeight: "semibold", paddingTop: '10px' }
            },
            actions: (
                <CustomButton
                onClick={() => handleDeleteTodo(todo._id!)}
                Text="Excluir"
                className="bg-app-palette-400 text-app-palette-200 font-semibold"
                Icon={AiFillDelete}
                IconStyle="text-2xl text-app-palette-200"
                />
            )
        });
    }

    function editTodo(todoData: ITodo) {
        setDialogProps({
            title: "Editar Tarefa",
            styles: { 
                content: { padding: 0, width: "100%" },
                title: { backgroundColor: "#E3D081", color: "#54494B" }
            },
            content: (
                <AddTodoForm editValues={todoData}/>
            ),
            actions: (<></>)
        })
    }

    const progressColor = 
        todo.progress === 100 ? "#ccb14b" :
        todo.progress >= 50 ? "#4caf50" :
        todo.progress >= 25 ? "#ff9800" 
        : "#f44336";
    
    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
          backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
          borderRadius: 5,
          backgroundColor: progressColor,
        },
      }));

    return <>
        <ListItemButton
        sx={{ border: '1px solid rgba(227, 227, 227, 0.8)', display: 'flex', flexDirection: 'column', width: '100%' }}
        >
            <div className="flex w-full">
                <span
                className="flex w-full items-center"
                onClick={() => openDetails(!details)}
                >
                    <ListItemAvatar>
                        {
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
                    primary={todo.title}
                    secondary={todo.category}
                    />
                </span>

                <span className="flex gap-1">
                    <IconButton edge="end">
                        <Avatar sx={{ backgroundColor: "rgba(227, 227, 227, 0.6)" }}>
                            <AiFillDelete
                            className="text-2xl text-app-palette-400"
                            onClick={() => deleteTodo()} 
                            />
                        </Avatar>
                    </IconButton> 
                    <IconButton edge="end">
                        <Avatar sx={{ backgroundColor: "rgba(227, 227, 227, 0.6)" }}>
                            <MdModeEditOutline 
                            className="text-2xl text-app-palette-100"
                            onClick={() => editTodo(todo)}
                            />
                        </Avatar>
                    </IconButton>
                </span>
            </div>

            <Collapse 
            in={details} 
            timeout="auto" 
            unmountOnExit 
            sx={{ width: '100%' }}
            onClick={() => openDetails(!details)}
            >
                <List component="div" sx={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingX: '5px' }}>
                    <Box sx={{ flexGrow: 1}}>
                        <span className="flex justify-between">
                            <label>Progresso:</label>
                            {
                                todo.completed === true ? (
                                    <FaTrophy className="text-3xl text-[#ccb14b]"/>
                                ) :
                                <label>{todo.progress}%</label>
                            }
                        </span>
                        <BorderLinearProgress variant="determinate" value={todo.progress} sx={{marginY: '5px'}}/>
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

        </ListItemButton>
    </>
    
}