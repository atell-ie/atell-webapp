import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import actions from "../../Store/actions";
import { useTranslation } from "react-i18next";
import { Box, Button, Typography } from "@mui/material/";

import AppDialog from "../../common/components/AppDialog";
import Exercise from ".";
import TaskSummary from "./TaskSummary";

import styles from "./styles.js";

const steps = {
    0: {
        component: <Exercise />
    },
    1: {
        component: <TaskSummary />
    }
};

const Task = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { t } = useTranslation();

    const { tasks } = useSelector((state) => state);
    const [step, setStep] = useState(0);
    const [open, setOpen] = useState(false);

    const hdlStepBackward = () => (step ? setStep(step - 1) : setStep(0));
    const hdlStepForward = () => {
        if (step + 1 < Object.keys(steps).length) setStep(step + 1);
        else setStep(1);

        if (step === Object.keys(steps).length - 1) {
            console.log("Completed!");
            setOpen(true);
        }
    };

    const handleClose = () => {
        navigate("/auth/tasks");
    };

    return (
        <>
            {steps[step].component}
            <Box sx={{ textAlign: "right", paddingTop: "1rem" }}>
                {step ? (
                    <Button variant="contained" onClick={hdlStepBackward}>
                        Back
                    </Button>
                ) : null}
                <Button variant="contained" onClick={hdlStepForward}>
                    {step === Object.keys(steps).length - 1
                        ? "Complete"
                        : "Next"}
                </Button>
            </Box>
            <AppDialog
                title={`Task completed`}
                open={open}
                handleClose={handleClose}
                dialogActions={undefined}
                maxWidth="md"
            >
                <Box>
                    <Typography>
                        Diagnostics task has been completed. Assesment:Template
                        1 has been issued.
                    </Typography>
                    <Button variant="contained" onClick={handleClose}>
                        Back to tasks screen
                    </Button>
                </Box>
            </AppDialog>
        </>
    );
};

export default Task;
