import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import { SnackbarProvider, useSnackbar } from "notistack";
import Alert from "@mui/material/Alert";
import actions from "../../Store/actions";

const AUTO_HIDE_DURATION = 5000;

/**
 * Toaster Component
 */
const Toaster = () => {
    const dispatch = useDispatch();
    const { toast } = useSelector((state) => state);
    const [activeToast, setActiveToast] = useState({});
    const [open, setOpen] = useState(false);
    const queue = useRef([]);

    const onClose = (event, reason) => {
        if (reason === "clickaway") return;

        dispatch(actions.toast.create.remove());
        setOpen(false);
    };

    const processQueue = () => {
        if (queue.current.length > 0) {
            setActiveToast(queue.current.shift());
            setOpen(true);
        }
    };

    useEffect(() => {
        toast && toast.length > 0 && queue.current.push(toast[0]);
        processQueue();
    }, [toast]);

    // TODO: replace with notistack ?
    return (
        <Snackbar
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            autoHideDuration={AUTO_HIDE_DURATION}
            onClose={onClose}
            open={open}
        >
            <Alert
                onClose={onClose}
                severity={activeToast.style}
                style={{ width: "25vw" }}
            >
                {activeToast.message}
            </Alert>
        </Snackbar>
    );
};

export default Toaster;
