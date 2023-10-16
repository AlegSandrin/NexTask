import { ITodo } from "@/types/TodoType";

export function getLocalTodoID(todos: ITodo[] | null | undefined) {
    if(typeof window === "undefined") return [];
    if(!todos) {
        localStorage.setItem("todos", JSON.stringify([]));
        return;
    }
    const mappedTodos = todos.map((todo, index) => ({...todo, _id: index}));
    return mappedTodos;
}