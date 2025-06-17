import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import actions from "../Store/actions";
import {
    Box,
    Button,
    Menu,
    MenuItem,
    Divider,
    IconButton,
    TextField
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import styles from "./styles.js";

import AppHeader from "../common/components/AppHeader";
import ReportsModal from "./ReportsModal";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const RowAction = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton id="action-button" onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id="demo-customized-menu"
                MenuListProps={{
                    "aria-labelledby": "demo-customized-button"
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose} disableRipple>
                    Edit
                </MenuItem>
                <Divider sx={{ my: 0.5 }} />
                <MenuItem onClick={handleClose} disableRipple>
                    Archive
                </MenuItem>
                <MenuItem onClick={handleClose} disableRipple>
                    More
                </MenuItem>
            </Menu>
        </>
    );
};

const columns = [
    {
        field: "name",
        headerName: "Name",
        width: 150,
        flex: 1
    }
];

const Reports = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogWindow, setDialogWindow] = useState("template"); //report | template
    const [loading, setLoading] = useState(true);

    const { reports } = useSelector((state) => state);

    const handleClickOpen = () => {
        const types = ["error", "warning", "info", "success"];
        const random = Math.floor(Math.random() * 4);
        enqueueSnackbar(t("errors.geoLocationGet"), {
            variant: types[random]
        });
    };

    const hdlRowClick = (params) => {
        console.log("row", params.row);
        navigate(`${params.row.id}`);
    };

    const getRowSpacing = useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 2,
            bottom: params.isLastVisible ? 0 : 2
        };
    }, []);

    const hdlShowTemplates = () => {
        setDialogWindow("template");
        setDialogOpen(true);
    };

    const hdlCreateReport = () => {
        setDialogWindow("report");
        setDialogOpen(true);
    };

    const hdlCloseDialog = () => {
        setDialogOpen(false);
    };

    useEffect(() => {
        dispatch(actions.reports.create.getRequest());
        dispatch(actions.reportTemplates.create.getRequest());
    }, []);

    return (
        <>
            <AppHeader>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Button variant="outlined" onClick={hdlShowTemplates}>
                        Templates
                    </Button>
                    <Button
                        variant="contained"
                        onClick={hdlCreateReport}
                        disableElevation
                    >
                        Create report
                    </Button>
                </Box>
            </AppHeader>
            <Box
                sx={{
                    height: 600,
                    width: "100%"
                }}
            >
                <DataGrid
                    rows={reports.data}
                    columns={columns}
                    sx={styles.dataGridRoot}
                    pageSize={10}
                    rowHeight={70}
                    getRowSpacing={getRowSpacing}
                    onRowClick={hdlRowClick}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    disableColumnMenu
                    onCellClick={(params, event) => {
                        if (params.field === "action") event.stopPropagation();
                    }}
                    experimentalFeatures={{ newEditingApi: true }}
                    // getRowClassName={(params) => `super-app-theme`}
                />
            </Box>
            <ReportsModal
                dialogOpen={dialogOpen}
                hdlCloseDialog={hdlCloseDialog}
                dialogWindow={dialogWindow}
            />
        </>
    );
};

export default Reports;
