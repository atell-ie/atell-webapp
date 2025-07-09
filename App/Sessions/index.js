import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";
import styles from "./styles";

import { Grid, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import AppHeader from "../common/components/AppHeader";
import AppContainer from "../common/components/AppContainer";
import UploadSession from "./UploadSession";
import useColumns from "./useColumns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Uploads = () => {
    const { journeyId } = useParams();
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const { sessions } = useSelector((state) => state);

    useEffect(() => {
        async function fetchSessions() {
            await dispatch(actions.sessions.create.getSessions(journeyId));
            setLoading(false);
        }
        async function fetchTargetList() {
            await dispatch(actions.targetWordsList.create.getTargetList());
            setLoading(false);
        }
        fetchTargetList();
        fetchSessions();
    }, []);

    const columns = useColumns();

    const hdlNewUpload = () => {
        setModalOpen(true);
    };

    const hdlClose = (e, reason) => {
        if (reason && reason == "backdropClick") return;
        setModalOpen(false);
    };

    return (
        <>
            <AppHeader>
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/auth/journeys")}
                            startIcon={<ArrowBackIcon />}
                        >
                            Back to Journey
                        </Button>
                    </Grid>
                    <Grid item xs />
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={hdlNewUpload}
                            disableElevation
                        >
                            {t("uploadSession")}
                        </Button>
                    </Grid>
                </Grid>
            </AppHeader>

            <AppContainer>
                <DataGrid
                    loading={loading}
                    rows={sessions.data}
                    getRowId={(row) => row.id}
                    sx={styles.gridRoot}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10
                            }
                        },
                        sorting: {
                            sortModel: [{ field: "createdDate", sort: "asc" }]
                        }
                    }}
                    disableColumnMenu
                    pageSizeOptions={[10]}
                    disableRowSelectionOnClick
                />
            </AppContainer>

            <UploadSession
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                hdlClose={hdlClose}
            />
        </>
    );
};

export default Uploads;
