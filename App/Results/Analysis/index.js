import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Store/actions";

import { Box, Grid, Button, IconButton, Typography } from "@mui/material";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import InstanceList from "./InstanceList";
import { useTargetWordInstances } from "../../common/components/InstancePhonemes";

const severityMapping = {
    warning: "Review",
    error: "Failed",
    success: "All good"
};

function getUniqueTargetWordIgs(mappingsData) {
    const uniqueIds = {};

    const targetsList = mappingsData.filter((item) => item.targetWord);
    targetsList.forEach((item) => {
        if (!uniqueIds[item.targetWord])
            uniqueIds[item.targetWord] = item.targetWord;
    });

    return uniqueIds;
}

const Analysis = () => {
    const { sessionId } = useParams();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { state } = useLocation();

    const { results, resultsManager, wordsList } = useSelector(
        (state) => state
    );

    const { targetWordInstances, selectedWordIndex, selectedTargetWordId } =
        resultsManager;

    const [note, setNote] = useState("");
    const [noteOpen, setNoteOpen] = useState(false);
    const [targetProgress, setTargetProgress] = useState({});
    const [maxEnabledIndex, setMaxEnabledIndex] = useState(0);

    useEffect(() => {
        let uniqueIds = {};

        const fetchData = async () => {
            uniqueIds = getUniqueTargetWordIgs(results.data);

            await dispatch(
                actions.wordIpas.create.getWordIpas(
                    Object.keys(uniqueIds).join(",")
                )
            );

            const { resultIpas } = await dispatch(
                actions.analysisPhonemes.create.getWordErrors(sessionId)
            );

            dispatch(
                actions.resultsManager.create.update({
                    analysisLoading: false
                })
            );
        };

        fetchData();
    }, []);

    useEffect(() => {
        const nonEmptyData = results.data.filter((item) => item.targetWord);

        const groupedByTargets = nonEmptyData.reduce((accum, item) => {
            if (!accum[item.targetWord]) accum[item.targetWord] = [];

            accum[item.targetWord].push(item);

            return accum;
        }, {});

        dispatch(
            actions.resultsManager.create.update({
                targetWordInstances: groupedByTargets,
                selectedTargetWordId:
                    selectedTargetWordId || Object.keys(groupedByTargets)[0]
            })
        );
    }, [results, targetProgress]);

    useEffect(() => {
        setMaxEnabledIndex((prev) => Math.max(prev, selectedWordIndex + 1));
    }, [selectedWordIndex]);

    const hdlNoteChange = (e) => {
        const { value } = e.target;
        setNote(value);
    };

    const hdlNoteClose = () => {
        setNoteOpen(false);
    };

    const hdlNoteSave = () => {
        setNoteOpen(false);
    };

    const hdlUpdTargetProgress = (targetIndex) => {
        const keys = Object.keys(targetWordInstances);
        const currentKey = keys[targetIndex];
        const updTarget = { ...targetProgress };

        updTarget[currentKey] = currentKey;
        setTargetProgress(updTarget);
    };

    const hdlTargetChange = (newIndex) => () => {
        dispatch(actions.resultsManager.create.updateIndex(newIndex));
        hdlUpdTargetProgress(newIndex);
    };

    const hdlSelectTargetWord = (targetWordId) => {
        dispatch(
            actions.resultsManager.create.update({
                selectedTargetWordId: targetWordId
            })
        );
    };

    return (
        <Box>
            <Box sx={{ padding: "1rem" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        padding: "1rem",
                        background: "#eef9fb"
                    }}
                >
                    <Box sx={{ width: "100%" }}>
                        <Button
                            variant="outlined"
                            onClick={() =>
                                navigate(`/auth/results/${sessionId}/mapping`)
                            }
                            disableElevation
                        >
                            Adjust mapping
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            width: "100%",
                            justifyContent: "right"
                        }}
                    >
                        <Typography>{`${t(
                            "analysisForUpload"
                        )}: speech_analysis_1.mp3`}</Typography>
                        <IconButton>
                            <PlayCircleOutlineIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>

            <Grid container sx={{ padding: "0 2rem" }}>
                <Grid item xs={3}>
                    <Typography sx={{ padding: "1rem" }}>
                        Target words:
                    </Typography>
                    <List
                        sx={{
                            height: 400,
                            padding: "1rem",
                            overflowY: "auto",
                            width: "15rem"
                        }}
                    >
                        {Object.keys(targetWordInstances).map(
                            (targetWordId, idx) => {
                                const index = wordsList.byId[targetWordId];
                                const word =
                                    index !== undefined
                                        ? wordsList.data[index]
                                        : { word: "", ipa: "" };
                                const isDisabled = idx > maxEnabledIndex;
                                const isSelected =
                                    selectedTargetWordId === targetWordId;
                                const isCompleted =
                                    !!targetProgress[targetWordId];

                                return (
                                    <ListItem
                                        key={word.id}
                                        onClick={
                                            !isDisabled
                                                ? hdlTargetChange(idx)
                                                : undefined
                                        }
                                        sx={{
                                            margin: ".5rem 0",
                                            background: isSelected
                                                ? "#e3f2fd"
                                                : "#fff",
                                            borderRadius: 2,
                                            boxShadow: isSelected ? 3 : 1,
                                            mb: 0.5,
                                            px: 2,
                                            py: 1,
                                            minHeight: 36,
                                            opacity: isDisabled ? 0.5 : 1,
                                            pointerEvents: isDisabled
                                                ? "none"
                                                : "auto",
                                            cursor: isDisabled
                                                ? "not-allowed"
                                                : "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            transition:
                                                "box-shadow 0.2s, background 0.2s",
                                            "&:hover": {
                                                boxShadow:
                                                    !isDisabled && !isSelected
                                                        ? 4
                                                        : undefined,
                                                background:
                                                    !isDisabled && !isSelected
                                                        ? "#f5f5f5"
                                                        : undefined
                                            }
                                        }}
                                        secondaryAction={
                                            isCompleted && (
                                                <CheckCircleIcon
                                                    color={
                                                        isSelected
                                                            ? "primary"
                                                            : "success"
                                                    }
                                                    sx={{ fontSize: 18 }}
                                                />
                                            )
                                        }
                                    >
                                        <ListItemText
                                            primary={
                                                <Typography
                                                    variant={
                                                        isSelected
                                                            ? "body1"
                                                            : "body2"
                                                    }
                                                    fontWeight={
                                                        isSelected ? 700 : 400
                                                    }
                                                    color={
                                                        isSelected
                                                            ? "primary.main"
                                                            : "text.primary"
                                                    }
                                                    sx={{
                                                        fontSize: isSelected
                                                            ? 16
                                                            : 14
                                                    }}
                                                >
                                                    {word.word}
                                                </Typography>
                                            }
                                        />
                                    </ListItem>
                                );
                            }
                        )}
                    </List>
                </Grid>
                <Grid item xs={9} sx={{ flexGrow: 1 }}>
                    <InstanceList
                        setSelectedTarget={hdlSelectTargetWord}
                        hdlTargetChange={hdlTargetChange}
                    />
                </Grid>
            </Grid>

            {/* <Popper
                // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
                sx={{ zIndex: 1200 }}
                open={noteOpen}
                anchorEl={anchorEl}
                placement={placement}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper sx={{ padding: "0.5rem 1rem" }}>
                            <Box>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Note"
                                    multiline
                                    rows={4}
                                    defaultValue={note}
                                    onChange={hdlNoteChange}
                                    variant="standard"
                                />
                            </Box>
                            <Box
                                sx={{
                                    paddingTop: "1rem",
                                    display: "flex",
                                    justifyContent: "flex-end"
                                }}
                            >
                                <Button variant="text" onClick={hdlNoteClose}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary"
                                    variant="text"
                                    onClick={hdlNoteSave}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Paper>
                    </Fade>
                )}
            </Popper> */}

            {/* <AppModal isVisible={modalOpen} onClose={hdlModalClose}>
                some content here
            </AppModal> */}
        </Box>
    );
};

export default Analysis;
