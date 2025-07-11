import React from "react";
import { Button } from "@mui/material";

const useColumns = (hdlModalOpen) => {
    const columns = [
        {
            field: "name",
            headerName: "Name",
            minWidth: 300,
            flex: 1
        },
        {
            field: "wordCount",
            headerName: "Words",
            type: "number",
            align: "center",
            headerAlign: "center",
            width: 120,
            renderCell: (params) => {
                const count = Array.isArray(params.row.words)
                    ? params.row.words.length
                    : 0;
                return count;
            }
        },
        {
            field: "action",
            headerName: "Action",
            align: "center",
            headerAlign: "center",
            width: 150,
            sortable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                return (
                    <Button
                        variant="text"
                        onClick={hdlModalOpen(params.row.id)}
                        sx={{
                            textTransform: "none",
                            fontWeight: 500,
                            color: "#1976d2",
                            "&:hover": {
                                backgroundColor: "rgba(25, 118, 210, 0.04)"
                            }
                        }}
                    >
                        Edit list
                    </Button>
                );
            }
        }
    ];

    return columns;
};

export default useColumns;
