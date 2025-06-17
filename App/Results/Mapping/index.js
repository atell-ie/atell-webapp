import React, { useState, useEffect, useCallback, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import actions from "../../Store/actions";
import useColumns from "./useColumns";
import { DataGrid } from "@mui/x-data-grid";

import { Box, Button, CircularProgress, Typography } from "@mui/material";

import AppContainer from "../../common/components/AppContainer";
import DoneIcon from "@mui/icons-material/Done";

import targets from "./targets";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import InfoIcon from "@mui/icons-material/Info";

import styles from "./styles";

const Mapping = () => {
    const { sessionId } = useParams();
    // const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [saving, setSaving] = useState(false);

    const { results } = useSelector((state) => state);

    const hdlFieldChange = useCallback((mappingId) => (e) => {
        const { value } = e.target;

        const index = results.byId[mappingId];

        const updMapping = [...results.data];
        updMapping[index].targetWord = value;

        dispatch(actions.results.create.updateData(updMapping));
    });

    const hdlAcceptMapping = async () => {
        setSaving(true);
        await dispatch(actions.results.create.patchResults(results.data));
        setSaving(false);
        navigate(`/auth/results/${sessionId}/analysis`, {
            state: results.data
        });
    };

    const columns = useColumns({
        onPlay: (row) => {
            // Implement play logic here if needed
            console.log("Play audio for:", row);
        },
        hdlFieldChange
    });

    return (
        <>
            <Box
                sx={{
                    background: "#f5f7fa",
                    borderRadius: 2,
                    padding: 2,
                    marginBottom: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 2
                }}
            >
                <InfoIcon color="primary" />
                <Typography variant="subtitle1" color="text.primary">
                    Please map found words against their targets (if exist)
                </Typography>
            </Box>
            <AppContainer>
                <DataGrid
                    rows={results.data}
                    columns={columns}
                    sx={styles.gridRoot}
                    pageSize={results.data.length}
                    rowsPerPageOptions={[]}
                    hideFooterSelectedRowCount={true}
                    hideFooterPagination={true}
                    hideFooter={true}
                />
            </AppContainer>

            <Box sx={{ padding: "1rem 0", textAlign: "right" }}>
                <Button
                    loading={saving}
                    loadingPosition="start"
                    startIcon={<DoneIcon />}
                    disableElevation
                    onClick={hdlAcceptMapping}
                    variant="contained"
                    sx={{ width: "10rem" }}
                >
                    Continue
                </Button>
            </Box>
        </>
    );
};

export default Mapping;
