export type ITodo = {
    _id: string;
    title: string;
    description: string;
    category: string;
    priority: string;
    conclusion_date?: string;
    progress: number;
    completed: boolean;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
}