import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";
import { useParams, useNavigate } from "react-router-dom";
import {
    Grid,
    Box,
    Button,
    CircularProgress,
    Container,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    IconButton,
    Tabs,
    Tab,
    Stack,
    Chip,
    Tooltip,
    Paper,
    Alert,
    AlertTitle
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import PreviewIcon from "@mui/icons-material/Preview";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ListIcon from "@mui/icons-material/List";
import TableChartIcon from "@mui/icons-material/TableChart";
import DescriptionIcon from "@mui/icons-material/Description";

import PdfGenerator from "./PdfGenerator";
import Modal from "./Modal";

const ReportEditor = () => {
    const dispatch = useDispatch();
    const { reportId, templateId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { reports, reportTemplates } = useSelector((state) => state);
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(true);
    const [action, setAction] = useState("create");
    const [open, setOpen] = useState(false);
    const [sectionOpen, setSectionOpen] = useState(false);
    const [section, setSection] = useState("main");
    const [deleteSection, setDeleteSection] = useState(null);
    const [activeTab, setActiveTab] = useState(0);
    const [saving, setSaving] = useState(false);

    const isTemplate = templateId ? true : false;

    const hdlDeleteSection = (key) => () => {
        setDeleteSection(key);
        setAction("delete");
        setSectionOpen(true);
    };

    const hdlCardClick = (key) => () => {
        setSection(key);
        setOpen(true);
    };

    const hdlDialogClose = () => {
        setOpen(false);
    };

    const hdlSectionDialogOpen = () => {
        setAction("create");
        setSectionOpen(true);
    };

    const hdlTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const hdlSave = async () => {
        setSaving(true);
        try {
            if (isTemplate) {
                await dispatch(
                    actions.reportTemplates.create.putTemplateContent(
                        templateId,
                        reportTemplates.item
                    )
                );
            } else {
                console.log("reports.item", reports.item);
                const result = await dispatch(
                    actions.reports.create.putReportData(reportId, reports.item)
                );
                console.log("Save result:", result);
            }
            enqueueSnackbar("Report saved successfully", {
                variant: "success"
            });
        } catch (error) {
            console.error("Save error:", error);
            enqueueSnackbar("Failed to save report", { variant: "error" });
        } finally {
            setSaving(false);
        }
    };

    const hdlBack = () => {
        navigate(isTemplate ? "/auth/reports" : "/auth/reports");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isTemplate) {
                    await dispatch(
                        actions.reportTemplates.create.getTemplateContent(
                            templateId
                        )
                    );
                } else {
                    await dispatch(
                        actions.reports.create.getReportData(reportId)
                    );
                }
            } catch (error) {
                enqueueSnackbar("Failed to load report", { variant: "error" });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, reportId, templateId, isTemplate]);

    const report = isTemplate ? reportTemplates.item : reports.item;

    const isValidSectionData = (sectionData) => {
        return (
            Array.isArray(sectionData) &&
            sectionData.every(
                (item) =>
                    item &&
                    typeof item === "object" &&
                    "element" in item &&
                    "value" in item
            )
        );
    };

    const getSectionIcon = (sectionData) => {
        if (
            !sectionData ||
            !isValidSectionData(sectionData) ||
            sectionData.length === 0
        ) {
            return <TextFieldsIcon />;
        }

        const hasTable = sectionData.some((item) => item.element === "table");
        const hasList = sectionData.some((item) => item.element === "list");
        const hasParagraph = sectionData.some(
            (item) => item.element === "paragraph"
        );

        if (hasTable) return <TableChartIcon />;
        if (hasList) return <ListIcon />;
        if (hasParagraph) return <DescriptionIcon />;
        return <TextFieldsIcon />;
    };

    const getSectionPreview = (sectionData) => {
        if (!sectionData) {
            return "Empty section";
        }

        if (!Array.isArray(sectionData)) {
            return "Invalid data format - expected array";
        }

        if (sectionData.length === 0) {
            return "Empty section";
        }

        if (!isValidSectionData(sectionData)) {
            return "Contains invalid elements";
        }

        const elements = sectionData
            .map((item) => item.element)
            .filter(Boolean);
        const uniqueElements = [...new Set(elements)];

        return uniqueElements.length > 0
            ? `Contains: ${uniqueElements.join(", ")}`
            : "No content";
    };

    // First check: Still loading
    if (loading) {
        return (
            <Container
                maxWidth={false}
                sx={{ py: 4, display: "flex", justifyContent: "center" }}
            >
                <CircularProgress />
            </Container>
        );
    }

    // Second check: No report data loaded
    if (!report) {
        return (
            <Container
                maxWidth={false}
                sx={{ py: 4, display: "flex", justifyContent: "center" }}
            >
                <CircularProgress />
            </Container>
        );
    }

    // Third check: Report is corrupted
    if (typeof report !== "object" || Array.isArray(report)) {
        console.log("Report is corrupted:", report);
        return (
            <Container maxWidth={false} sx={{ py: 3, px: 3 }}>
                <Alert severity="error" sx={{ mb: 3 }}>
                    <AlertTitle>Report Cannot Be Loaded</AlertTitle>
                    The report data is severely corrupted and cannot be
                    displayed. Please contact support or create a new report.
                </Alert>
                <Button
                    variant="contained"
                    onClick={hdlBack}
                    startIcon={<ArrowBackIcon />}
                    sx={{ borderRadius: 2, textTransform: "none" }}
                >
                    Go Back
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth={false} sx={{ py: 3, px: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: 2 }}
                >
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton
                            onClick={hdlBack}
                            sx={{ color: "primary.main" }}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        <Box>
                            <Typography
                                variant="h4"
                                component="h1"
                                sx={{ fontWeight: 600 }}
                            >
                                {isTemplate
                                    ? "Template Editor"
                                    : "Report Editor"}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {isTemplate
                                    ? "Edit your report template"
                                    : "Create and customize your therapy report"}
                            </Typography>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            onClick={hdlSave}
                            disabled={saving}
                            startIcon={
                                saving ? (
                                    <CircularProgress size={16} />
                                ) : (
                                    <SaveIcon />
                                )
                            }
                            sx={{ borderRadius: 2, textTransform: "none" }}
                        >
                            {saving ? "Saving..." : "Save"}
                        </Button>
                    </Stack>
                </Stack>
            </Box>

            {/* Tabs */}
            <Card sx={{ mb: 3 }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs value={activeTab} onChange={hdlTabChange}>
                        <Tab
                            label="Edit Content"
                            icon={<EditIcon />}
                            sx={{ textTransform: "none", fontWeight: 500 }}
                        />
                        <Tab
                            label="Preview"
                            icon={<PreviewIcon />}
                            sx={{ textTransform: "none", fontWeight: 500 }}
                        />
                    </Tabs>
                </Box>

                {/* Edit Tab */}
                {activeTab === 0 && (
                    <Box sx={{ p: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 3
                            }}
                        >
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                Report Sections
                            </Typography>
                            <Button
                                variant="contained"
                                onClick={hdlSectionDialogOpen}
                                startIcon={<AddIcon />}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: "none",
                                    boxShadow: "none"
                                }}
                            >
                                Add Section
                            </Button>
                        </Box>

                        {Object.keys(report).length === 0 ? (
                            <Paper
                                sx={{
                                    p: 6,
                                    textAlign: "center",
                                    bgcolor: "grey.50",
                                    border: "2px dashed",
                                    borderColor: "grey.300"
                                }}
                            >
                                <DescriptionIcon
                                    sx={{
                                        fontSize: 48,
                                        color: "text.secondary",
                                        mb: 2
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    gutterBottom
                                >
                                    No sections yet
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mb: 3 }}
                                >
                                    Start building your report by adding
                                    sections
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={hdlSectionDialogOpen}
                                    startIcon={<AddIcon />}
                                    sx={{
                                        borderRadius: 2,
                                        textTransform: "none"
                                    }}
                                >
                                    Add Your First Section
                                </Button>
                            </Paper>
                        ) : (
                            <>
                                {/* Check if report data is corrupted */}
                                {Object.keys(report).some(
                                    (key) => !isValidSectionData(report[key])
                                ) && (
                                    <Alert
                                        severity="error"
                                        sx={{ mb: 3 }}
                                        action={
                                            <Button
                                                color="inherit"
                                                size="small"
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            "This will reset all corrupted sections. Are you sure?"
                                                        )
                                                    ) {
                                                        const validReport = {};
                                                        Object.keys(
                                                            report
                                                        ).forEach((key) => {
                                                            if (
                                                                isValidSectionData(
                                                                    report[key]
                                                                )
                                                            ) {
                                                                validReport[
                                                                    key
                                                                ] = report[key];
                                                            }
                                                        });

                                                        // Update the report data through Redux
                                                        if (isTemplate) {
                                                            dispatch(
                                                                actions.reportTemplates.create.setItem(
                                                                    validReport
                                                                )
                                                            );
                                                        } else {
                                                            dispatch(
                                                                actions.reports.create.setItem(
                                                                    validReport
                                                                )
                                                            );
                                                        }
                                                    }
                                                }}
                                            >
                                                Fix
                                            </Button>
                                        }
                                    >
                                        <AlertTitle>
                                            Report Data Corrupted
                                        </AlertTitle>
                                        Some sections contain invalid data and
                                        cannot be displayed properly. This may
                                        happen if the report was imported from
                                        an older version or manually edited.
                                    </Alert>
                                )}

                                <Grid container spacing={3}>
                                    {Object.keys(report).map((key) => {
                                        const sectionData = report[key];
                                        const isValid =
                                            isValidSectionData(sectionData);
                                        const sectionTitle = isValid
                                            ? sectionData[0]?.value ||
                                              "Untitled Section"
                                            : `${key} (Corrupted)`;

                                        return (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                key={key}
                                            >
                                                <Card
                                                    sx={{
                                                        height: "100%",
                                                        transition:
                                                            "transform 0.2s, box-shadow 0.2s",
                                                        "&:hover": {
                                                            transform:
                                                                "translateY(-2px)",
                                                            boxShadow: 3
                                                        },
                                                        ...(isValid
                                                            ? {}
                                                            : {
                                                                  borderColor:
                                                                      "error.main",
                                                                  borderWidth: 2,
                                                                  borderStyle:
                                                                      "solid"
                                                              })
                                                    }}
                                                >
                                                    <CardHeader
                                                        avatar={getSectionIcon(
                                                            sectionData
                                                        )}
                                                        title={
                                                            <Typography
                                                                variant="h6"
                                                                sx={{
                                                                    fontWeight: 600,
                                                                    color: isValid
                                                                        ? "inherit"
                                                                        : "error.main"
                                                                }}
                                                            >
                                                                {sectionTitle}
                                                            </Typography>
                                                        }
                                                        action={
                                                            <Tooltip title="Delete section">
                                                                <IconButton
                                                                    onClick={hdlDeleteSection(
                                                                        key
                                                                    )}
                                                                    sx={{
                                                                        color: "error.main"
                                                                    }}
                                                                >
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </Tooltip>
                                                        }
                                                    />
                                                    <CardContent>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            {getSectionPreview(
                                                                sectionData
                                                            )}
                                                        </Typography>
                                                        <Box sx={{ mt: 2 }}>
                                                            <Chip
                                                                label={
                                                                    isValid
                                                                        ? `${sectionData.length} elements`
                                                                        : "Invalid data"
                                                                }
                                                                size="small"
                                                                color={
                                                                    isValid
                                                                        ? "primary"
                                                                        : "error"
                                                                }
                                                                variant="outlined"
                                                            />
                                                        </Box>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button
                                                            size="small"
                                                            onClick={hdlCardClick(
                                                                key
                                                            )}
                                                            startIcon={
                                                                <EditIcon />
                                                            }
                                                            disabled={!isValid}
                                                            sx={{
                                                                textTransform:
                                                                    "none",
                                                                fontWeight: 500
                                                            }}
                                                        >
                                                            {isValid
                                                                ? "Edit Content"
                                                                : "Cannot Edit"}
                                                        </Button>
                                                    </CardActions>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </>
                        )}
                    </Box>
                )}

                {/* Preview Tab */}
                {activeTab === 1 && (
                    <Box sx={{ p: 0, height: "70vh" }}>
                        <PdfGenerator />
                    </Box>
                )}
            </Card>

            <Modal
                open={open}
                action={action}
                section={section}
                sectionOpen={sectionOpen}
                deleteSection={deleteSection}
                setSectionOpen={setSectionOpen}
                hdlDialogClose={hdlDialogClose}
            />
        </Container>
    );
};

export default ReportEditor;
