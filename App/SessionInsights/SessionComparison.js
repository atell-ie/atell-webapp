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
    Alert,
    Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import SettingsIcon from "@mui/icons-material/Settings";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import PhonemeSegment from "./PhonemeSegment";
import WordRow from "./WordRow";

const SessionComparison = ({
    data,
    progress,
    getSessionName,
    selectedSessionA,
    selectedSessionB,
    onConfigureClick,
    legendExpanded,
    onLegendToggle,
    legendItems
}) => {
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
                            p: 1,
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
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    maxWidth: "100%"
                }}
            >
                {word.instances.slice(0, 3).map((instance, index) => {
                    if (!instance) return null;

                    return (
                        <Box
                            key={index}
                            sx={{
                                p: 1,
                                bgcolor: "grey.50",
                                borderRadius: 1,
                                border: "1px solid",
                                borderColor: "grey.200"
                            }}
                        >
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "text.secondary",
                                    fontSize: "0.7rem",
                                    fontWeight: 500,
                                    mb: 1,
                                    display: "block"
                                }}
                            >
                                Instance {index + 1}
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 0.3,
                                    flexWrap: "wrap",
                                    justifyContent: "flex-start",
                                    maxWidth: "100%"
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

                {/* Show indicator for additional instances */}
                {word.instances.length > 3 && (
                    <Box
                        sx={{
                            p: 1,
                            textAlign: "center",
                            color: "text.secondary",
                            fontStyle: "italic",
                            fontSize: "0.8rem",
                            border: "1px dashed",
                            borderColor: "grey.300",
                            borderRadius: 1
                        }}
                    >
                        +{word.instances.length - 3} more instances
                    </Box>
                )}
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
        <Box>
            {/* Main Header Section */}
            <Paper
                elevation={1}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "grey.200",
                    bgcolor: "white"
                }}
            >
                {/* Title and Configure Button */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 3,
                        flexWrap: "wrap",
                        gap: 2
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                color: "text.primary",
                                mb: 0.5
                            }}
                        >
                            Session Insights
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "text.secondary",
                                mb: 0
                            }}
                        >
                            Compare phoneme-level performance between sessions
                            to track progress
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<SettingsIcon />}
                        onClick={onConfigureClick}
                        sx={{
                            fontWeight: 500,
                            textTransform: "none",
                            minWidth: 200
                        }}
                    >
                        Configure Comparison
                    </Button>
                </Box>

                {/* Session Comparison Row */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 2,
                        pt: 1
                    }}
                >
                    {/* Session Comparison */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            flexWrap: "wrap"
                        }}
                    >
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                        >
                            Comparing:
                        </Typography>
                        <Chip
                            label={getSessionName(selectedSessionA)}
                            variant="outlined"
                            sx={{
                                fontWeight: 500
                            }}
                        />
                        <ArrowForwardIcon
                            sx={{ color: "grey.500", fontSize: "1.2rem" }}
                        />
                        <Chip
                            label={getSessionName(selectedSessionB)}
                            variant="outlined"
                            sx={{
                                fontWeight: 500
                            }}
                        />

                        {/* Compact legend trigger */}
                        <IconButton
                            size="small"
                            onClick={onLegendToggle}
                            sx={{
                                ml: 1,
                                p: 0.5,
                                color: "text.secondary",
                                "&:hover": {
                                    bgcolor: "grey.100"
                                }
                            }}
                            title="Show/hide phoneme status legend"
                        >
                            <HelpOutlineIcon sx={{ fontSize: 16 }} />
                        </IconButton>
                    </Box>

                    {/* Progress Summary */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            flexWrap: "wrap"
                        }}
                    >
                        <Chip
                            size="small"
                            label={`+${progress?.improvedSegments || 0}`}
                            color="success"
                            variant="outlined"
                            sx={{
                                fontWeight: 600
                            }}
                        />
                        <Chip
                            size="small"
                            label={`-${progress?.regressed || 0}`}
                            color="error"
                            variant="outlined"
                            sx={{
                                fontWeight: 600
                            }}
                        />
                        <Typography
                            sx={{
                                fontWeight: 600,
                                color: "text.primary",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {progress?.improvementRate}% improvement
                        </Typography>
                    </Box>
                </Box>

                {/* Phoneme Status Legend (Collapsible) */}
                <Collapse in={legendExpanded}>
                    <Box
                        sx={{
                            mt: 2,
                            p: 2
                        }}
                    >
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                            Phoneme Status Legend:
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                flexWrap: "wrap"
                            }}
                        >
                            {legendItems?.map((item, index) => (
                                <Box
                                    key={index}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5
                                    }}
                                >
                                    <PhonemeSegment
                                        segment={item.segment}
                                        status={item.status}
                                    />
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        {item.label}
                                    </Typography>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                </Collapse>
            </Paper>

            {/* Body Section - Words and Content */}
            <Paper
                elevation={1}
                sx={{
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "grey.200",
                    bgcolor: "white",
                    overflow: "hidden"
                }}
            >
                <Grid container spacing={0}>
                    {/* Word List */}
                    <Grid item xs={12} md={4} lg={3}>
                        <Box
                            sx={{
                                backgroundColor: "#f8f9fa",
                                borderRight: "1px solid #e8e8e8",
                                p: 2,
                                height: "fit-content",
                                minHeight: "500px"
                            }}
                        >
                            <Typography
                                sx={{
                                    fontWeight: 600,
                                    color: "#333",
                                    mb: 2,
                                    fontSize: "1.1rem"
                                }}
                            >
                                Target Words
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "text.secondary",
                                    fontSize: "0.85rem",
                                    fontWeight: 400,
                                    mb: 2,
                                    display: "block"
                                }}
                            >
                                Select to analyze
                            </Typography>
                            <Box
                                sx={{
                                    maxHeight: 500,
                                    overflow: "auto"
                                }}
                            >
                                {sessionA.words.map((wordA, index) => {
                                    const wordB = sessionB.words[index];
                                    const progress = getWordProgress(
                                        wordA,
                                        wordB
                                    );
                                    return (
                                        <Box
                                            key={index}
                                            onClick={() =>
                                                setSelectedWordIndex(index)
                                            }
                                            sx={{
                                                mb: 1,
                                                borderRadius: "8px",
                                                transition: "all 0.2s ease",
                                                cursor: "pointer",
                                                border: "1px solid transparent",
                                                p: 2,
                                                backgroundColor:
                                                    selectedWordIndex === index
                                                        ? "#e3f2fd"
                                                        : "#fff",
                                                borderColor:
                                                    selectedWordIndex === index
                                                        ? "#1976d2"
                                                        : "transparent",
                                                boxShadow:
                                                    selectedWordIndex === index
                                                        ? "0 2px 4px rgba(25, 118, 210, 0.15)"
                                                        : "none",
                                                "&:hover": {
                                                    backgroundColor:
                                                        selectedWordIndex ===
                                                        index
                                                            ? "#e3f2fd"
                                                            : "#f5f5f5",
                                                    borderColor:
                                                        selectedWordIndex ===
                                                        index
                                                            ? "#1976d2"
                                                            : "#ddd"
                                                }
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-between",
                                                    mb: 0.5
                                                }}
                                            >
                                                <Typography
                                                    variant="body1"
                                                    sx={{
                                                        fontWeight:
                                                            selectedWordIndex ===
                                                            index
                                                                ? 700
                                                                : 400,
                                                        color:
                                                            selectedWordIndex ===
                                                            index
                                                                ? "primary.main"
                                                                : "text.primary",
                                                        fontSize:
                                                            selectedWordIndex ===
                                                            index
                                                                ? 16
                                                                : 14
                                                    }}
                                                >
                                                    {wordA.word}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: "50%",
                                                        bgcolor:
                                                            progress ===
                                                            "improved"
                                                                ? "success.main"
                                                                : progress ===
                                                                  "regressed"
                                                                ? "error.main"
                                                                : "grey.400"
                                                    }}
                                                />
                                            </Box>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontSize: "0.72rem",
                                                    color:
                                                        progress === "improved"
                                                            ? "success.dark"
                                                            : progress ===
                                                              "regressed"
                                                            ? "error.dark"
                                                            : "text.secondary",
                                                    fontWeight: 400,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.5px"
                                                }}
                                            >
                                                {progress === "improved"
                                                    ? "Improved"
                                                    : progress === "regressed"
                                                    ? "Regressed"
                                                    : "No Change"}
                                            </Typography>
                                        </Box>
                                    );
                                })}
                            </Box>
                        </Box>
                    </Grid>

                    {/* Comparison Details */}
                    <Grid item xs={12} md={8} lg={9}>
                        {selectedWordIndex < sessionA.words.length &&
                        selectedWordIndex < sessionB.words.length ? (
                            <Box sx={{ width: "100%", padding: "1rem" }}>
                                <Grid container spacing={0}>
                                    {/* Session A */}
                                    <Grid item xs={12} md={5}>
                                        <Box
                                            sx={{
                                                p: 1,
                                                minHeight: 250,
                                                maxWidth: "100%",
                                                overflow: "hidden"
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
                                                sessionA.words[
                                                    selectedWordIndex
                                                ],
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
                                                minHeight: {
                                                    xs: 40,
                                                    md: 250
                                                },
                                                py: 2
                                            }}
                                        >
                                            <ArrowForwardIcon
                                                sx={{
                                                    color: "primary.main",
                                                    fontSize: {
                                                        xs: 28,
                                                        md: 36
                                                    },
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
                                        <Box
                                            sx={{
                                                p: 1,
                                                minHeight: 250,
                                                maxWidth: "100%",
                                                overflow: "hidden"
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
                                                        bgcolor:
                                                            "secondary.main",
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
                                                sessionB.words[
                                                    selectedWordIndex
                                                ],
                                                sessionB.name,
                                                "B"
                                            )}
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        ) : (
                            <Box
                                sx={{
                                    p: 2,
                                    textAlign: "center"
                                }}
                            >
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{ mb: 2 }}
                                >
                                    Select a word to compare
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Choose a word from the list to see detailed
                                    phoneme comparison
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    );
};

export default SessionComparison;
