import { AddTodoForm } from "@/components/TodoComponents/AddTodoForm";
import CustomButton from "@/components/Layout/CustomButton";
import { IAlertController, IDialogController, INoSigInSession } from "@/hooks/states";
import { ITodo } from "@/types/TodoType";
import LinearProgress from "@mui/material/LinearProgress";
import linearProgressClasses from "@mui/material/LinearProgress/linearProgressClasses";
import styled from "@mui/material/styles/styled";
import { AiFillDelete } from "react-icons/ai";
import { UseMutateFunction } from "@tanstack/react-query";

type IDeleteTodo = {
    todoData: ITodo;
    localData: boolean;
    mutate: UseMutateFunction<any, unknown, ITodo, any>;
    setAlertProps: IAlertController["setAlertProps"];
    setDialogProps: IDialogController["setDialogProps"];
    setLocalData: INoSigInSession["setLocalData"];
}

export function handleDeleteTodo({ todoData, localData, mutate, setAlertProps, setDialogProps, setLocalData } : IDeleteTodo) {
  if(localData && typeof window !== "undefined") {
    let todoList = JSON.parse(localStorage.getItem('todos')!);
    todoList.splice(todoData._id , 1);

    localStorage.setItem('todos', JSON.stringify(todoList));
    setLocalData();
    setAlertProps({
      severity: "success",
      title: "Tudo certo.",
      message: "Tarefa excluída com sucesso!"
    });
    setDialogProps(null);
    return;
  }

  mutate(todoData);
}
export function deleteTodo({ todoData, localData, mutate, setAlertProps, setDialogProps, setLocalData }: IDeleteTodo) {
    setDialogProps({
        title: "Excluir Tarefa",
        contentText: "Tem certeza que deseja excluir esta tarefa?",
        styles: {
            title: { backgroundColor: "#B33951", color: "#F1F7ED" },
            contentText: { fontWeight: "semibold", paddingTop: '10px' }
        },
        actions: (
          <CustomButton
          onClick={() => {
          handleDeleteTodo({ todoData, localData, mutate, setAlertProps, setDialogProps, setLocalData })
          }}
          Text="Excluir"
          className="bg-app-palette-400 text-app-palette-200 font-semibold -sm:text-sm -sm:px-[8px] -sm:py-[6px]"
          Icon={AiFillDelete}
          IconStyle="-sm:text-lg text-2xl text-app-palette-200"
          />
        )
    });
}

type IEditTodo = {
  todoData: ITodo;
  setDialogProps: IDialogController["setDialogProps"];
}

export function editTodo( { todoData, setDialogProps }: IEditTodo ) {
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

type IChangeCompleted = {
  todoData: ITodo;
  localData: boolean;
  mutate: UseMutateFunction<any, unknown, ITodo, any>
  setAlertProps: IAlertController["setAlertProps"];
  setLocalData: INoSigInSession["setLocalData"];
}

export function changeCompleted({ todoData, localData, mutate, setAlertProps, setLocalData }: IChangeCompleted) {
    let changedTodo: ITodo & { completedAt?: string } = {
      ...todoData,
      completed: !todoData.completed
    }

    if(changedTodo.completed)
      changedTodo = {
        ...changedTodo,
        completedAt: new Date().toJSON()
      }

    if(localData && typeof window !== "undefined") {
      let todoList = JSON.parse(localStorage.getItem('todos')!);
      todoList[todoData._id] = changedTodo;
      localStorage.setItem('todos', JSON.stringify(todoList));
      setAlertProps({
        severity: "success",
        title: "Tudo certo.",
        message: changedTodo.completed 
          ? "Uhuul! Tarefa concluída!" 
          : "Conclusão removida com sucesso."
      });
      setLocalData();
      return;
    }

    mutate(changedTodo);
}

export const progressColor = (progress: number) => 
  progress === 100 ? "#ccb14b" :
  progress >= 50 ? "#4caf50" :
  progress >= 25 ? "#ff9800" 
  : "#f44336";

export const BorderLinearProgress = styled(LinearProgress)(({ theme, value }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: progressColor(value!),
    },
  }));