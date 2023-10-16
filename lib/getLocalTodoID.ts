import { ITodo } from "@/types/TodoType";

export function getLocalTodoID(todos: ITodo[]) {
    const mappedTodos = todos.map((todo, index) => ({...todo, _id: index}));
    return mappedTodos;
}