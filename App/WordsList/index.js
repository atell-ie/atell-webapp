import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";

import { Grid, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import AppHeader from "../common/components/AppHeader";
import AppContainer from "../common/components/AppContainer";
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
        <>
            <AppHeader>
                <Grid container sx={{ textAlign: "right" }}>
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            onClick={hdlModalOpen(0)}
                            disableElevation
                        >
                            New targets list
                        </Button>
                    </Grid>
                </Grid>
            </AppHeader>

            <AppContainer>
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
            </AppContainer>
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
        </>
    );
};

export default WordsList;
