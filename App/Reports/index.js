import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";
import {
    Box,
    Button,
    Menu,
    MenuItem,
    Divider,
    IconButton,
    TextField,
    Container,
    Typography,
    Card,
    CardContent,
    InputAdornment,
    Chip,
    Tooltip,
    Stack
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";

import ReportsModal from "./ReportsModal";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";

const RowAction = ({ row }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch = useDispatch();

    const { enqueueSnackbar } = useSnackbar();

    const handleClick = (event) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEdit = () => {
        navigate(`${row.id}`);
        handleClose();
    };

    const handleDelete = async () => {
        try {
            await dispatch(actions.reports.create.deleteReport(row.id));
            enqueueSnackbar("Report deleted successfully", {
                variant: "success",
                autoHideDuration: 3000
            });
        } catch (error) {
            enqueueSnackbar("Failed to delete report", { variant: "error" });
        }
        handleClose();
    };

    const handleExportPdf = async () => {
        try {
            // Fetch the report data
            const reportData = await dispatch(
                actions.reports.create.getReportData(row.id)
            );

            if (reportData && reportData.report_data) {
                // Import the PDF exporter dynamically
                const { exportReportToPDF } = await import(
                    "./utils/pdfExporter"
                );

                // Export the PDF
                const result = await exportReportToPDF(
                    reportData.report_data,
                    row.title
                );

                if (result.success) {
                    enqueueSnackbar(
                        `PDF exported successfully: ${result.filename}`,
                        {
                            variant: "success",
                            autoHideDuration: 3000
                        }
                    );
                } else {
                    enqueueSnackbar(`PDF export failed: ${result.error}`, {
                        variant: "error"
                    });
                }
            } else {
                enqueueSnackbar("No report data found to export", {
                    variant: "warning"
                });
            }
        } catch (error) {
            console.error("PDF export error:", error);
            enqueueSnackbar("Failed to export PDF", { variant: "error" });
        }
        handleClose();
    };

    return (
        <>
            <IconButton
                id="action-button"
                onClick={handleClick}
                sx={{
                    color: "primary.main",
                    "&:hover": { bgcolor: "primary.50" }
                }}
            >
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id="report-actions-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        borderRadius: 2
                    }
                }}
            >
                <MenuItem onClick={handleEdit} sx={{ gap: 1 }}>
                    <EditIcon fontSize="small" />
                    Edit Report
                </MenuItem>
                <MenuItem onClick={handleExportPdf} sx={{ gap: 1 }}>
                    <PictureAsPdfIcon fontSize="small" />
                    Export PDF
                </MenuItem>

                <Divider sx={{ my: 0.5 }} />

                <MenuItem
                    onClick={handleDelete}
                    sx={{ gap: 1, color: "error.main" }}
                >
                    <DeleteIcon fontSize="small" />
                    Delete
                </MenuItem>
            </Menu>
        </>
    );
};

