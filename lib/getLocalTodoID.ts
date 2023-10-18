import { ITodo } from "@/types/TodoType";

// Define um "_id" para as tarefas, com base no seu indice da matriz
export function getLocalTodoID(todos: ITodo[] | null | undefined) {
    if(typeof window === "undefined") return [];
    if(!todos) {
        localStorage.setItem("todos", JSON.stringify([]));
        return;
    }
    const mappedTodos = todos.map((todo, index) => ({...todo, _id: index}));
    return mappedTodos;
}