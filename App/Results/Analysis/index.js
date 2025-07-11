import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Store/actions";

import { Box, Grid, Button, Typography, Container } from "@mui/material";

import { AudioPlayer } from "../../common/components";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

import InstanceList from "./InstanceList";
import styles from "./styles";

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

    const { results, resultsManager, wordsList, sessions } = useSelector(
        (state) => state
    );

    const { targetWordInstances, selectedWordIndex, selectedTargetWordId } =
        resultsManager;

    const [note, setNote] = useState("");
    const [noteOpen, setNoteOpen] = useState(false);
    const [targetProgress, setTargetProgress] = useState({});
    const [maxEnabledIndex, setMaxEnabledIndex] = useState(0);

    // Create a unique key for this session's progress
    const progressKey = `analysis_progress_${sessionId}`;
    const maxEnabledKey = `analysis_max_enabled_${sessionId}`;

    // Load cached progress on component mount
    useEffect(() => {
        try {
            const cachedProgress = localStorage.getItem(progressKey);
            const cachedMaxEnabled = localStorage.getItem(maxEnabledKey);

            if (cachedProgress) {
                setTargetProgress(JSON.parse(cachedProgress));
            }

            if (cachedMaxEnabled) {
                setMaxEnabledIndex(parseInt(cachedMaxEnabled, 10));
            }
        } catch (error) {
            console.error("Error loading cached analysis progress:", error);
        }
    }, [sessionId]);

    useEffect(() => {
        const fetchData = async () => {
            const uniqueIds = getUniqueTargetWordIgs(results.data);

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

        if (results.data.length > 0) fetchData();
    }, [results.data]);

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
        setMaxEnabledIndex((prev) => {
            const newMax = Math.max(prev, selectedWordIndex + 1);
            // Save to localStorage
            try {
                localStorage.setItem(maxEnabledKey, newMax.toString());
            } catch (error) {
                console.error("Error saving max enabled index:", error);
            }
            return newMax;
        });
    }, [selectedWordIndex, maxEnabledKey]);

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

        // Save to localStorage
        try {
            localStorage.setItem(progressKey, JSON.stringify(updTarget));
        } catch (error) {
            console.error("Error saving target progress:", error);
        }
    };

    // Function to clear cached progress (useful for testing or resetting)
    const clearCachedProgress = () => {
        try {
            localStorage.removeItem(progressKey);
            localStorage.removeItem(maxEnabledKey);
            setTargetProgress({});
            setMaxEnabledIndex(0);
        } catch (error) {
            console.error("Error clearing cached progress:", error);
        }
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

    // Get the session media URL for the full session audio player
    const getSessionMediaUrl = () => {
        if (sessions.item && sessions.item[0] && sessions.item[0].mediaFile) {
            return sessions.item[0].mediaFile.mediaFile;
        }
        return null;
    };

    const getSessionMediaFileName = () => {
        if (sessions.item && sessions.item[0] && sessions.item[0].mediaFile) {
            return (
                sessions.item[0].mediaFile.friendlyName ||
                sessions.item[0].mediaFile.mediaFile.split("/").pop()
            );
        }
        return "Audio";
    };

    const sessionMediaUrl = getSessionMediaUrl();
    const sessionMediaFileName = getSessionMediaFileName();

    return (
        <Container maxWidth={false} sx={styles.container}>
            {/* Header Section */}
            <Box sx={styles.headerBox}>
                <Box sx={styles.headerContent}>
                    <Box sx={styles.titleBox}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={styles.mainTitle}
                        >
                            Session Analysis
                        </Typography>
                        <Typography variant="body1" sx={styles.subtitle}>
                            Analyze phoneme-level performance and patterns
                        </Typography>
                    </Box>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            navigate(`/auth/results/${sessionId}/mapping`)
                        }
                        sx={styles.adjustMappingButton}
                    >
                        Adjust Mapping
                    </Button>
                </Box>

                {/* Session Audio Section */}
                <Box sx={styles.audioSection}>
                    <Typography sx={styles.sessionFileName}>
                        {`${t("analysisForUpload")}: ${sessionMediaFileName}`}
                    </Typography>
                    {sessionMediaUrl && (
                        <AudioPlayer
                            mediaUrl={sessionMediaUrl}
                            fileName={sessionMediaFileName}
                            playId="full-session"
                            showFileName={false}
                            showTime={true}
                            showStopButton={true}
                            size="small"
                            color="primary"
                        />
                    )}
                </Box>
            </Box>

            {/* Main Content Area */}
            <Box sx={styles.contentArea}>
                <Grid container sx={{ height: "100%" }}>
                    <Grid
                        item
                        xs={3}
                        sx={{
                            ...styles.sidebar,
                            minWidth: "280px",
                            maxWidth: "280px",
                            flexShrink: 0
                        }}
                    >
                        <Typography sx={styles.sidebarTitle}>
                            Target Words
                        </Typography>
                        <List sx={styles.targetWordsList}>
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
                                                ...styles.targetWordItem,
                                                ...(isSelected
                                                    ? styles.targetWordItemSelected
                                                    : styles.targetWordItemDefault),
                                                ...(isDisabled
                                                    ? styles.targetWordItemDisabled
                                                    : {})
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
                                                            isSelected
                                                                ? 700
                                                                : 400
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
                    <Grid
                        item
                        xs={9}
                        sx={{
                            ...styles.mainContent,
                            flex: 1,
                            minWidth: 0,
                            height: "100%"
                        }}
                    >
                        <InstanceList
                            setSelectedTarget={hdlSelectTargetWord}
                            hdlTargetChange={hdlTargetChange}
                        />
                    </Grid>
                </Grid>
            </Box>

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
        </Container>
    );
};

export default Analysis;
