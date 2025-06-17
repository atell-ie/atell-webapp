import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import actions from "../Store/actions";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton } from "@mui/material/";
import { DataGrid } from "@mui/x-data-grid";
import makeStyles from "@mui/styles/makeStyles";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import styles from "./styles.js";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import AppHeader from "../common/components/AppHeader";
import AppDialog from "../common/components/AppDialog";
import Stepper from "./Stepper";

const RowAction = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
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
    },
    {
        field: "age",
        headerName: "Age",
        width: 50,
        flex: 1
    },
    {
        field: "assignmentType",
        headerName: "Type",
        width: 100,
        flex: 1
    },
    {
        field: "impairmentType",
        headerName: "Impairment",
        width: 100,
        flex: 1
    },
    {
        field: "assignmentSource",
        headerName: "Source",
        width: 100,
        flex: 1
    },
    {
        field: "price",
        headerName: "Price",
        width: 50,
        flex: 1
    }
];

const Assignments = () => {
    const classes = makeStyles(styles)();

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { t } = useTranslation();
    const { assignments } = useSelector((state) => state);
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const handleClickOpen = () => {
        const types = ["error", "warning", "info", "success"];
        const random = Math.floor(Math.random() * 4);
        enqueueSnackbar(t("errors.geoLocationGet"), {
            variant: types[random]
        });
    };

    const hdlRowClick = (params) => {
        navigate(`${params.row.id}`);
    };

    const getRowSpacing = useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 2,
            bottom: params.isLastVisible ? 0 : 2
        };
    }, []);

    const hdlOpenDialog = () => {
        dispatch(actions.assignments.create.itemClear());
        setOpen(true);
    };
    const hdlDialogClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        dispatch(actions.assignments.create.getRequest());
    }, []);

    return (
        <>
            <AppHeader>
                <Button variant="contained" onClick={hdlOpenDialog}>
                    Add assignment
                </Button>
            </AppHeader>
            <Box
                sx={{
                    height: 600,
                    width: "100%"
                }}
            >
                <DataGrid
                    rows={assignments.data}
                    columns={columns}
                    className={classes.dataGridRoot}
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
            <AppDialog
                title="New assignment"
                open={open}
                size="sm"
                handleClose={hdlDialogClose}
            >
                <Stepper hdlDialogClose={hdlDialogClose} />
            </AppDialog>
        </>
    );
};

export default Assignments;
