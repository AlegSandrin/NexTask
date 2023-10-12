import { create } from "zustand";

export type IAlertController = {
    props: {
        open: boolean;
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