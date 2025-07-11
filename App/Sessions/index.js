import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";
import styles from "./styles";

import { Container, Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import UploadSession from "./UploadSession";
import useColumns from "./useColumns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
        <Container maxWidth={false} sx={styles.container}>
            {/* Header Section */}
            <Box sx={styles.headerBox}>
                <Box sx={styles.headerContent}>
                    <Box sx={styles.titleBox}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={styles.mainTitle}
                        >
                            Sessions
                        </Typography>
                        <Typography variant="body1" sx={styles.subtitle}>
                            Manage therapy session recordings and analysis
                        </Typography>
                    </Box>
                    <Box sx={styles.buttonGroup}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate("/auth/journeys")}
                            startIcon={<ArrowBackIcon />}
                            sx={styles.backButton}
                        >
                            Back to Journey
                        </Button>
                        <Button
                            variant="contained"
                            onClick={hdlNewUpload}
                            startIcon={<CloudUploadIcon />}
                            sx={styles.uploadButton}
                        >
                            {t("uploadSession")}
                        </Button>
                    </Box>
                </Box>

                {sessions.data.length > 0 && (
                    <Box sx={styles.controlsBox}>
                        <Typography variant="body2" sx={styles.sessionCount}>
                            {sessions.data.length} Session
                            {sessions.data.length !== 1 ? "s" : ""} Found
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Data Grid Section */}
            {sessions.data.length > 0 ? (
                <Box sx={styles.dataGridContainer}>
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
                                sortModel: [
                                    { field: "createdDate", sort: "asc" }
                                ]
                            }
                        }}
                        disableColumnMenu
                        pageSizeOptions={[10]}
                        disableRowSelectionOnClick
                    />
                </Box>
            ) : (
                !loading && (
                    <Box sx={styles.emptyStateBox}>
                        <Typography
                            variant="h6"
                            component="h2"
                            sx={styles.emptyStateTitle}
                        >
                            No Sessions Found
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={styles.emptyStateMessage}
                        >
                            Get started by uploading your first therapy session.
                        </Typography>
                    </Box>
                )
            )}

            <UploadSession
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
                hdlClose={hdlClose}
            />
        </Container>
    );
};

export default Uploads;
