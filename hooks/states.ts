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

export const useDialogController = create<IDialogController>((set) => ({
    props: null,
    setDialogProps(props) {
        set(() => ({
            props,
        }));
    },
}))