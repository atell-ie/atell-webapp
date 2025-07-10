import React, { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import actions from "../../Store/actions";
import useColumns from "./useColumns";
import { DataGrid } from "@mui/x-data-grid";

import { Box, Button, Typography, Chip } from "@mui/material";

import AppContainer from "../../common/components/AppContainer";
import DoneIcon from "@mui/icons-material/Done";

import InfoIcon from "@mui/icons-material/Info";

import styles from "./styles";

const Mapping = () => {
    const { sessionId } = useParams();
    // const { t } = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [saving, setSaving] = useState(false);

    const { results } = useSelector((state) => state);

    console.log("results.data", results.data);

    // Generate speaker colors for legend (matching the colors in useColumns)
    const speakerLegendColors = useMemo(() => {
        const speakers = [
            ...new Set(
                results.data?.map((item) => item.speaker).filter(Boolean)
            )
        ];
        const colors = [
            "#E3F2FD", // Light Blue
            "#E8F5E8", // Light Green
            "#FFF3E0", // Light Orange
            "#FFEBEE", // Light Red
            "#F1F8E9", // Light Lime
            "#E0F2F1", // Light Teal
            "#FFF8E1" // Light Yellow (replaced pink)
        ];

        return speakers.reduce((acc, speaker, index) => {
            acc[speaker] = colors[index % colors.length];
            return acc;
        }, {});
    }, [results.data]);

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
        hdlFieldChange
    });

    // Combined Info and Speaker Legend Component
    const InfoAndSpeakerSection = () => {
        const speakers = [
            ...new Set(
                results.data?.map((item) => item.speaker).filter(Boolean)
            )
        ];
        const hasSpeakers = speakers.length > 1;

        return (
            <Box
                sx={{
                    background: "#f5f7fa",
                    borderRadius: "0.3rem",
                    padding: 2,
                    marginBottom: 2,
                    display: "flex",
                    flexDirection: hasSpeakers ? "column" : "row",
                    alignItems: hasSpeakers ? "flex-start" : "center",
                    gap: hasSpeakers ? 1.5 : 2
                }}
            >
                {/* Info Message */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >
                    <InfoIcon color="primary" />
                    <Typography variant="subtitle1" color="text.primary">
                        Map found words against their targets (if exist)
                    </Typography>
                </Box>

                {/* Speaker Legend */}
                {hasSpeakers && (
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1,
                            flexWrap: "wrap",
                            alignItems: "center",
                            paddingLeft: 4 // Align with text above
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                fontWeight: 500,
                                marginRight: 1,
                                color: "text.secondary"
                            }}
                        >
                            Speakers:
                        </Typography>
                        {speakers.map((speaker, index) => (
                            <Chip
                                key={speaker}
                                label={speaker}
                                size="small"
                                sx={{
                                    backgroundColor:
                                        speakerLegendColors[speaker] ||
                                        "#F5F5F5",
                                    color: "#333",
                                    fontWeight: 500,
                                    fontSize: "0.75rem"
                                }}
                            />
                        ))}
                    </Box>
                )}
            </Box>
        );
    };

    return (
        <>
            <InfoAndSpeakerSection />

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
