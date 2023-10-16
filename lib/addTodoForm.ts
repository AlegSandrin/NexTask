import { IAlertController, IDialogController, INoSigInSession } from "@/hooks/states";
import api from "@/services/api";
import { ITodo } from "@/types/TodoType";
import { UseFormReset } from "react-hook-form";

export type IHandleAddTodo = {
    userID: string;
    data: ITodo;
    localData: boolean;
    setAlertProps: IAlertController["setAlertProps"];
    refetch: () => Promise<any>;
    reset: UseFormReset<ITodo>;
    setLocalData: INoSigInSession["setLocalData"];
}

export function handleAddTodo({ userID, data, localData, setAlertProps, refetch, reset, setLocalData }: IHandleAddTodo) {   
    // Adiciona a tarefa localmente
    if(localData && typeof window !== "undefined") {
        // Se ainda não houver nenhum item em "todos" no localStorage, criará um novo array vazio
        if(!localStorage.getItem("todos")) localStorage.setItem("todos", JSON.stringify([]));
        let storageData = JSON.parse(localStorage.getItem("todos")!);
        localStorage.setItem("todos", JSON.stringify([
            ...storageData,
            {   
                ...data, 
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
        reset();
        setLocalData();
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

export type IHandleEditTodo = {
    setDialogProps: IDialogController["setDialogProps"];
} & Omit<IHandleAddTodo, "reset">

export function handleEditTodo({ userID, data, localData, setLocalData, setDialogProps, setAlertProps, refetch }: IHandleEditTodo) {
    // Atualiza a tarefa localmente
    if(localData && typeof window !== "undefined") {
        // Resgata o array com as tarefas do localStorage
        let storageData: ITodo[] = JSON.parse(localStorage.getItem("todos")!);
        // Substitui os dados da tarefa que deve ser atualizada com os novos dados e adiciona a data atual ao campo "updateAt"
        storageData.splice(data._id as number, 1, {...data, updatedAt: new Date().toJSON()})
        localStorage.setItem("todos", JSON.stringify(storageData))
        
        setAlertProps({
            severity: "success",
            title: "Tudo certo.",
            message: `Tarefa atualizada com sucesso!`
        });
        setLocalData();
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