import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";

import { Container, Box, Typography, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";

import AppDialog from "../common/components/AppDialog";
import WordsListForm from "./WordsListForm";
import useColumns from "./useColumns";
import styles from "./styles";

const WordsList = () => {
    const dispatch = useDispatch();

    const [wordListId, setWordListId] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const { targetWordsList } = useSelector((state) => state);

    useEffect(() => {
        async function fetchTargetList() {
            await dispatch(actions.targetWordsList.create.getTargetList());
            setLoading(false);
        }
        fetchTargetList();
    }, []);

    const hdlModalOpen = (listId) => () => {
        setWordListId(listId);
        if (listId === 0) {
            dispatch(actions.targetWordsList.create.itemClear());
        }
        setModalOpen(true);
    };

    const hdlModalClose = () => {
        setModalOpen(false);
    };

    const columns = useColumns(hdlModalOpen);

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
                            Word Lists
                        </Typography>
                        <Typography variant="body1" sx={styles.subtitle}>
                            Manage target word lists for speech therapy
                            exercises
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={hdlModalOpen(0)}
                        sx={styles.newListButton}
                    >
                        New targets list
                    </Button>
                </Box>

                {targetWordsList.data.length > 0 && (
                    <Box sx={styles.controlsBox}>
                        <Typography variant="body2" sx={styles.listCount}>
                            {targetWordsList.data.length} Word List
                            {targetWordsList.data.length !== 1 ? "s" : ""} Found
                        </Typography>
                    </Box>
                )}
            </Box>

            {/* Data Grid Section */}
            {targetWordsList.data.length > 0 ? (
                <Box sx={styles.dataGridContainer}>
                    <DataGrid
                        loading={loading}
                        rows={targetWordsList.data}
                        getRowId={(row) => row.id}
                        sx={styles.gridRoot}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 10
                                }
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
                            No Word Lists Found
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={styles.emptyStateMessage}
                        >
                            Get started by creating your first target word list.
                        </Typography>
                    </Box>
                )
            )}

            <AppDialog
                title={
                    wordListId === 0 ? "New target list" : "Edit target list"
                }
                size="lg"
                open={modalOpen}
                handleClose={hdlModalClose}
                dialogActions={null}
            >
                <WordsListForm
                    wordListId={wordListId}
                    hdlModalClose={hdlModalClose}
                />
            </AppDialog>
        </Container>
    );
};

export default WordsList;
