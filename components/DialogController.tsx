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

    if(props === null) return <></>

        return <>
        <Dialog
        open={props !== null}
        onClose={() => setDialogProps(null)}
        sx={{ opacity: 0.95, zIndex: 40 }}
        className="rounded-xl"
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {contentText}
                </DialogContentText>
                {content}
            </DialogContent>
            <DialogActions>
                <CustomButton
                Text="Cancelar"
                onClick={() => setDialogProps(null)}
                className="bg-app-palette-100 text-app-palette-200 font-semibold"
                Icon={MdCancel}
                IconStyle="text-2xl text-app-palette-200"
                />
                {actions}
            </DialogActions>
        </Dialog>
    </>
}