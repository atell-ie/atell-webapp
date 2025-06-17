import React from "react";
import { Button } from "@mui/material";

const useColumns = (hdlModalOpen) => {
    const columns = [
        {
            field: "name",
            headerName: "Name",
            minWidth: 250,
            flex: 1
        },
        {
            field: "wordCount",
            headerName: "Words",
            type: "number",
            align: "center",
            headerAlign: "center",
            minWidth: 100,
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
            type: "number",
            align: "center",
            headerAlign: "center",
            minWidth: 100,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Button
                        variant="text"
                        onClick={hdlModalOpen(params.row.id)}
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
