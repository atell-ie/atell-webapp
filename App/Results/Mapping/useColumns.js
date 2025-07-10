import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import { TextField, MenuItem, Box, Chip } from "@mui/material";
import { AudioPlayer } from "../../common/components";

const useColumns = ({ hdlFieldChange }) => {
    const { targetWordsList, results, sessions } = useSelector(
        (state) => state
    );

    // Generate speaker colors based on unique speakers in the data
    const speakerColors = useMemo(() => {
        const speakers = [
            ...new Set(
                results.data?.map((item) => item.speaker).filter(Boolean)
            )
        ];
        const colors = [
            "#E3F2FD", // Light Blue
            "#E8F5E8", // Light Green
            "#FFF3E0", // Light Orange
            "#FFEBEE", // Light Red
            "#F1F8E9", // Light Lime
            "#E0F2F1", // Light Teal
            "#FFF8E1" // Light Yellow (replaced pink)
        ];

        return speakers.reduce((acc, speaker, index) => {
            acc[speaker] = colors[index % colors.length];
            return acc;
        }, {});
    }, [results.data]);

    const DropDown = memo(({ mappingId, defaultValue }) => {
        // Use the target words list from the session instead of general targetWordsList
        const getSessionWordList = () => {
            if (
                sessions.item &&
                sessions.item[0] &&
                sessions.item[0].wordList
            ) {
                const wordListId = sessions.item[0].wordList;
                const targetListIndex = targetWordsList.byId[wordListId];
                if (
                    targetListIndex !== undefined &&
                    targetWordsList.data[targetListIndex]
                ) {
                    return targetWordsList.data[targetListIndex].words || [];
                }
            }
            return []; // Return empty array if no session word list found
        };

        const sessionWordList = getSessionWordList();

        // Get all valid option IDs (session word list + None option)
        const validOptionIds = [
            ...sessionWordList.map((option) => option.id),
            0
        ];

        // Validate defaultValue - if it doesn't exist in valid options, fall back to 0 (None)
        const validatedDefaultValue = validOptionIds.includes(defaultValue)
            ? defaultValue
            : 0;

        return (
            <TextField
                id="outlined-select-target"
                select
                fullWidth
                size="small"
                defaultValue={validatedDefaultValue}
                onChange={hdlFieldChange(mappingId)}
                sx={{ paddingTop: "0.3rem" }}
            >
                {sessionWordList.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.word}
                    </MenuItem>
                ))}
                <MenuItem key={0} value={0}>
                    None
                </MenuItem>
            </TextField>
        );
    });

    // Get the session media URL for the audio player
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

    return [
        {
            field: "play",
            headerName: "Play",
            minWidth: 100,
            align: "left",
            headerAlign: "left",
            sortable: false,
            renderCell: (params) => {
                if (!sessionMediaUrl) {
                    return null; // No audio available
                }
                return (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%"
                        }}
                    >
                        <AudioPlayer
                            mediaUrl={sessionMediaUrl}
                            fileName={sessionMediaFileName}
                            playId={`word-${params.row.id}`}
                            showFileName={false}
                            showTime={false}
                            showStopButton={false}
                            startTime={params.row.startTime}
                            endTime={params.row.endTime}
                            size="small"
                            color="primary"
                        />
                    </Box>
                );
            }
        },
        {
            field: "foundWord",
            headerName: "Found word",
            minWidth: 120,
            renderCell: (params) => params.row.foundWord
        },
        {
            field: "speaker",
            headerName: "Speaker",
            minWidth: 120,
            flex: 1,
            align: "left",
            headerAlign: "left",
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                        height: "100%"
                    }}
                >
                    <Chip
                        label={params.row.speaker || "Unknown"}
                        size="small"
                        sx={{
                            backgroundColor:
                                speakerColors[params.row.speaker] || "#F5F5F5",
                            color: "#333",
                            fontWeight: 500
                        }}
                    />
                </Box>
            )
        },
        {
            field: "targetWord",
            headerName: "Target word",
            minWidth: 200,
            align: "left",
            headerAlign: "left",
            sortable: false,
            renderCell: (params) => (
                <DropDown
                    mappingId={params.row.id}
                    defaultValue={
                        params.row.targetWord === null
                            ? 0
                            : params.row.targetWord
                    }
                />
            )
        },
        {
            field: "score",
            headerName: "Score",
            minWidth: 100,
            align: "right",
            headerAlign: "right",
            renderCell: (params) => params.row.score
        }
    ];
};

export default useColumns;
