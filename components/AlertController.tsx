'use client';

import { useAlertController } from "@/hooks/states"
import { Alert, AlertTitle, Box, Collapse } from "@mui/material"
import { useEffect } from "react";

export const AlertController = () => {

    const { props, setAlertProps } = useAlertController();
    const title = props?.title;
    const message = props?.message;
    const severity = props?.severity;

    useEffect(() => {
        if(props !== null){
            setTimeout(() => {
                setAlertProps(null);
            },3000);
        }
    },[props]);

    if(props === null) return <></>

        return <>
        <Box sx={{ width: "100%", padding: "1rem", bottom: "0", position: "fixed", zIndex: 50}}>
            <Collapse in={props !== null}>
                <Alert severity={severity} variant="standard">
                    <AlertTitle>{title}</AlertTitle>
                    {message}
                </Alert>
            </Collapse>
        </Box>
    </>
}