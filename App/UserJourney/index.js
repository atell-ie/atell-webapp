import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as Sentry from "@sentry/react";
import actions from "../Store/actions";

import { Box, Chip, Tooltip } from "@mui/material/";

import styles from "./styles.js";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
    stepConnectorClasses
} from "@mui/material/StepConnector";

import Check from "@mui/icons-material/Check";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SyncIcon from "@mui/icons-material/Sync";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import FaceIcon from "@mui/icons-material/Face";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import AppContainer from "../common/components/AppContainer";

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
        borderTopWidth: 2,
        borderRadius: 1
    }
}));

const QontoStepIconRoot = styled("div")(({ theme, ownerState }) => ({
    color: theme.palette.mode === "dark" ? theme.palette.grey[700] : "#eaeaf0",
    display: "flex",
    height: 22,
    alignItems: "center",
    ...(ownerState.active && {
        color: "#F28C28"
    }),
    "& .QontoStepIcon-completedIcon": {
        color: "#006C00",
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
                <Check
                    className="QontoStepIcon-completedIcon"
                    fontSize="large"
                />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

const options = ["History"];

const UserJourney = () => {
    const { blockId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [activeStep, setActiveStep] = useState(2);
    const [filter, setFilter] = useState("in_progress");

    const { blocks, tasks, targets } = useSelector((state) => state);

    const shift = activeStep - 3 < 0 ? 0 : activeStep - 3;

    const index = blocks.byId[blockId];
    const block = blocks.data[index];

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNext = () => {
        setActiveStep(
            activeStep + 1 > block.taskHistory.length
                ? block.taskHistory.length
                : activeStep + 1
        );
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1 < 0 ? 0 : activeStep - 1);
    };

    useEffect(() => {
        dispatch(actions.blocks.create.getRequest());
        dispatch(actions.tasks.create.getRequest());
        dispatch(actions.targets.create.getRequest());
    }, []);

    const hdlExerciseClick = (taskItem, dayRow) => (e) => {
        dispatch(
            actions.tasks.create.itemSet({
                taskId: taskItem.id,
                dayNo: dayRow.name,
                weekNo: block.taskHistory[activeStep - 1].label
            })
        );
        const itemFound = targets.data.find(
            (iter) => iter.type === parseInt(taskItem.level)
        );

        dispatch(actions.targets.create.itemSet(itemFound));
        navigate(`${taskItem.id}`);
    };

    const DayilyStatus = ({ status }) => {
        const iconStatus = {
            completed: (
                <Check
                    sx={{
                        color: "green",
                        marginRight: ".5rem"
                    }}
                />
            ),
            "in progress": (
                <SyncIcon
                    sx={{
                        color: "orange",
                        marginRight: ".5rem"
                    }}
                />
            ),
            due: (
                <FiberManualRecordIcon
                    sx={{
                        color: "#ccc",
                        marginRight: ".5rem"
                    }}
                />
            )
        };

        return iconStatus[status];
    };

    console.log("tasks.data", tasks.data);

    if (tasks.data.length < 1) {
        return <div>Loading</div>;
    }

    const DaylyTable = () => {
        return (
            <TableContainer sx={{ boxShadow: "none" }} component={Paper}>
                <Table
                    sx={{
                        minWidth: 650,
                        [`& .${tableCellClasses.root}`]: {
                            borderBottom: "none"
                        }
                    }}
                    aria-label="simple table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell>Weekday</TableCell>
                            <TableCell align="right">
                                Speech exercises
                            </TableCell>
                            <TableCell align="right">
                                Language exercises
                            </TableCell>
                            <TableCell align="right">Options</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tasks.data[activeStep - 1].weeklyData.map((row) => {
                            return (
                                <TableRow
                                    key={row.name}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0
                                        }
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "end"
                                            }}
                                        >
                                            <DayilyStatus status={row.status} />

                                            {row.name}
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.speech.map((item, index) => {
                                            let colorClass = "primary";
                                            let level = "";

                                            if (item.level === 1) {
                                                colorClass = styles.isolation;
                                                level = "Isolation";
                                            }

                                            if (item.level === 2) {
                                                colorClass = styles.syllables;
                                                level = "Syllables";
                                            }
                                            if (item.level === 3) {
                                                colorClass = styles.singleWord;
                                                level = "Single word";
                                            }
                                            if (item.level === 4) {
                                                colorClass = styles.phrase;
                                                level = "Phrases";
                                            }
                                            if (item.level === 5) {
                                                colorClass =
                                                    styles.singleSentence;
                                                level = "Single sentences";
                                            }
                                            if (item.level === 6) {
                                                colorClass = styles.sentences;
                                                level = "Sentences";
                                            }

                                            if (row.status === "due") {
                                                colorClass = styles.disabled;
                                            }
                                            return (
                                                <Tooltip
                                                    title={level}
                                                    key={index}
                                                >
                                                    <Chip
                                                        label={`m - ${item.label}`}
                                                        variant="outlined"
                                                        icon={<FaceIcon />}
                                                        disabled={
                                                            row.status === "due"
                                                        }
                                                        sx={colorClass}
                                                        onClick={hdlExerciseClick(
                                                            item,
                                                            row
                                                        )}
                                                        sx={{
                                                            padding: "0 0.3rem",
                                                            margin: "0 0.1rem"
                                                        }}
                                                    />
                                                </Tooltip>
                                            );
                                        })}
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.language.map((item) => {
                                            return (
                                                <Link
                                                    key={item}
                                                    to={`1`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "blue",
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    <Chip
                                                        label={item}
                                                        color="secondary"
                                                        sx={{
                                                            padding: "0 0.3rem",
                                                            margin: "0 0.1rem"
                                                        }}
                                                    />
                                                </Link>
                                            );
                                        })}
                                    </TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            edge="end"
                                            aria-label="options"
                                        >
                                            <MoreHorizIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <>
            <AppContainer>
                <Card sx={{ maxWidth: "100%" }}>
                    <CardHeader
                        avatar={
                            <Avatar
                                sx={{ bgcolor: red[500] }}
                                aria-label="recipe"
                            >
                                R
                            </Avatar>
                        }
                        action={
                            <>
                                <IconButton
                                    aria-label="more"
                                    id="options"
                                    aria-controls={open ? "options" : undefined}
                                    aria-expanded={open ? "true" : undefined}
                                    aria-haspopup="true"
                                    onClick={handleClick}
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <Menu
                                    id="long-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "options"
                                    }}
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    {options.map((option) => (
                                        <MenuItem
                                            key={option}
                                            selected={option === "history"}
                                            onClick={handleClose}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </>
                        }
                        title={block.name}
                        subheader="5 Years old"
                    />
                    <CardContent>
                        <Box>
                            <Typography
                                sx={{
                                    background: "#fafafa",
                                    borderRadius: "0.3rem",
                                    border: "1px solid #ccc",
                                    padding: "1rem",
                                    marginBottom: "1rem"
                                }}
                            >
                                {block.taskName}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexFlow: "row",
                                    height: "60px",
                                    margin: "0 2rem"
                                }}
                            >
                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    disabled={activeStep === 1}
                                    onClick={handleBack}
                                >
                                    <ArrowBackIosIcon fontSize="inherit" />
                                </IconButton>

                                <Stepper
                                    alternativeLabel
                                    activeStep={block.currentProgress - shift}
                                    connector={<QontoConnector />}
                                    sx={{ width: "100%" }}
                                >
                                    {block.taskHistory
                                        .slice(0 + shift, 3 + shift)
                                        .map((step) => (
                                            <Step key={step.id}>
                                                <StepLabel
                                                    StepIconComponent={
                                                        QontoStepIcon
                                                    }
                                                >
                                                    {/* <Link
                                                key={step.id}
                                                to={`${urlStart}${block.id}/tasks/${step.taskId}`}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "blue"
                                                }}
                                            >
                                                
                                            </Link> */}
                                                    <Box
                                                        sx={
                                                            activeStep ===
                                                            step.id
                                                                ? {
                                                                      background:
                                                                          "#eee",
                                                                      padding:
                                                                          "0.5rem",
                                                                      margin: "0.5rem 5rem",
                                                                      borderRadius:
                                                                          ".3rem"
                                                                  }
                                                                : {}
                                                        }
                                                    >
                                                        {step.label}
                                                    </Box>
                                                </StepLabel>
                                            </Step>
                                        ))}
                                </Stepper>
                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    disabled={
                                        activeStep ===
                                        block.taskHistory.length - 1
                                    }
                                    onClick={handleNext}
                                >
                                    <ArrowForwardIosIcon fontSize="inherit" />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{ paddingTop: "2rem" }}>
                            <Typography
                                sx={{
                                    background: "#fafafa",
                                    borderRadius: "0.3rem",
                                    border: "1px solid #ccc",
                                    padding: "1rem",
                                    marginBottom: "1rem"
                                }}
                            >
                                Weekly actions
                            </Typography>
                            <Box sx={{ padding: "0 10rem" }}>
                                <DaylyTable />
                            </Box>
                        </Box>
                    </CardContent>
                    <CardActions disableSpacing></CardActions>
                </Card>
            </AppContainer>
        </>
    );
};

export default UserJourney;
