import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import actions from "../Store/actions";

import {
    Box,
    Grid,
    Button,
    TextField,
    Typography,
    Alert,
    Paper,
    IconButton
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AudioFileIcon from "@mui/icons-material/AudioFile";
import CloseIcon from "@mui/icons-material/Close";

import AppModal from "../common/components/AppModal";

const styles = {
    uploadBox: {
        border: "2px dashed #ccc",
        borderRadius: "8px",
        padding: "24px",
        backgroundColor: "#fafafa",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        transition: "all 0.3s ease",
        "&:hover": {
            borderColor: "#2196f3",
            backgroundColor: "#f0f7ff"
        }
    },
    selectedFile: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        padding: "12px",
        backgroundColor: "#e3f2fd",
        borderRadius: "4px",
        marginTop: "8px"
    },
    uploadText: {
        color: "#666",
        marginBottom: "8px"
    },
    uploadButton: {
        color: "#2196f3",
        fontWeight: "500",
        "&:hover": {
            color: "#1976d2"
        }
    },
    form: {
        "& .MuiTextField-root": {
            marginBottom: "16px"
        }
    }
};

const UploadSession = ({ modalOpen, setModalOpen, hdlClose }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { journeyId } = useParams();

    const [loading, setLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        notes: "",
        friendlyName: ""
    });

    const handleUpload = async () => {
        try {
            setError("");
            if (!selectedFile) {
                setError(t("errors.noFileSelected"));
                return;
            }
            if (!form.friendlyName.trim()) {
                setError(t("errors.sessionNameRequired"));
                return;
            }

            setLoading(true);
            const formData = new FormData();
            formData.append("mediaFile", selectedFile);
            formData.append("notes", form.notes);
            formData.append("friendlyName", form.friendlyName);
            formData.append("journeyId", journeyId);

            await dispatch(actions.sessions.create.postSession(formData));
            setModalOpen(false);
        } catch (err) {
            setError(t("errors.uploadFailed"));
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && !file.type.startsWith("audio/")) {
            setError(t("errors.invalidFileType"));
            return;
        }
        setError("");
        setSelectedFile(file);
    };

    const hdlFieldChange = (fieldName) => (event) => {
        setForm({ ...form, [fieldName]: event.target.value });
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && !file.type.startsWith("audio/")) {
            setError(t("errors.invalidFileType"));
            return;
        }
        setError("");
        setSelectedFile(file);
    };

    const clearSelectedFile = () => {
        setSelectedFile(null);
        setError("");
    };

    const getModalControls = () => (
        <>
            <Button
                variant="outlined"
                onClick={hdlClose}
                sx={{
                    borderColor: "#e0e0e0",
                    color: "#666",
                    "&:hover": {
                        borderColor: "#bdbdbd",
                        backgroundColor: "#f5f5f5"
                    }
                }}
            >
                {t("cancel")}
            </Button>
            <LoadingButton
                loading={loading}
                variant="contained"
                onClick={handleUpload}
                disableElevation
                sx={{
                    backgroundColor: "#2196f3",
                    "&:hover": {
                        backgroundColor: "#1976d2"
                    }
                }}
            >
                {t("confirm")}
            </LoadingButton>
        </>
    );

    return (
        <AppModal
            title={t("New Session")}
            size="sm"
            isVisible={modalOpen}
            onClose={hdlClose}
            controls={getModalControls()}
        >
            <Paper elevation={0} sx={{ p: 2 }}>
                <Grid container spacing={2} direction="column">
                    {error && (
                        <Grid item>
                            <Alert severity="error" sx={{ borderRadius: "8px" }}>
                                {error}
                            </Alert>
                        </Grid>
                    )}
                    <Grid item>
                        <TextField
                            label={t("Session Name")}
                            value={form.friendlyName}
                            onChange={hdlFieldChange("friendlyName")}
                            fullWidth
                            variant="outlined"
                            required
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px"
                                }
                            }}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            label={t("notes")}
                            value={form.notes}
                            onChange={hdlFieldChange("notes")}
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={4}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px"
                                }
                            }}
                        />
                    </Grid>

                    <Grid item>
                        <label htmlFor="file-upload">
                            <Box
                                onDrop={handleDrop}
                                onDragOver={(e) => e.preventDefault()}
                                sx={styles.uploadBox}
                            >
                                {selectedFile ? (
                                    <Box sx={styles.selectedFile}>
                                        <AudioFileIcon sx={{ color: "#2196f3" }} />
                                        <Typography variant="body1" sx={{ flex: 1 }}>
                                            {selectedFile.name}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={clearSelectedFile}
                                            sx={{ color: "#666" }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                ) : (
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}
                                    >
                                        <CloudUploadIcon sx={{ fontSize: 48, color: "#2196f3", mb: 1 }} />
                                        <Typography variant="body1" sx={styles.uploadText}>
                                            {t("messages.dragAndDropAudio", "Drag and drop an audio file here")}
                                        </Typography>
                                        <Typography variant="body2" sx={styles.uploadButton}>
                                            {t("messages.clickToUpload", "Click here to upload")}
                                        </Typography>
                                    </Box>
                                )}
                            </Box>
                        </label>
                    </Grid>
                </Grid>
            </Paper>

            {/* Moved outside to avoid layout issues */}
            <input
                type="file"
                accept="audio/*"
                id="file-upload"
                style={{ display: "none" }}
                onChange={handleFileSelect}
            />
        </AppModal>
    );
};

export default UploadSession;

