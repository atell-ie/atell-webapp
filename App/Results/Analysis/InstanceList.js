import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    Box,
    Grid,
    Badge,
    Button,
    IconButton,
    Typography,
    Divider,
    Popover,
    TextField,
    CircularProgress,
    Chip,
    Paper
} from "@mui/material";
import actions from "../../Store/actions";

import WavesIcon from "@mui/icons-material/Waves";
import EditNoteIcon from "@mui/icons-material/EditNote";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import NoteIcon from "@mui/icons-material/Note";
import { AudioPlayer } from "../../common/components";

import InstancePhoneme from "./InstancePhoneme";
import Results from "./Results";
import AppModal from "../../common/components/AppModal";

const InstanceList = ({ setSelectedTarget, hdlTargetChange }) => {
    const dispatch = useDispatch();

    const [modal, setModal] = useState({
        open: false,
        type: "", // spectogram , results
        selectedInstance: null
    });

    const [note, setNote] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [noteOpen, setNoteOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const [wordInstances, setWordInstances] = useState([]);
    const [editingInstanceId, setEditingInstanceId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    const { results, resultsManager, wordsList, sessions } = useSelector(
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

    const hdlSpectogramClick = (instance) => () => {
        setModal({
            open: true,
            type: "spectogram",
            selectedInstance: instance
        });
    };

    const hdlModalClose = () => {
        setModal({
            open: false,
            type: "",
            selectedInstance: null
        });
    };

    const handleClick = (instance, newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setEditingInstanceId(instance.id);
        setNote(instance.note || "");
        setNoteOpen(
            (prev) =>
                placement !== newPlacement ||
                !prev ||
                editingInstanceId !== instance.id
        );
        setPlacement(newPlacement);
    };

    const handleNoteClose = () => {
        setNoteOpen(false);
        setAnchorEl(null);
        setEditingInstanceId(null);
        setNote("");
        setIsSaving(false);
    };

    const handleNoteSave = async () => {
        if (editingInstanceId && !isSaving) {
            setIsSaving(true);
            try {
                await dispatch(
                    actions.results.create.patchResultTarget(
                        { note },
                        editingInstanceId
                    )
                );
                handleNoteClose();
            } catch (error) {
                console.error("Error saving note:", error);
            } finally {
                setIsSaving(false);
            }
        }
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

    // Get the session media URL for the audio player
    const getSessionMediaUrl = () => {
        if (sessions.item && sessions.item[0] && sessions.item[0].mediaFile) {
            return sessions.item[0].mediaFile.mediaFile;
        }
        return null;
    };

    const getSessionMediaFileName = () => {
        if (sessions.item && sessions.item[0] && sessions.item[0].mediaFile) {
            return (
                sessions.item[0].mediaFile.friendlyName ||
                sessions.item[0].mediaFile.mediaFile.split("/").pop()
            );
        }
        return "Audio";
    };

    const sessionMediaUrl = getSessionMediaUrl();
    const sessionMediaFileName = getSessionMediaFileName();

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
                                    onClick={hdlSpectogramClick(instance)}
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
                                {sessionMediaUrl && (
                                    <AudioPlayer
                                        mediaUrl={sessionMediaUrl}
                                        fileName={sessionMediaFileName}
                                        playId={`instance-${instance.id}`}
                                        showFileName={false}
                                        showTime={false}
                                        showStopButton={false}
                                        startTime={instance.startTime}
                                        endTime={instance.endTime}
                                        size="small"
                                        color="success"
                                    />
                                )}
                                <IconButton
                                    aria-label="add-note"
                                    onClick={handleClick(instance, "bottom")}
                                    color="secondary"
                                    title="Add note"
                                >
                                    <Badge
                                        color="secondary"
                                        variant="dot"
                                        invisible={!instance.note}
                                    >
                                        <EditNoteIcon />
                                    </Badge>
                                </IconButton>
                            </Box>
                        </Box>
                    );
                })}
            </Box>

            <Popover
                open={noteOpen}
                anchorEl={anchorEl}
                onClose={!isSaving ? handleNoteClose : undefined}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
                PaperProps={{
                    elevation: 8,
                    sx: {
                        borderRadius: 3,
                        overflow: "visible",
                        mt: 1,
                        "&:before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            left: "50%",
                            width: 10,
                            height: 10,
                            bgcolor: "background.paper",
                            transform: "translate(-50%, -50%) rotate(45deg)",
                            zIndex: 0
                        }
                    }
                }}
            >
                <Paper sx={{ p: 0, minWidth: 360, maxWidth: 400 }}>
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            p: 2,
                            pb: 1,
                            borderBottom: "1px solid",
                            borderColor: "divider",
                            bgcolor: "primary.main",
                            color: "white",
                            borderRadius: "12px 12px 0 0"
                        }}
                    >
                        <NoteIcon sx={{ fontSize: 20 }} />
                        <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600, flexGrow: 1 }}
                        >
                            Add Note
                        </Typography>
                        {!isSaving && (
                            <IconButton
                                size="small"
                                onClick={handleNoteClose}
                                sx={{ color: "white" }}
                            >
                                <CloseIcon sx={{ fontSize: 18 }} />
                            </IconButton>
                        )}
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: 3 }}>
                        <TextField
                            fullWidth
                            label="Enter your note"
                            multiline
                            rows={4}
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            variant="outlined"
                            disabled={isSaving}
                            placeholder="Add detailed notes about this word instance..."
                            sx={{
                                mb: 3,
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                    "&:hover": {
                                        "& > fieldset": {
                                            borderColor: "primary.main"
                                        }
                                    }
                                }
                            }}
                            inputProps={{
                                maxLength: 500
                            }}
                        />

                        {/* Character count */}
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {note.length}/500 characters
                            </Typography>
                            {note.trim() && (
                                <Chip
                                    label="Has content"
                                    size="small"
                                    color="success"
                                    variant="outlined"
                                />
                            )}
                        </Box>

                        {/* Actions */}
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                justifyContent: "flex-end"
                            }}
                        >
                            <Button
                                onClick={handleNoteClose}
                                color="secondary"
                                disabled={isSaving}
                                startIcon={<CloseIcon />}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 500
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleNoteSave}
                                variant="contained"
                                color="primary"
                                disabled={isSaving}
                                startIcon={
                                    isSaving ? (
                                        <CircularProgress
                                            size={16}
                                            color="inherit"
                                        />
                                    ) : (
                                        <SaveIcon />
                                    )
                                }
                                sx={{
                                    borderRadius: 2,
                                    textTransform: "none",
                                    fontWeight: 600,
                                    minWidth: 100
                                }}
                            >
                                {isSaving ? "Saving..." : "Save Note"}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Popover>

            <AppModal
                isVisible={modal.open}
                title={
                    modal.type === "spectogram"
                        ? `Spectrogram - "${
                              modal.selectedInstance?.foundWord || ""
                          }"`
                        : "Summary of identified disorders"
                }
                onClose={hdlModalClose}
            >
                {modal.type === "spectogram" ? (
                    <Box sx={{ p: 2, textAlign: "center" }}>
                        {modal.selectedInstance?.visualRepresentations?.length >
                        0 ? (
                            modal.selectedInstance.visualRepresentations
                                .filter(
                                    (rep) =>
                                        rep.representationType === "spectrogram"
                                )
                                .map((spectrogram, index) => (
                                    <Box key={index} sx={{ mb: 2 }}>
                                        <img
                                            src={spectrogram.imageUrl}
                                            alt={`Spectrogram for "${modal.selectedInstance.foundWord}"`}
                                            style={{
                                                maxWidth: "100%",
                                                maxHeight: "500px",
                                                borderRadius: "8px",
                                                boxShadow:
                                                    "0 4px 8px rgba(0,0,0,0.1)"
                                            }}
                                            onLoad={() => {
                                                console.log(
                                                    "Image loaded successfully:",
                                                    spectrogram.imageUrl
                                                );
                                            }}
                                            onError={(e) => {
                                                console.error(
                                                    "Failed to load image:",
                                                    spectrogram.imageUrl
                                                );
                                                console.error(
                                                    "Error details:",
                                                    e
                                                );
                                                e.target.style.display = "none";
                                                e.target.nextSibling.style.display =
                                                    "block";
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                display: "none",
                                                p: 4,
                                                border: "2px dashed #ccc",
                                                borderRadius: 2,
                                                color: "text.secondary"
                                            }}
                                        >
                                            <Typography
                                                variant="body2"
                                                gutterBottom
                                            >
                                                Failed to load spectrogram image
                                            </Typography>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontFamily: "monospace",
                                                    wordBreak: "break-all"
                                                }}
                                            >
                                                URL: {spectrogram.imageUrl}
                                            </Typography>
                                        </Box>
                                    </Box>
                                ))
                        ) : (
                            <Box
                                sx={{
                                    p: 4,
                                    border: "2px dashed #ccc",
                                    borderRadius: 2,
                                    color: "text.secondary"
                                }}
                            >
                                <WavesIcon
                                    sx={{ fontSize: 48, mb: 2, opacity: 0.5 }}
                                />
                                <Typography variant="h6" gutterBottom>
                                    No Spectrogram Available
                                </Typography>
                                <Typography variant="body2">
                                    No spectrogram has been generated for this
                                    word instance yet.
                                </Typography>
                            </Box>
                        )}

                        {/* Word Instance Details */}
                        <Box
                            sx={{
                                mt: 3,
                                p: 2,
                                bgcolor: "grey.50",
                                borderRadius: 2,
                                textAlign: "left"
                            }}
                        >
                            <Typography
                                variant="subtitle2"
                                gutterBottom
                                color="primary"
                            >
                                Word Instance Details
                            </Typography>
                            <Typography variant="body2">
                                <strong>Found Word:</strong>{" "}
                                {modal.selectedInstance?.foundWord}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Time Range:</strong>{" "}
                                {modal.selectedInstance?.startTime}s -{" "}
                                {modal.selectedInstance?.endTime}s
                            </Typography>
                            <Typography variant="body2">
                                <strong>Score:</strong>{" "}
                                {modal.selectedInstance?.score}
                            </Typography>
                            <Typography variant="body2">
                                <strong>Speaker:</strong>{" "}
                                {modal.selectedInstance?.speaker}
                            </Typography>
                        </Box>
                    </Box>
                ) : (
                    <Results />
                )}
            </AppModal>
        </Box>
    );
};

export default InstanceList;
