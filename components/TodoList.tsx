import { ITodo } from "@/types/TodoType";
import { List, Skeleton } from "@mui/material";
import { TodoItem } from "./TodoItem";
import { useGetTodos } from "@/hooks/apiRequest";

export const TodoList = () => {

    const { data, isLoading } = useGetTodos();

    if(isLoading) return <>
        <div className="flex flex-col w-full h-full justify-center items-center gap-3">
            <Skeleton variant="rounded" width={"55%"} height={75} />
            <Skeleton variant="rounded" width={"70%"} height={60} sx={{ marginBottom: "10px" }} />
            <Skeleton variant="rounded" width={"90%"} height={50} />
            <Skeleton variant="rounded" width={"90%"} height={50} />
            <Skeleton variant="rounded" width={"90%"} height={50} />
        </div>
    </>

    return <>
        <div className="flex flex-col w-full h-full justify-center items-center gap-2">
            <List sx={{ width: "100%" }}>
                {
                    data.map((todo: ITodo) => {
                        return (
                            <TodoItem todo={todo} key={todo._id!} />
                        )
                    })
                }
            </List>
        </div>
    </>
}