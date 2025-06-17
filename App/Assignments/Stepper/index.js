import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import actions from "../../Store/actions";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";

import SelectUser from "./SelectUser";
import SelectAssignment from "./SelectAssignment";
const steps = ["Select user", "Select assignment"];

export default function HorizontalLinearStepper({ hdlDialogClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(0);
    const [assignment, setAssignment] = useState({
        userId: 0,
        assignmentType: 0,
        impairmentType: 0,
        assignmentSource: 0
    });

    const hdlSetAssignment = (item) => {
        setAssignment({ ...assignment, ...item });
    };

    const handleNext = async () => {
        if (steps.length - 1 !== activeStep)
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
        else {
            const data = await dispatch(
                actions.assignments.create.postAssignmentRequest(assignment)
            );
            navigate(`${data.assignment.id}`);
            hdlDialogClose();
        }
    };

    // TODO: revamp
    const activeComponent = useMemo(() => {
        const component = {
            0: <SelectUser setAssignment={hdlSetAssignment} />,
            1: (
                <SelectAssignment
                    assignment={assignment}
                    setAssignment={hdlSetAssignment}
                />
            )
        };
        return component;
    }, [assignment]);

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <>
                <Box sx={{ margin: "3rem 1rem" }}>
                    {activeComponent[activeStep]}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                    >
                        Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleNext}>
                        {activeStep === steps.length - 1 ? "Create" : "Next"}
                    </Button>
                </Box>
            </>
        </Box>
    );
}
