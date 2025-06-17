import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Box,
    Grid,
    Badge,
    Button,
    IconButton,
    Typography,
    Divider
} from "@mui/material";
import actions from "../../Store/actions";

import WavesIcon from "@mui/icons-material/Waves";
import EditNoteIcon from "@mui/icons-material/EditNote";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";

import InstancePhoneme from "./InstancePhoneme";
import Results from "./Results";
import AppModal from "../../common/components/AppModal";

const InstanceList = ({ setSelectedTarget, hdlTargetChange }) => {
    const dispatch = useDispatch();

    const [modal, setModal] = useState({
        open: false,
        type: "" // spectogram , results
    });

    const [note, setNote] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [noteOpen, setNoteOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const [wordInstances, setWordInstances] = useState([]);

    const { results, resultsManager, wordsList } = useSelector(
        (state) => state
    );

    const { targetWordInstances, selectedWordIndex, selectedTargetWordId } =
        resultsManager;

    useEffect(() => {
        const [key, resultTargets] = getWordInstances(selectedWordIndex);
        setWordInstances(resultTargets ? resultTargets : []);
        if (setSelectedTarget) setSelectedTarget(key);
    }, [targetWordInstances]);

    const targetName = useMemo(() => {
        const index = wordsList.byId[selectedTargetWordId];

        const word =
            index !== undefined ? wordsList.data[index] : { word: "", ipa: "" };

        return word.word;
    }, [selectedTargetWordId]);

    const hdlSpectogramClick = () => {
        setModal({
            open: true,
            type: "spectogram"
        });
    };

    const hdlModalClose = () => {
        setModal({
            open: false,
            type: ""
        });
    };

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setNoteOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    const getWordInstances = (index) => {
        const keys = Object.keys(targetWordInstances);
        const keyAtIndex = keys[index];
        return [keyAtIndex, targetWordInstances[keyAtIndex]];
    };

    const hdlFinishClick = () => {
        setModal({
            open: true,
            type: "results"
        });
    };

    const isLastTarget =
        selectedWordIndex === Object.keys(targetWordInstances).length - 1;

    const handleContinue = () => {
        hdlTargetChange(selectedWordIndex + 1)();
    };

    return (
        <Box sx={{ padding: "0 0 0 3rem", height: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    padding: "1rem 0"
                }}
            >
                <Box>
                    <Typography
                        variant="h6"
                        sx={{ mb: 2, color: "text.secondary" }}
                    >
                        Found instances: <b>{targetName}</b>
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "end"
                    }}
                >
                    <Button
                        variant="outlined"
                        sx={{ marginRight: "1rem" }}
                        onClick={hdlTargetChange(selectedWordIndex - 1)}
                        disabled={!selectedWordIndex}
                    >
                        Previous
                    </Button>

                    <Button variant="contained" onClick={handleContinue}>
                        {isLastTarget ? "Finish" : "Continue"}
                    </Button>
                </Box>
            </Box>
            <Divider sx={{ marginBottom: "1.5rem" }} />

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {wordInstances.map((instance, instanceIndex) => {
                    return (
                        <Box
                            key={instance.id}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                background: "#fff",
                                borderRadius: 2,
                                boxShadow: 2,
                                p: 2,
                                transition: "box-shadow 0.2s",
                                "&:hover": { boxShadow: 6 }
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1,
                                    minWidth: 120
                                }}
                            >
                                <IconButton
                                    onClick={hdlSpectogramClick}
                                    color="primary"
                                    title="Show spectrogram"
                                >
                                    <WavesIcon />
                                </IconButton>
                                <InstancePhoneme instanceId={instance.id} />
                            </Box>
                            <Box sx={{ flexGrow: 1 }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 1
                                }}
                            >
                                <IconButton color="success" title="Play audio">
                                    <PlayCircleOutlineIcon />
                                </IconButton>
                                <IconButton
                                    aria-label="add-note"
                                    onClick={handleClick("bottom")}
                                    color="secondary"
                                    title="Add note"
                                >
                                    <Badge
                                        color="secondary"
                                        variant="dot"
                                        invisible={!note}
                                    >
                                        <EditNoteIcon />
                                    </Badge>
                                </IconButton>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <AppModal
                isVisible={modal.open}
                title={
                    modal.type === "spectogram"
                        ? "Spectorgram"
                        : "Summary of identified disorders"
                }
                onClose={hdlModalClose}
            >
                {modal.type === "spectogram" ? (
                    <div>Spectrogram content here</div>
                ) : (
                    <Results />
                )}
            </AppModal>
        </Box>
    );
};

export default InstanceList;
