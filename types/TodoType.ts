export type ITodo = {
    _id: string | number;
    title: string;
    description: string;
    category: string | null;
    priority: string;
    conclusion_date?: string;
    progress: number;
    completed: boolean;
    completedAt?: string;
    createdAt: string;
    updatedAt: string;
}