import React, { memo, useMemo } from "react";
import { useSelector } from "react-redux";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { IconButton, TextField, MenuItem, Box, Chip } from "@mui/material";

const useColumns = ({ onPlay, hdlFieldChange }) => {
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

        return (
            <TextField
                id="outlined-select-target"
                select
                fullWidth
                size="small"
                defaultValue={defaultValue}
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

    return [
        {
            field: "play",
            headerName: "Play",
            minWidth: 80,
            align: "left",
            headerAlign: "left",
            sortable: false,
            renderCell: (params) => (
                <IconButton onClick={() => onPlay(params.row)}>
                    <PlayCircleOutlineIcon />
                </IconButton>
            )
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
