import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Função para concatenar classes, resolve possíveis problemas com customizações com tailwind.
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}