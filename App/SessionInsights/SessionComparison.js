import React, { useState } from "react";
import {
    Box,
    Grid,
    Typography,
    Paper,
    Card,
    CardContent,
    Divider,
    Chip,
    Collapse,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Alert
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhonemeSegment from "./PhonemeSegment";
import WordRow from "./WordRow";

const SessionComparison = ({ data }) => {
    const { sessionA, sessionB } = data;
    const [selectedWordIndex, setSelectedWordIndex] = useState(0);

    const getWordProgress = (wordA, wordB) => {
        if (!wordA || !wordB) return "unchanged";
        if (!wordA.instances || !wordB.instances) return "unchanged";

        const minInstances = Math.min(
            wordA.instances.length,
            wordB.instances.length
        );
        let totalChanges = 0;
        let improvements = 0;
        let regressions = 0;

        // Compare only matching instances
        for (let i = 0; i < minInstances; i++) {
            const instanceA = wordA.instances[i];
            const instanceB = wordB.instances[i];

            if (
                !instanceA ||
                !instanceB ||
                !instanceA.phonemes ||
                !instanceB.phonemes
            )
                continue;

            const minPhonemes = Math.min(
                instanceA.phonemes.length,
                instanceB.phonemes.length
            );

            for (let j = 0; j < minPhonemes; j++) {
                const phonemeA = instanceA.phonemes[j];
                const phonemeB = instanceB.phonemes[j];

                if (!phonemeA || !phonemeB) continue;

                totalChanges++;

                // Improvement: disorder -> correct
                if (
                    phonemeA.status !== "correct" &&
                    phonemeB.status === "correct"
                ) {
                    improvements++;
                }
                // Regression: correct -> disorder OR disorder type change
                else if (
                    (phonemeA.status === "correct" &&
                        phonemeB.status !== "correct") ||
                    (phonemeA.status !== "correct" &&
                        phonemeB.status !== "correct" &&
                        phonemeA.status !== phonemeB.status)
                ) {
                    regressions++;
                }
            }
        }

        if (improvements > regressions) return "improved";
        if (regressions > improvements) return "regressed";
        return "unchanged";
    };

    const getProgressColor = (progress) => {
        switch (progress) {
            case "improved":
                return "#f0f8f0";
            case "regressed":
                return "#fef5f5";
            default:
                return "#f5f5f5";
        }
    };

    const getProgressIcon = (progress) => {
        switch (progress) {
            case "improved":
                return "📈";
            case "regressed":
                return "📉";
            default:
                return "➡️";
        }
    };

    const renderInstancesForSession = (word, sessionLabel, sessionKey) => {
        if (!word || !word.instances) {
            return (
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    <Box
                        sx={{
                            p: 2,
                            textAlign: "center",
                            color: "text.secondary"
                        }}
                    >
                        No instances available
                    </Box>
                </Box>
            );
        }

        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {word.instances.map((instance, index) => {
                    if (!instance) return null;

                    return (
                        <Box
                            key={index}
                            sx={{
                                p: 2
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 0.5,
                                    justifyContent: "center",
                                    flexWrap: "wrap"
                                }}
                            >
                                {instance.phonemes &&
                                    instance.phonemes.map(
                                        (phoneme, phonemeIndex) => {
                                            if (!phoneme) return null;
                                            return (
                                                <PhonemeSegment
                                                    key={`${word.word}-${sessionKey}-${index}-${phonemeIndex}`}
                                                    segment={phoneme.segment}
                                                    status={phoneme.status}
                                                />
                                            );
                                        }
                                    )}
                            </Box>
                        </Box>
                    );
                })}

                {/* Show placeholder for missing instances */}
                {sessionKey === "A" &&
                    sessionB.words[selectedWordIndex] &&
                    sessionB.words[selectedWordIndex].instances &&
                    sessionB.words[selectedWordIndex].instances.length >
                        word.instances.length &&
                    Array.from({
                        length:
                            sessionB.words[selectedWordIndex].instances.length -
                            word.instances.length
                    }).map((_, index) => (
                        <Box
                            key={`placeholder-${index}`}
                            sx={{
                                p: 2,
                                textAlign: "center",
                                color: "text.disabled",
                                fontStyle: "italic"
                            }}
                        >
                            No instance available
                        </Box>
                    ))}

                {sessionKey === "B" &&
                    sessionA.words[selectedWordIndex] &&
                    sessionA.words[selectedWordIndex].instances &&
                    sessionA.words[selectedWordIndex].instances.length >
                        word.instances.length &&
                    Array.from({
                        length:
                            sessionA.words[selectedWordIndex].instances.length -
                            word.instances.length
                    }).map((_, index) => (
                        <Box
                            key={`placeholder-${index}`}
                            sx={{
                                p: 2,
                                textAlign: "center",
                                color: "text.disabled",
                                fontStyle: "italic"
                            }}
                        >
                            No instance available
                        </Box>
                    ))}
            </Box>
        );
    };

    if (!sessionA || !sessionB) {
        return (
            <Alert severity="warning">
                Missing session data. Please ensure both sessions are selected
                and have valid data.
            </Alert>
        );
    }

    if (!sessionA.words || !sessionB.words) {
        return (
            <Alert severity="info">
                No word data available for comparison. Sessions may not have
                analysis results yet.
            </Alert>
        );
    }

    return (
        <Grid container spacing={4}>
            {/* Word List */}
            <Grid item xs={12} md={3}>
                <Paper
                    elevation={2}
                    sx={{
                        p: 3,
                        height: "fit-content",
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "grey.200"
                    }}
                >
                    <Typography
                        variant="h6"
                        gutterBottom
                        sx={{
                            fontWeight: 600,
                            color: "text.primary",
                            mb: 3
                        }}
                    >
                        Words
                    </Typography>
                    <List sx={{ p: 0 }}>
                        {sessionA.words.map((wordA, index) => {
                            const wordB = sessionB.words[index];
                            const progress = getWordProgress(wordA, wordB);
                            return (
                                <ListItem
                                    key={index}
                                    disablePadding
                                    sx={{ mb: 1 }}
                                >
                                    <ListItemButton
                                        selected={selectedWordIndex === index}
                                        onClick={() =>
                                            setSelectedWordIndex(index)
                                        }
                                        sx={{
                                            borderRadius: 2,
                                            minHeight: 64,
                                            bgcolor:
                                                selectedWordIndex === index
                                                    ? "primary.50"
                                                    : progress === "improved"
                                                    ? "success.50"
                                                    : progress === "regressed"
                                                    ? "error.50"
                                                    : "transparent",
                                            border: "2px solid",
                                            borderColor:
                                                selectedWordIndex === index
                                                    ? "primary.main"
                                                    : progress === "improved"
                                                    ? "success.light"
                                                    : progress === "regressed"
                                                    ? "error.light"
                                                    : "grey.200",
                                            transition: "all 0.2s ease",
                                            "&:hover": {
                                                bgcolor:
                                                    selectedWordIndex === index
                                                        ? "primary.100"
                                                        : progress ===
                                                          "improved"
                                                        ? "success.100"
                                                        : progress ===
                                                          "regressed"
                                                        ? "error.100"
                                                        : "grey.50",
                                                transform: "translateY(-1px)",
                                                boxShadow: 2
                                            }
                                        }}
                                    >
                                        <ListItemText
                                            primary={
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                        py: 1
                                                    }}
                                                >
                                                    <Typography
                                                        variant="body1"
                                                        sx={{
                                                            fontWeight: 600,
                                                            fontSize: "1rem"
                                                        }}
                                                    >
                                                        {wordA.word}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 1
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="caption"
                                                            sx={{
                                                                fontSize: 11,
                                                                fontWeight: 500,
                                                                color:
                                                                    progress ===
                                                                    "improved"
                                                                        ? "success.dark"
                                                                        : progress ===
                                                                          "regressed"
                                                                        ? "error.dark"
                                                                        : "text.secondary"
                                                            }}
                                                        >
                                                            {progress ===
                                                            "improved"
                                                                ? "Better"
                                                                : progress ===
                                                                  "regressed"
                                                                ? "Worse"
                                                                : "No Change"}
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                fontSize: 14,
                                                                display: "flex",
                                                                alignItems:
                                                                    "center"
                                                            }}
                                                        >
                                                            {getProgressIcon(
                                                                progress
                                                            )}
                                                        </Box>
                                                    </Box>
                                                </Box>
                                            }
                                        />
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>
            </Grid>

            {/* Comparison Details */}
            <Grid item xs={12} md={9}>
                {selectedWordIndex < sessionA.words.length &&
                selectedWordIndex < sessionB.words.length ? (
                    <Box>
                        {/* Word Title Section */}
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                mb: 3,
                                borderRadius: 2,
                                background:
                                    "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)",
                                border: "1px solid",
                                borderColor: "primary.200",
                                position: "relative",
                                overflow: "hidden"
                            }}
                        >
                            {/* Subtle background pattern */}
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: 0,
                                    width: 100,
                                    height: 100,
                                    background:
                                        "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
                                    borderRadius: "50%",
                                    transform: "translate(30px, -30px)"
                                }}
                            />

                            <Box sx={{ position: "relative", zIndex: 1 }}>
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: {
                                            xs: "1.75rem",
                                            md: "2.125rem"
                                        },
                                        color: "primary.main",
                                        mb: 0.5,
                                        textAlign: "center"
                                    }}
                                >
                                    {sessionA.words[selectedWordIndex].word}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: "text.secondary",
                                        fontSize: "0.875rem",
                                        textAlign: "center",
                                        fontWeight: 400
                                    }}
                                >
                                    Phoneme comparison between sessions
                                </Typography>
                            </Box>
                        </Paper>

                        {/* Comparison Content */}
                        <Paper
                            elevation={2}
                            sx={{
                                borderRadius: 3,
                                overflow: "hidden",
                                border: "1px solid",
                                borderColor: "grey.200"
                            }}
                        >
                            <Grid container>
                                {/* Session A */}
                                <Grid item xs={12} md={5}>
                                    <Box
                                        sx={{
                                            p: 4,
                                            borderRight: { md: "1px solid" },
                                            borderRightColor: {
                                                md: "grey.200"
                                            },
                                            borderBottom: {
                                                xs: "1px solid",
                                                md: "none"
                                            },
                                            borderBottomColor: {
                                                xs: "grey.200"
                                            },
                                            minHeight: 300
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mb: 3
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: "50%",
                                                    bgcolor: "primary.main",
                                                    mr: 2
                                                }}
                                            />
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: "primary.main"
                                                }}
                                            >
                                                {sessionA.name}
                                            </Typography>
                                        </Box>
                                        {renderInstancesForSession(
                                            sessionA.words[selectedWordIndex],
                                            sessionA.name,
                                            "A"
                                        )}
                                    </Box>
                                </Grid>

                                {/* Arrow */}
                                <Grid item xs={12} md={2}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            minHeight: { xs: 60, md: 300 },
                                            bgcolor: "grey.50"
                                        }}
                                    >
                                        <ArrowForwardIcon
                                            sx={{
                                                color: "primary.main",
                                                fontSize: { xs: 32, md: 48 },
                                                transform: {
                                                    xs: "rotate(90deg)",
                                                    md: "none"
                                                }
                                            }}
                                        />
                                    </Box>
                                </Grid>

                                {/* Session B */}
                                <Grid item xs={12} md={5}>
                                    <Box sx={{ p: 4, minHeight: 300 }}>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                mb: 3
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    width: 12,
                                                    height: 12,
                                                    borderRadius: "50%",
                                                    bgcolor: "secondary.main",
                                                    mr: 2
                                                }}
                                            />
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: "secondary.main"
                                                }}
                                            >
                                                {sessionB.name}
                                            </Typography>
                                        </Box>
                                        {renderInstancesForSession(
                                            sessionB.words[selectedWordIndex],
                                            sessionB.name,
                                            "B"
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                ) : (
                    <Paper
                        elevation={1}
                        sx={{
                            p: 6,
                            textAlign: "center",
                            borderRadius: 3,
                            border: "1px solid",
                            borderColor: "grey.200"
                        }}
                    >
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            sx={{ mb: 2 }}
                        >
                            Select a word to compare
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Choose a word from the list to see detailed phoneme
                            comparison
                        </Typography>
                    </Paper>
                )}
            </Grid>
        </Grid>
    );
};

export default SessionComparison;
