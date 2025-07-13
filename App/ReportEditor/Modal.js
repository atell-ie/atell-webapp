import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";
import { useParams } from "react-router-dom";
import {
    Typography,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Box,
    Divider,
    CircularProgress
} from "@mui/material";

import SectionContent from "./SectionContent";

const ReportEditorModal = ({
    open,
    action,
    section,
    sectionOpen,
    deleteSection,
    setSectionOpen,
    hdlDialogClose
}) => {
    const dispatch = useDispatch();
    const { reportId, templateId } = useParams();
    const [sectionName, setSectionName] = useState("");
    const [saving, setSaving] = useState(false);
    const { reports, reportTemplates } = useSelector((state) => state);
    const isTemplate = templateId ? true : false;

    const hdlSectionName = (e) => {
        const { value } = e.target;
        setSectionName(value);
    };

    const hdlSectionDialogClose = () => {
        setSectionOpen(false);
        setSectionName("");
    };

    const saveChange = async (data) => {
        try {
            if (isTemplate) {
                await dispatch(
                    actions.reportTemplates.create.putTemplateContent(
                        templateId,
                        data
                    )
                );
            } else {
                await dispatch(
                    actions.reports.create.putReportData(reportId, data)
                );
            }
        } catch (error) {
            console.error("Modal save error:", error);
            throw error;
        }
    };

    const hdlSaveClick = async () => {
        setSaving(true);
        try {
            await saveChange(isTemplate ? reportTemplates.item : reports.item);
            hdlDialogClose();
        } catch (error) {
            console.error("Save click error:", error);
        } finally {
            setSaving(false);
        }
    };

    const hdlSectionSave = async () => {
        setSaving(true);
        let newReport = null;

        if (isTemplate) newReport = { ...reportTemplates.item };
        else newReport = { ...reports.item };

        const newSection = sectionName.toLowerCase().replace(/\s+/g, "-");
        newReport[newSection] = [
            {
                value: sectionName,
                element: "title"
            }
        ];

        try {
            await saveChange(newReport);
            hdlSectionDialogClose();
        } catch (error) {
            console.error("Section save error:", error);
        } finally {
            setSaving(false);
        }
    };

    const confirmDeletion = async () => {
        setSaving(true);
        let newReport = null;
        if (isTemplate) newReport = { ...reportTemplates.item };
        else newReport = { ...reports.item };

        delete newReport[deleteSection];
        try {
            await saveChange(newReport);
            hdlSectionDialogClose();
        } catch (error) {
            console.error("Delete section error:", error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <>
            {/* Main Section Content Editor */}
            <Dialog
                open={open}
                onClose={hdlDialogClose}
                maxWidth="lg"
                fullWidth
                elevation={8}
            >
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
                        Edit Section Content
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#666",
                            mt: 0.5
                        }}
                    >
                        Customize the content and structure of your report
                        section
                    </Typography>
                </DialogTitle>

                <DialogContent
                    sx={{
                        px: 3,
                        py: 3,
                        pt: "24px !important",
                        overflowY: "auto",
                        flex: 1
                    }}
                >
                    <SectionContent section={section} />
                </DialogContent>

                <Divider />

                <DialogActions sx={{ px: 3, py: 2.5, gap: 1.5 }}>
                    <Button
                        onClick={hdlDialogClose}
                        sx={{
                            textTransform: "none",
                            fontWeight: 500,
                            color: "#666",
                            px: 3,
                            py: 1,
                            borderRadius: "8px",
                            "&:hover": {
                                backgroundColor: "#f5f5f5"
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={hdlSaveClick}
                        variant="contained"
                        disabled={saving}
                        startIcon={
                            saving ? <CircularProgress size={16} /> : null
                        }
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
                        {saving ? "Saving..." : "Save Changes"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Section Creation/Deletion Dialog */}
            <Dialog
                open={sectionOpen}
                onClose={hdlSectionDialogClose}
                maxWidth="sm"
                fullWidth
                elevation={8}
            >
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
                        {action === "create"
                            ? "Add New Section"
                            : "Delete Section"}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#666",
                            mt: 0.5
                        }}
                    >
                        {action === "create"
                            ? "Create a new section for your report"
                            : "This action cannot be undone"}
                    </Typography>
                </DialogTitle>

                <DialogContent sx={{ px: 3, py: 3, pt: "24px !important" }}>
                    {action === "create" ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2.5
                            }}
                        >
                            <TextField
                                autoFocus
                                label="Section Title"
                                fullWidth
                                value={sectionName}
                                onChange={hdlSectionName}
                                placeholder="Enter a descriptive title for this section"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor: "#f8f9fa",
                                        borderRadius: "8px",
                                        "&:hover .MuiOutlinedInput-notchedOutline":
                                            {
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
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: "center", py: 2 }}>
                            <Typography variant="body1" sx={{ mb: 2 }}>
                                Are you sure you want to delete this section?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                All content in this section will be permanently
                                removed.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>

                <Divider />

                <DialogActions sx={{ px: 3, py: 2.5, gap: 1.5 }}>
                    <Button
                        onClick={hdlSectionDialogClose}
                        sx={{
                            textTransform: "none",
                            fontWeight: 500,
                            color: "#666",
                            px: 3,
                            py: 1,
                            borderRadius: "8px",
                            "&:hover": {
                                backgroundColor: "#f5f5f5"
                            }
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={
                            action === "create"
                                ? hdlSectionSave
                                : confirmDeletion
                        }
                        variant="contained"
                        disabled={
                            saving ||
                            (action === "create" && !sectionName.trim())
                        }
                        startIcon={
                            saving ? <CircularProgress size={16} /> : null
                        }
                        sx={{
                            backgroundColor:
                                action === "create" ? "#1976d2" : "#d32f2f",
                            "&:hover": {
                                backgroundColor:
                                    action === "create" ? "#1565c0" : "#c62828"
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
                        {saving
                            ? action === "create"
                                ? "Creating..."
                                : "Deleting..."
                            : action === "create"
                            ? "Create Section"
                            : "Delete Section"}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ReportEditorModal;
