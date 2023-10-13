export type ITodo = {
    _id?: string;
    id?: string;
    title: string;
    description: string;
    category: string;
    priority: string;
    progress: number;
    completed: boolean;
}