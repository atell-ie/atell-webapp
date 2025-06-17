import React from "react";
import i18n from "i18next";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, IconButton } from "@mui/material/";
import { GridColDef } from "@mui/x-data-grid";

import CachedIcon from "@mui/icons-material/Cached";

const useColumns = () => {
    const navigate = useNavigate();
    const { typesList } = useSelector((state) => state);

    const { uploadStatus } = typesList;

    const getStatusCode = (statusId) => {
        const index = uploadStatus.byId[statusId];
        const status = uploadStatus.data[index];

        return status.code;
    };

    const hdllViewAnalysis = (uploadId) => () => {
        navigate(`${uploadId}/mapping`);
    };

    const columns: GridColDef[] = [
        {
            field: "friendlyName",
            headerName: i18n.t("uploadName"),
            minWidth: 250
        },
        {
            field: "mediaFile",
            headerName: i18n.t("filename"),
            minWidth: 250,
            renderCell: (params) => {
                const values = params.value.toString().split("/");
                return values[values.length - 1];
            }
        },
        {
            field: "size",
            headerName: i18n.t("size"),
            type: "number",
            align: "center",
            headerAlign: "center",
            minWidth: 150,
            renderCell: (params) => {
                return `⁠${(
                    parseFloat(params.row.size) /
                    (1024 * 1024)
                ).toFixed(2)}MB`;
            }
        },
        {
            field: "createdDate",
            headerName: i18n.t("uploadTime"),
            type: "number",
            align: "center",
            flex: 1,
            headerAlign: "center",
            minWidth: 100,
            renderCell: (params) => {
                const dateTime = dayjs(params.value);
                return dateTime.format("DD/MM/YYYY HH:mm");
            }
        },
        {
            field: "status",
            headerName: i18n.t("status"),
            headerAlign: "center",
            align: "center",
            flex: 1,
            minWidth: 100,
            renderCell: (params) => {
                const code = getStatusCode(params.value);

                if (code === "uploaded") {
                    return (
                        <Box
                            sx={{
                                display: "flex",
                                flexFlow: "row",
                                alignItems: "center"
                            }}
                        >
                            <Box>{code}</Box>
                            <IconButton>
                                <CachedIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    );
                } else {
                    return (
                        <Button
                            variant="text"
                            onClick={hdllViewAnalysis(params.row.id)}
                        >
                            View analysis
                        </Button>
                    );
                }
            }
        }
        // {
        //     field: "image",
        //     headerName: i18n.t("image"),
        //     type: "number",
        //     align: "center",
        //     headerAlign: "center",
        //     minWidth: 150,
        //     renderCell: (params) => {
        //         // const hdlImageViewClick = (imgPath) => () => {
        //         //     setViewImage(imgPath);
        //         //     setModalOpen(true);
        //         // };
        //         // return (
        //         //     <>
        //         //         <Button
        //         //             variant="text"
        //         //             onClick={hdlImageViewClick(params.value)}
        //         //         >
        //         //             {i18n.t("view")}
        //         //         </Button>
        //         //     </>
        //         // );
        //     }
        // },
        // {
        //     field: "qty",
        //     headerName: i18n.t("qty"),
        //     type: "number",
        //     minWidth: 50
        // }
    ];

    return columns;
};

export default useColumns;
