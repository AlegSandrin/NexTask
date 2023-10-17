import { IAlertController, IDialogController, INoSigInSession } from "@/hooks/states";
import { ITodo } from "@/types/TodoType";
import { UseMutateFunction } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";

export type IHandleAddTodo = {
    data: ITodo;
    mutate: UseMutateFunction<any, unknown, ITodo, any>;
    setAlertProps: IAlertController["setAlertProps"];
    reset: UseFormReset<ITodo>;
    localData: boolean;
    setLocalData: INoSigInSession["setLocalData"];
}

export function handleAddTodo({ data, localData, mutate, setAlertProps, reset, setLocalData }: IHandleAddTodo) {   
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
            message: `Tarefa adicionada com sucesso!`
        });
        reset();
        setLocalData();
        return;
    }

    // Adiciona a tarefa ao banco de dados do usuário
    mutate(data);
}

export type IHandleEditTodo = {
    setDialogProps: IDialogController["setDialogProps"];
} & Omit<IHandleAddTodo, "reset">

export function handleEditTodo({ data, mutate, localData, setLocalData, setDialogProps, setAlertProps }: IHandleEditTodo) {
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
    mutate(data);
}