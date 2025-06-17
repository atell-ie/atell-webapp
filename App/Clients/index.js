import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import * as Sentry from "@sentry/react";

import { DataGrid } from "@mui/x-data-grid";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Typography, TextField, Grid } from "@mui/material/";
import makeStyles from "@mui/styles/makeStyles";

import AppDialog from "../common/components/AppDialog";
import NewClientForm from "./NewClientForm";
import styles from "./styles.js";
import actions from "../Store/actions";

const columns = [
    // { field: "id", headerName: "ID", width: 90 },
    {
        field: "firstName",
        headerName: "First name",
        width: 150,
        editable: true
    },
    {
        field: "lastName",
        headerName: "Last name",
        width: 150,
        editable: true
    },
    {
        field: "preferredName",
        headerName: "Preferred name",
        width: 700,
        editable: true
    },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        width: 50,
        editable: true
    }
];

const formInitState = {
    name: "",
    surname: "",
    email: "",
    number: ""
};

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

export default function DataGridDemo() {
    const classes = makeStyles(styles)();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(formInitState);
    const [error, setError] = useState({ email: false });

    const { users } = useSelector((state) => state);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (e, reason) => {
        if (reason && reason == "backdropClick") return;
        setOpen(false);
    };

    const hdlRowClick = (params) => {
        console.log("row", params.row);
        navigate(`${params.row.id}`);
    };

    const hdlChange = (e) => {
        const { id, value } = e.target;
        setUser({ ...user, [id]: value });

        let hasError = false;
        if (id === "email") hasError = !validateEmail(value);
        else hasError = value === "";

        setError({ ...error, [id]: hasError });
    };

    const hdlSubmit = async () => {
        setLoading(true);
        await dispatch(actions.users.create.createRequest(user));
        handleClose();
        enqueueSnackbar(t("messages.newClientSuccess"), {
            variant: "success"
        });
        setLoading(false);
    };

    const getDialogActions = () => (
        <>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
                loading={loading}
                variant="contained"
                onClick={hdlSubmit}
            >
                Create
            </LoadingButton>
        </>
    );

    return (
        <>
            <Box className={classes.clientHeader}>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add client
                </Button>
            </Box>
            <Box
                sx={{
                    height: 600,
                    width: "100%"
                }}
            >
                <DataGrid
                    rows={users.data}
                    columns={columns}
                    pageSize={10}
                    className={classes.dataGridRoot}
                    rowsPerPageOptions={[10]}
                    disableSelectionOnClick
                    experimentalFeatures={{ newEditingApi: true }}
                    onRowClick={hdlRowClick}
                    // getRowClassName={(params) => `super-app-theme`}
                />
            </Box>
            <AppDialog
                title="Add new client"
                open={open}
                size="sm"
                handleClose={handleClose}
                dialogActions={getDialogActions}
            >
                <NewClientForm />
            </AppDialog>
        </>
    );
}
