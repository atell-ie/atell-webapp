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
        textAlign: "center",
        backgroundColor: "#fafafa",
        transition: "all 0.3s ease",
        cursor: "pointer",
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
    uploadIcon: {
        fontSize: "48px",
        color: "#2196f3",
        marginBottom: "16px"
    },
    form: {
        "& .MuiTextField-root": {
            marginBottom: "16px"
        }
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

    const getModalControls = () => {
        return (
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
    };

    return (
        <AppModal
            title={t("newSession")}
            size="sm"
            isVisible={modalOpen}
            onClose={hdlClose}
            controls={getModalControls()}
        >
            <Paper elevation={0} sx={{ p: 2 }}>
                <Grid container spacing={3} sx={styles.form}>
                    {error && (
                        <Grid item xs={12}>
                            <Alert 
                                severity="error"
                                sx={{ 
                                    borderRadius: "8px",
                                    "& .MuiAlert-icon": {
                                        color: "#f44336"
                                    }
                                }}
                            >
                                {error}
                            </Alert>
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <TextField
                            label={t("sessionName")}
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
                        <Box
                            onDrop={handleDrop}
                            onDragOver={(event) => event.preventDefault()}
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
                                <>
                                    <CloudUploadIcon sx={styles.uploadIcon} />
                                    <Typography variant="body1" sx={styles.uploadText}>
                                        {t("messages.dragAndDropAudio")}
                                    </Typography>
                                    <Typography variant="body2" sx={styles.uploadButton}>
                                        {t("messages.clickToUpload")}
                                    </Typography>
                                </>
                            )}
                            <input
                                type="file"
                                accept="audio/*"
                                id="file-upload"
                                style={{ display: "none" }}
                                onChange={handleFileSelect}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </AppModal>
    );
};

export default UploadSession;
