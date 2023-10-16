import { IAlertController, IDialogController } from "@/hooks/states";
import api from "@/services/api";
import { ITodo } from "@/types/TodoType";
import { UseFormReset } from "react-hook-form";

export type IAddTodo = {
    userID: string;
    data: ITodo;
    localData: boolean;
    setAlertProps: IAlertController["setAlertProps"];
    refetch: () => Promise<any>;
    reset: UseFormReset<ITodo>;
}

export function addTodo({ userID, data, localData, setAlertProps, refetch, reset }: IAddTodo) {   
    // Adiciona a tarefa localmente
    if(localData) {
        if(!localStorage.getItem("todos")) localStorage.setItem("todos", JSON.stringify([]));
        let storageData = JSON.parse(localStorage.getItem("todos")!);
        localStorage.setItem("todos", JSON.stringify([
            ...storageData,
            {   
                ...data, 
                _id: storageData.length + 1, 
                createdAt: new Date().toJSON(), 
                updatedAt: new Date().toJSON()
            }
            ])
        );
        
        setAlertProps({
            severity: "success",
            title: "Tudo certo.",
            message: `Tarefa atualizada com sucesso!`
        });
        reset()
        return;
    }

    // Adiciona a tarefa ao banco de dados do usuário
    api.post(`/user/create_todo/${userID}`, data)
    .then(() => {
        reset();
        refetch();
        setAlertProps({
            severity: "success",
            title: "Tudo certo.",
            message: `Tarefa atualizada com sucesso!`
        });
    })
    .catch((error) => {
        console.error(error);
        setAlertProps({
            severity: "error",
            title: "Algo deu errado...",
            message: `Erro ao atualizar tarefa. Tente novamente.`
        });
    })
}

export type IEditTodo = {
    setDialogProps: IDialogController["setDialogProps"];
    todoIndex: number;
} & Omit<IAddTodo, "reset">

export function editTodo({ userID, data, localData, todoIndex, setDialogProps, setAlertProps, refetch }: IEditTodo) {
    // Atualiza a tarefa localmente
    if(localData) {
        let storageData = JSON.parse(localStorage.getItem("todos")!);
        storageData[todoIndex] = {...data, updatedAt: new Date().toJSON()}
        localStorage.setItem("todos", JSON.stringify(storageData))
        
        setAlertProps({
            severity: "success",
            title: "Tudo certo.",
            message: `Tarefa atualizada com sucesso!`
        });
        setDialogProps(null);
        return;
    }
    
    // Atualiza a tarefa no banco de dados do usuário
    api.patch(`/user/update_todo/${userID}`, data)
    .then(() => {
        refetch();
        setAlertProps({
            severity: "success",
            title: "Tudo certo.",
            message: `Tarefa atualizada com sucesso!`
        });
        setDialogProps(null);
    })
    .catch((error) => {
        console.error(error);
        setAlertProps({
            severity: "error",
            title: "Algo deu errado...",
            message: `Erro ao atualizar tarefa. Tente novamente.`
        });
    })
}