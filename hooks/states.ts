import { getLocalTodoID } from "@/lib/getLocalTodoID";
import { ITodo } from "@/types/TodoType";
import { SxProps, Theme } from "@mui/material";
import { create } from "zustand";

export type IAlertController = {
    props: {
        severity: "success" | "error" | "info" | "warning";
        title: string;
        message: string;
    } | null
    setAlertProps: (props: IAlertController["props"]) => void;
}

// Controla a renderização e o conteúdo do component de Alert
export const useAlertController = create<IAlertController>((set) => ({
    props: null,
    setAlertProps(props) {
        set(() => ({
            props,
        }));
    },
}))

export type IDialogController = {
    props: {
        title: string | JSX.Element;
        content?: string | JSX.Element;
        contentText?: string | JSX.Element;
        styles?: {
            dialog?: SxProps<Theme>;
            title?: SxProps<Theme>;
            content?: SxProps<Theme>;
            contentText?: SxProps<Theme>;
            actions?: SxProps<Theme>;
        }
        actions: JSX.Element;
    } | null
    setDialogProps: (props: IDialogController["props"]) => void;
}

// Controla a renderização e o conteúdo do component de Dialog
export const useDialogController = create<IDialogController>((set) => ({
    props: null,
    setDialogProps(props) {
        set(() => ({
            props,
        }));
    },
}))

export type INoSigInSession = {
    username?: string;
    setUsernameSession: (username: string | undefined) => void;
    localData?: ITodo[];
    setLocalData: () => void;
}

// Controla os dados locais do usuário (localStorage) e mantém em um estado
export const useNoSigInSession = create<INoSigInSession>((set) => ({
    username: undefined,
    setUsernameSession: (username) => {
        set(() => ({
            username,
        }));
    },
    localData: typeof window === "undefined" ? [] : getLocalTodoID(JSON.parse(localStorage.getItem("todos")!)),
    setLocalData: () => {
        set(() => ({
            localData: typeof window === "undefined" ? [] : getLocalTodoID(JSON.parse(localStorage.getItem("todos")!)),
        }));
    },
}))
