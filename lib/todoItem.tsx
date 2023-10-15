import { AddTodoForm } from "@/components/AddTodoForm";
import CustomButton from "@/components/CustomButton";
import { IAlertController, IDialogController } from "@/hooks/states";
import api from "@/services/api";
import { ITodo } from "@/types/TodoType";
import LinearProgress from "@mui/material/LinearProgress";
import linearProgressClasses from "@mui/material/LinearProgress/linearProgressClasses";
import styled from "@mui/material/styles/styled";
import { AiFillDelete } from "react-icons/ai";

type IDeleteTodo = {
    userID: string;
    todoData: ITodo;
    refetch: () => void;
    setAlertProps: IAlertController["setAlertProps"];
    setDialogProps: IDialogController["setDialogProps"];
}

export function handleDeleteTodo({ userID, todoData, refetch, setAlertProps, setDialogProps } : IDeleteTodo) {
  api.post(`/user/delete_todo/${userID}`, {id: todoData._id})
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
      message: "Erro ao excluir a tarefa. Tente novamente."
    })
    console.error(error);
  })
}
export function deleteTodo({ userID, todoData, refetch, setAlertProps, setDialogProps }: IDeleteTodo) {
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
          handleDeleteTodo({ userID, todoData, refetch, setAlertProps, setDialogProps })
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
  todoData: ITodo, 
  setDialogProps: IDialogController["setDialogProps"]
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
  userID: string;
  todoData: ITodo;
  refetch: () => void;
  setAlertProps: IAlertController["setAlertProps"];
}

export function changeCompleted({ userID, todoData, refetch, setAlertProps }: IChangeCompleted) {
    let changedTodo: ITodo & { completedAt?: string } = {
      ...todoData,
      completed: !todoData.completed
    }

    if(changedTodo.completed)
      changedTodo = {
        ...changedTodo,
        completedAt: new Date().toJSON()
      }

    api.patch(`/user/update_todo/${userID}`, changedTodo)
    .then(() => {
      refetch();
      setAlertProps({
        severity: "success",
        title: "Tudo certo.",
        message: changedTodo.completed 
          ? "Uhuul! Tarefa concluída!" 
          : "Conclusão removida com sucesso."
      })
    })
    .catch((error) => {
      setAlertProps({
        severity: "error",
        title: "Algo deu errado...",
        message: changedTodo.completed 
          ? "Erro ao concluir a tarefa. Tente novamente." 
          : "Erro ao remover a conclusão da tarefa. Tente novamente."
      })
      console.error(error);
    })

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