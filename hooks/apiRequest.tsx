import api from "@/services/api";
import { ITodo } from "@/types/TodoType";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useAlertController, useDialogController } from "./states";
import { UseFormReset } from "react-hook-form";

export const useCreateTodo = (resetForm: UseFormReset<ITodo>) => {
    const { data: session, status } = useSession();
    const userData: any = session?.user;
    const userID = userData?.id;
    const queryClient = useQueryClient();
    const { setAlertProps } = useAlertController();

    const queryProps = useMutation(({
        mutationFn: async (todoData: ITodo) => {
            if (status !== "authenticated") return [];
            const res = await api.post(`/user/create_todo/${userID}`, todoData);
            return res.data;
        },
        onMutate: async (newData) => {
            await queryClient.cancelQueries([userID]);
            const previousData = queryClient.getQueryData<ITodo[]>([userID])!;
            const updatedData = [...previousData, {
                ...newData, 
                _id:"temporaryID...", 
                createdAt: new Date().toJSON(), 
                updatedAt: new Date().toJSON(),
                isLoading: true
            }];
            queryClient.setQueryData([userID], updatedData);

            return { previousData };
        },
        onError: (error, _, context) => {
            console.error(error);
            queryClient.setQueryData([userID], () => context?.previousData);
            setAlertProps({
                severity: "error",
                title: "Algo deu errado...",
                message: `Erro ao adicionar tarefa. Tente novamente.`
            });
        },
        onSuccess: () => {
            setAlertProps({
                severity: "success",
                title: "Tudo certo.",
                message: `Tarefa adicionada com sucesso!`
            });
            resetForm();
        },
        onSettled: () => {
            queryClient.invalidateQueries([userID]);
        }
    }));

    return { ...queryProps };

}

export const useGetTodos = () => {
    const { data: session, status } = useSession();
    const userData: any = session?.user;
    const userID = userData?.id;

    const queryProps = useQuery({
        queryKey: [userID],
        queryFn: async () => {
            if (status !== "authenticated") return [];
            const res = await api.get(`/user/get_todos/${userID}`);
            return res.data;
        },
        onError(err: string) {
          throw new Error(err);
        },
        refetchOnWindowFocus: false
    });

    return { ...queryProps };
}

export const useUpdateTodo = ({ changeCompleted }: { changeCompleted?: boolean }) => {
    const { data: session, status } = useSession();
    const userData: any = session?.user;
    const userID = userData?.id; 
    const queryClient = useQueryClient();
    const { setAlertProps } = useAlertController();
    const { setDialogProps } = useDialogController();

    const queryProps = useMutation(({
        mutationFn: async (todoData: ITodo) => {
            if (status !== "authenticated") return [];
            const res = await api.patch(`/user/update_todo/${userID}`, todoData);
            return res.data;
        },
        onMutate: async (newData) => {
            await queryClient.cancelQueries([userID]);
            const previousData = queryClient.getQueryData<ITodo[]>([userID]);
            const updatedData = previousData?.map((todo) => {
                if(todo._id !== newData._id) return todo;
                else return {...newData, isLoading: true};
            })
            queryClient.setQueryData([userID], updatedData);
            setDialogProps(null);

            return { previousData };
        },
        onError: (error, todo, context) => {
            console.error(error);
            queryClient.setQueryData([userID], () => context?.previousData);
            setAlertProps({
                severity: "error",
                title: "Algo deu errado...",
                message: !changeCompleted ? `Erro ao atualizar tarefa. Tente novamente.` :
                    todo.completed 
                    ? "Erro ao concluir a tarefa. Tente novamente." 
                    : "Erro ao remover a conclusão da tarefa. Tente novamente."
            });
        },
        onSuccess: (_, todo) => {
            setAlertProps({
                severity: "success",
                title: "Tudo certo.",
                message: !changeCompleted ? `Tarefa atualizada com sucesso!` :
                    todo.completed 
                    ? "Uhuul! Tarefa concluída!" 
                    : "Conclusão removida com sucesso."
            });
        },
        onSettled: () => {
            queryClient.invalidateQueries([userID]);
        }
    }));

    return { ...queryProps };
}

export const useDeleteTodo = () => {
    const { data: session, status } = useSession();
    const userData: any = session?.user;
    const userID = userData?.id;
    const queryClient = useQueryClient();
    const { setAlertProps } = useAlertController();
    const { setDialogProps } = useDialogController();

    const queryProps = useMutation(({
        mutationFn: async (todoData: ITodo) => {
            if (status !== "authenticated") return [];
            const res = await api.post(`/user/delete_todo/${userID}`, todoData);
            return res.data;
        },
        onMutate: async (newData) => {
            await queryClient.cancelQueries([userID]);
            const previousData = queryClient.getQueryData<ITodo[]>([userID]);
            const updatedData = previousData?.filter((todo) => todo._id !== newData._id);
            queryClient.setQueryData([userID], updatedData);
            setDialogProps(null);

            return { previousData };
        },
        onError: (error, _, context) => {
            console.error(error);
            queryClient.setQueryData([userID], () => context?.previousData);
            setAlertProps({
                severity: "error",
                title: "Algo deu errado...",
                message: `Erro ao remover tarefa. Tente novamente.`
            });
        },
        onSuccess: () => {
            setAlertProps({
                severity: "success",
                title: "Tudo certo.",
                message: `Tarefa removida com sucesso!`
            });
            setDialogProps(null);
        },
        onSettled: () => {
            queryClient.invalidateQueries([userID]);
        }
    }));

    return { ...queryProps };

}