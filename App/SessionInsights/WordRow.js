import React from "react";
import { Box, Typography, Grid, Paper, Alert } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhonemeSegment from "./PhonemeSegment";

const WordRow = ({ wordA, wordB }) => {
    const getWordProgress = () => {
        if (!wordA || !wordB) return "unchanged";

        // Calculate total errors across all instances
        const errorsA = wordA.instances.reduce((total, instance) => {
            return (
                total +
                instance.phonemes.filter((p) => p.status !== "correct").length
            );
        }, 0);

        const errorsB = wordB.instances.reduce((total, instance) => {
            return (
                total +
                instance.phonemes.filter((p) => p.status !== "correct").length
            );
        }, 0);

        if (errorsA > errorsB) return "improved";
        if (errorsA < errorsB) return "regressed";
        return "unchanged";
    };

    const progress = getWordProgress();

    const getProgressColor = () => {
        switch (progress) {
            case "improved":
                return "#e8f5e8";
            case "regressed":
                return "#ffebee";
            default:
                return "#f5f5f5";
        }
    };

    const renderInstancesForSession = (word, sessionLabel) => {
        return (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {word.instances.map((instance, index) => (
                    <Box
                        key={index}
                        sx={{
                            border: "1px solid #e0e0e0",
                            borderRadius: 1,
                            p: 1,
                            bgcolor: "background.paper"
                        }}
                    >
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 0.5, display: "block" }}
                        >
                            {sessionLabel} - Instance {index + 1}{" "}
                            {instance.timestamp && `(${instance.timestamp})`}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 0.5,
                                justifyContent: "center",
                                flexWrap: "wrap"
                            }}
                        >
                            {instance.phonemes.map((phoneme, phonemeIndex) => (
                                <PhonemeSegment
                                    key={`${word.word}-${index}-${phonemeIndex}`}
                                    segment={phoneme.segment}
                                    status={phoneme.status}
                                />
                            ))}
                        </Box>
                    </Box>
                ))}

                {/* Show placeholder for missing instances if there's a mismatch */}
                {word === wordA &&
                    wordB.instances.length > wordA.instances.length &&
                    Array.from({
                        length: wordB.instances.length - wordA.instances.length
                    }).map((_, index) => (
                        <Box
                            key={`missing-${index}`}
                            sx={{
                                border: "1px dashed #ccc",
                                borderRadius: 1,
                                p: 1,
                                bgcolor: "#f9f9f9",
                                textAlign: "center"
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontStyle: "italic" }}
                            >
                                No corresponding instance
                            </Typography>
                        </Box>
                    ))}

                {word === wordB &&
                    wordA.instances.length > wordB.instances.length &&
                    Array.from({
                        length: wordA.instances.length - wordB.instances.length
                    }).map((_, index) => (
                        <Box
                            key={`missing-${index}`}
                            sx={{
                                border: "1px dashed #ccc",
                                borderRadius: 1,
                                p: 1,
                                bgcolor: "#f9f9f9",
                                textAlign: "center"
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                sx={{ fontStyle: "italic" }}
                            >
                                No corresponding instance
                            </Typography>
                        </Box>
                    ))}
            </Box>
        );
    };

    const hasInstanceMismatch =
        wordA.instances.length !== wordB.instances.length;

    return (
        <Paper
            sx={{
                p: 2,
                bgcolor: getProgressColor(),
                border:
                    progress === "improved"
                        ? "2px solid #4caf50"
                        : progress === "regressed"
                        ? "2px solid #f44336"
                        : "1px solid #e0e0e0"
            }}
        >
            {hasInstanceMismatch && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                        Instance count mismatch: Session A has{" "}
                        {wordA.instances.length} instance
                        {wordA.instances.length !== 1 ? "s" : ""}, Session B has{" "}
                        {wordB.instances.length} instance
                        {wordB.instances.length !== 1 ? "s" : ""}. Only matching
                        instances are compared for progress calculation.
                    </Typography>
                </Alert>
            )}

            <Grid container spacing={2} alignItems="flex-start">
                {/* Word Label */}
                <Grid item xs={12} md={2}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            gap: 1
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: "bold",
                                textAlign: "center",
                                color: "text.primary"
                            }}
                        >
                            {wordA.word}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            A: {wordA.instances.length} | B:{" "}
                            {wordB.instances.length} instances
                        </Typography>
                        {hasInstanceMismatch && (
                            <Typography
                                variant="caption"
                                color="warning.main"
                                sx={{ fontWeight: "bold" }}
                            >
                                ⚠️ Unequal
                            </Typography>
                        )}
                    </Box>
                </Grid>

                {/* Session A Instances */}
                <Grid item xs={12} md={5}>
                    {renderInstancesForSession(wordA, "Session A")}
                </Grid>

                {/* Arrow */}
                <Grid item xs={12} md={1}>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            height: "100%",
                            alignItems: "center"
                        }}
                    >
                        <ArrowForwardIcon
                            sx={{
                                color:
                                    progress === "improved"
                                        ? "success.main"
                                        : progress === "regressed"
                                        ? "error.main"
                                        : "text.secondary"
                            }}
                        />
                    </Box>
                </Grid>

                {/* Session B Instances */}
                <Grid item xs={12} md={4}>
                    {renderInstancesForSession(wordB, "Session B")}
                </Grid>
            </Grid>
        </Paper>
    );
};

export default WordRow;
