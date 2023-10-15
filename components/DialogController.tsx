'use client';

import { useDialogController } from "@/hooks/states"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import CustomButton from "./CustomButton";
import { MdCancel } from "react-icons/md";

export const DialogController = () => {

    const { props, setDialogProps } = useDialogController();
    const title = props?.title;
    const content = props?.content;
    const contentText = props?.contentText;
    const actions = props?.actions;
    const styles = props?.styles;

    if(props === null) return <></>

        return <>
        <Dialog
        open={props !== null}
        onClose={() => setDialogProps(null)}
        sx={{ opacity: 0.95, zIndex: 40, ...styles?.dialog }}
        className="rounded-xl"
        >
            <DialogTitle sx={ styles?.title && styles?.title }>
                {title}
            </DialogTitle>
            <DialogContent sx={ styles?.content && styles?.content }>
                <DialogContentText sx={ styles?.contentText && styles?.contentText }>
                    {contentText}
                </DialogContentText>
                {content}
            </DialogContent>
            <DialogActions sx={ styles?.actions && styles?.actions }>
                <CustomButton
                Text="Cancelar"
                onClick={() => setDialogProps(null)}
                className="bg-app-palette-100 text-app-palette-200 font-semibold -sm:text-sm -sm:px-[8px] -sm:py-[6px]"
                Icon={MdCancel}
                IconStyle="-sm:text-lg text-2xl text-app-palette-200"
                />
                {actions}
            </DialogActions>
        </Dialog>
    </>
}