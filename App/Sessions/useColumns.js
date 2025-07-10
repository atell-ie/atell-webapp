import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import { AudioPlayer } from "../common/components";

const useColumns = () => {
    const navigate = useNavigate();

    const columns = [
        {
            field: "sessionDate",
            headerName: "Date",
            minWidth: 180,
            renderCell: (params) => {
                return dayjs(params.value).format("MMM D, YYYY HH:mm");
            }
        },
        {
            field: "mediaFile",
            headerName: "Recording",
            minWidth: 300,
            flex: 1,
            renderCell: (params) => {
                const mediaFile = params.value;
                return (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            height: "100%"
                        }}
                    >
                        <AudioPlayer
                            mediaUrl={mediaFile.mediaFile}
                            fileName={mediaFile.friendlyName}
                            playId={params.row.id}
                            showFileName={true}
                            showTime={true}
                            size="small"
                            color="primary"
                        />
                    </Box>
                );
            }
        },
        {
            field: "length",
            headerName: "Duration",
            minWidth: 120,
            renderCell: (params) => {
                return params.row.mediaFile.length;
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 140,
            align: "right",
            headerAlign: "right",
            renderCell: (params) => {
                return (
                    <Button
                        variant="text"
                        size="small"
                        startIcon={<AnalyticsIcon />}
                        onClick={() =>
                            navigate(`/auth/results/${params.row.id}/mapping`)
                        }
                    >
                        View Analysis
                    </Button>
                );
            }
        }
    ];

    return columns;
};

export default useColumns;