const Reports = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogWindow, setDialogWindow] = useState("template");
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredReports, setFilteredReports] = useState([]);

    const { reports } = useSelector((state) => state);

    const columns = [
        {
            field: "title",
            headerName: "Report Name",
            flex: 1,
            minWidth: 250,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        width: "100%",
                        py: 1
                    }}
                >
                    <PictureAsPdfIcon color="primary" fontSize="small" />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {params.value}
                    </Typography>
                </Box>
            )
        },
        {
            field: "client",
            headerName: "Client",
            width: 200,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        width: "100%",
                        py: 1
                    }}
                >
                    <PersonIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                        {params.value || "No client assigned"}
                    </Typography>
                </Box>
            )
        },
        {
            field: "created",
            headerName: "Created",
            width: 180,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        width: "100%",
                        py: 1
                    }}
                >
                    <CalendarTodayIcon color="action" fontSize="small" />
                    <Typography variant="body2">
                        {new Date(params.value).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                        })}
                    </Typography>
                </Box>
            )
        },
        {
            field: "status",
            headerName: "Status",
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value || "Draft"}
                    color={
                        params.value === "Published"
                            ? "success"
                            : params.value === "In Review"
                            ? "warning"
                            : "default"
                    }
                    variant="outlined"
                    size="small"
                />
            )
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 100,
            align: "center",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            renderCell: (params) => (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        py: 1
                    }}
                >
                    <RowAction row={params.row} />
                </Box>
            )
        }
    ];

    const hdlRowClick = (params) => {
        if (params.field !== "actions") {
            navigate(`${params.row.id}`);
        }
    };

    const getRowSpacing = useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 1,
            bottom: params.isLastVisible ? 0 : 1
        };
    }, []);

    const hdlShowTemplates = () => {
        setDialogWindow("template");
        setDialogOpen(true);
    };

    const hdlCreateReport = () => {
        setDialogWindow("report");
        setDialogOpen(true);
    };

    const hdlCloseDialog = () => {
        setDialogOpen(false);
    };

    const handleSearchChange = (event) => {
        const value = event.target.value;
        setSearchTerm(value);

        if (value) {
            const filtered = reports.data.filter(
                (report) =>
                    report.title.toLowerCase().includes(value.toLowerCase()) ||
                    (report.client &&
                        report.client
                            .toLowerCase()
                            .includes(value.toLowerCase()))
            );
            setFilteredReports(filtered);
        } else {
            setFilteredReports(reports.data);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(actions.reports.create.getReports());
                await dispatch(actions.reportTemplates.create.getTemplates());
            } catch (error) {
                console.error("Failed to load reports", error);
                enqueueSnackbar("Failed to load reports", {
                    variant: "error",
                    autoHideDuration: 3000
                });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [dispatch, enqueueSnackbar]);

    useEffect(() => {
        setFilteredReports(reports.data);
        if (reports.data.length > 0) {
            setLoading(false);
        }
    }, [reports.data]);

    const dataGridStyles = {
        border: "none",
        "& .MuiDataGrid-main": {
            border: "none"
        },
        "& .MuiDataGrid-columnHeaders": {
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#fafafa",
            fontSize: "0.875rem",
            fontWeight: 600
        },
        "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f5f5f5",
            fontSize: "0.875rem"
        },
        "& .MuiDataGrid-row": {
            "&:hover": {
                backgroundColor: "#f8f9fa",
                cursor: "pointer"
            }
        },
        "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e0e0e0",
            backgroundColor: "#fafafa"
        }
    };

    return (
        <Container maxWidth={false} sx={{ py: 3, px: 3 }}>
            {/* Header Section */}
            <Box sx={{ mb: 4 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{ fontWeight: 600, mb: 1 }}
                        >
                            Reports
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Create, manage, and export therapy reports
                        </Typography>
                    </Box>
                    <Stack direction="row" spacing={2}>
                        <Button
                            variant="outlined"
                            onClick={hdlShowTemplates}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                borderRadius: 2
                            }}
                        >
                            Manage Templates
                        </Button>
                        <Button
                            variant="contained"
                            onClick={hdlCreateReport}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                borderRadius: 2,
                                boxShadow: "0 2px 8px rgba(25, 118, 210, 0.15)"
                            }}
                        >
                            Create Report
                        </Button>
                    </Stack>
                </Box>

                {/* Search and Filter Section */}
                <Card sx={{ p: 2, mb: 3 }}>
                    <Box
                        sx={{
                            display: "flex",
                            gap: 2,
                            alignItems: "center"
                        }}
                    >
                        <TextField
                            placeholder="Search reports..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            sx={{ flex: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon color="action" />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Tooltip title="Filter reports">
                            <IconButton>
                                <FilterListIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Card>
            </Box>

            {/* Reports Table */}
            <Card>
                <Box sx={{ height: 600, width: "100%" }}>
                    <DataGrid
                        rows={filteredReports}
                        columns={columns}
                        sx={dataGridStyles}
                        pageSize={25}
                        rowHeight={70}
                        getRowSpacing={getRowSpacing}
                        onCellClick={hdlRowClick}
                        rowsPerPageOptions={[25, 50, 100]}
                        disableSelectionOnClick
                        disableColumnMenu
                        loading={loading}
                        components={{
                            NoRowsOverlay: () => (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                        gap: 2
                                    }}
                                >
                                    <PictureAsPdfIcon
                                        sx={{
                                            fontSize: 48,
                                            color: "text.secondary"
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        {searchTerm
                                            ? "No reports match your search"
                                            : "No reports found"}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {searchTerm
                                            ? "Try adjusting your search terms"
                                            : "Create your first report to get started"}
                                    </Typography>
                                </Box>
                            )
                        }}
                    />
                </Box>
            </Card>

            <ReportsModal
                dialogOpen={dialogOpen}
                hdlCloseDialog={hdlCloseDialog}
                dialogWindow={dialogWindow}
            />
        </Container>
    );
};

export default Reports;
