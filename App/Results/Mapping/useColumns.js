import React, { memo } from "react";
import { useSelector } from "react-redux";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import { IconButton, TextField, MenuItem } from "@mui/material";

const useColumns = ({ onPlay, hdlFieldChange }) => {
    const { wordsList } = useSelector((state) => state);

    const DropDown = memo(({ mappingId, defaultValue }) => (
        <TextField
            id="outlined-select-target"
            select
            fullWidth
            size="small"
            defaultValue={defaultValue}
            onChange={hdlFieldChange(mappingId)}
            sx={{ paddingTop: "0.3rem" }}
        >
            {wordsList.data.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                    {option.word}
                </MenuItem>
            ))}
            <MenuItem key={0} value={0}>
                None
            </MenuItem>
        </TextField>
    ));

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
            flex: 1,
            minWidth: 150,
            renderCell: (params) => params.row.foundWord
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
