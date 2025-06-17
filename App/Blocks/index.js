import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import actions from "../Store/actions";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from "@mui/material/";
import makeStyles from "@mui/styles/makeStyles";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import styles from "./styles.js";
import AppHeader from "../common/components/AppHeader";
import AppContainer from "../common/components/AppContainer";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
    stepConnectorClasses
} from "@mui/material/StepConnector";

import Check from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: "calc(-50% + 16px)",
        right: "calc(50% + 16px)"
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#999"
        }
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: "#999"
        }
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderTopWidth: 3,
        borderRadius: 1
    }
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#999"
    }),
    "& .QontoStepIcon-completedIcon": {
        color: "#999",
        zIndex: 1,
        fontSize: 18
    },
    "& .QontoStepIcon-circle": {
        width: 8,
        height: 8,
        borderRadius: "50%",
        backgroundColor: "currentColor"
    }
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const Blocks = () => {
    const classes = makeStyles(styles)();

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { t } = useTranslation();
    let location = useLocation();
    const { blocks } = useSelector((state) => state);

    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    useEffect(() => {
        dispatch(actions.blocks.create.getRequest());
    }, []);

    const urlStart =
        location.pathname.indexOf("blocks") !== -1 ? "" : "blocks/";

    const hdlUserJourneyClick = (blockId) => (e) => {
        navigate(`${urlStart}${blockId}/exercises`);
    };

    return (
        <>
            <AppHeader className={classes.clientHeader}></AppHeader>
            <AppContainer>
                {blocks.data.map((block) => {
                    return (
                        <Accordion
                            key={block.id}
                            expanded={expanded === block.id}
                            onChange={handleChange(block.id)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${block.id}bh-content`}
                                id={`panel${block.id}bh-header`}
                                className={classes.accordSummary}
                            >
                                <Typography
                                    sx={{ width: "33%", flexShrink: 0 }}
                                >
                                    {block.name}
                                </Typography>

                                <Button
                                    onClick={hdlUserJourneyClick(block.id)}
                                    variant="outlined"
                                    sx={{ fontSize: "0.8rem" }}
                                >
                                    Check user journey
                                </Button>
                            </AccordionSummary>
                            <AccordionDetails className={classes.accordDetails}>
                                <Box className={classes.stepWrapper}>
                                    <Typography>{block.taskName}</Typography>
                                    <Stepper
                                        alternativeLabel
                                        activeStep={block.currentProgress}
                                        connector={<QontoConnector />}
                                    >
                                        {block.taskHistory.map((step) => (
                                            <Step key={step.id}>
                                                <StepLabel
                                                    StepIconComponent={
                                                        QontoStepIcon
                                                    }
                                                >
                                                    <Link
                                                        key={step.id}
                                                        to={`${urlStart}${block.id}/exercises/${step.taskId}`}
                                                        style={{
                                                            textDecoration:
                                                                "none",
                                                            color: "blue"
                                                        }}
                                                    >
                                                        {step.label}
                                                    </Link>
                                                </StepLabel>
                                            </Step>
                                        ))}
                                    </Stepper>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </AppContainer>
        </>
    );
};

export default Blocks;
