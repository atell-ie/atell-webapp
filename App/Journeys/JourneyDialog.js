import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Dialog,
    MenuItem,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Box,
    Typography,
    Divider
} from "@mui/material";

const JourneyDialog = ({
    open,
    onClose,
    onSubmit,
    initialData = null,
    loading
}) => {
    const [journeyData, setJourneyData] = useState({
        name: "",
        description: "",
        client: ""
    });

    const { clients } = useSelector((state) => state);

    const isEditMode = Boolean(initialData);

    useEffect(() => {
        if (initialData) {
            setJourneyData({
                name: initialData.name || "",
                description: initialData.description || "",
                client: initialData.client ? initialData.client.id : ""
            });
        } else {
            setJourneyData({ name: "", description: "", client: "" });
        }
    }, [initialData, open]);

    const handleFieldChange = (field) => (event) => {
        setJourneyData((prev) => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleSubmit = () => {
        onSubmit(journeyData);
        handleClose();
    };

    const handleClose = () => {
        setJourneyData({ name: "", description: "", client: "" });
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
            <DialogTitle
                sx={{
                    px: 3,
                    py: 2.5,
                    backgroundColor: "#fafafa",
                    borderBottom: "1px solid #e8e8e8"
                }}
            >
                <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                        fontWeight: 600,
                        color: "#1a1a1a",
                        fontSize: "1.4rem"
                    }}
                >
                    {isEditMode
                        ? "Edit Journey Plan"
                        : "Create New Journey Plan"}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{
                        color: "#666",
                        mt: 0.5
                    }}
                >
                    {isEditMode
                        ? "Update the journey plan details below"
                        : "Define a new journey plan for patient therapy sessions"}
                </Typography>
            </DialogTitle>

            <DialogContent sx={{ px: 3, py: 3, pt: "24px !important" }}>
                <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
                >
                    <TextField
                        autoFocus
                        label="Journey Plan Name"
                        fullWidth
                        value={journeyData.name}
                        onChange={handleFieldChange("name")}
                        placeholder="Enter a descriptive name for this journey plan"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px",
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1976d2"
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "#1976d2"
                                    }
                            },
                            "& .MuiInputLabel-root": {
                                fontWeight: 500,
                                color: "#555"
                            }
                        }}
                    />

                    <TextField
                        label="Treatment Description"
                        fullWidth
                        multiline
                        rows={4}
                        value={journeyData.description}
                        onChange={handleFieldChange("description")}
                        placeholder="Describe the goals, methods, or notes for this journey plan"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#f8f9fa",
                                borderRadius: "8px",
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1976d2"
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "#1976d2"
                                    }
                            },
                            "& .MuiInputLabel-root": {
                                fontWeight: 500,
                                color: "#555"
                            }
                        }}
                    />

                    <TextField
                        select
                        label="Patient"
                        fullWidth
                        value={journeyData.client}
                        onChange={handleFieldChange("client")}
                        disabled={isEditMode}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: isEditMode
                                    ? "#f0f0f0"
                                    : "#f8f9fa",
                                borderRadius: "8px",
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: isEditMode ? "#ddd" : "#1976d2"
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                        borderColor: "#1976d2"
                                    }
                            },
                            "& .MuiInputLabel-root": {
                                fontWeight: 500,
                                color: "#555"
                            }
                        }}
                    >
                        <MenuItem value="">
                            <em>Select a patient</em>
                        </MenuItem>
                        {clients.data.map((client) => (
                            <MenuItem key={client.id} value={client.id}>
                                {client.name}
                            </MenuItem>
                        ))}
                    </TextField>

                    {isEditMode && (
                        <Typography
                            variant="caption"
                            sx={{
                                color: "#888",
                                fontStyle: "italic",
                                mt: -1
                            }}
                        >
                            Patient cannot be changed for existing treatment
                            plans
                        </Typography>
                    )}
                </Box>
            </DialogContent>

            <Divider />

            <DialogActions sx={{ px: 3, py: 2.5, gap: 1.5 }}>
                <Button
                    onClick={handleClose}
                    sx={{
                        textTransform: "none",
                        fontWeight: 500,
                        color: "#666",
                        px: 3,
                        py: 1,
                        borderRadius: "8px",
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: "#f5f5f5",
                            boxShadow: "none"
                        }
                    }}
                >
                    Cancel
                </Button>
                <Button
                    loading={loading}
                    onClick={handleSubmit}
                    variant="contained"
                    disabled={!journeyData.name.trim() || !journeyData.client}
                    sx={{
                        backgroundColor: "#1976d2",
                        "&:hover": {
                            backgroundColor: "#1565c0"
                        },
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3,
                        py: 1,
                        borderRadius: "8px",
                        boxShadow: "none",
                        "&:disabled": {
                            backgroundColor: "#e0e0e0",
                            color: "#999"
                        }
                    }}
                >
                    {isEditMode ? "Save Changes" : "Create Journey Plan"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default JourneyDialog;
