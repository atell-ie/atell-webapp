import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Store/actions";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Stack,
    Alert,
    CircularProgress
} from "@mui/material";

const clients = [
    {
        id: 1,
        label: "Child AA"
    },
    {
        id: 2,
        label: "Child BB"
    }
];

const reportSources = [
    {
        id: 1,
        label: "New Report"
    },
    {
        id: 2,
        label: "From Template"
    }
];

const NewReport = ({ hdlCloseDialog }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [reportSource, setReportSource] = useState(1);
    const [template, setTemplate] = useState("");
    const [client, setClient] = useState("");
    const [reportName, setReportName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { reportTemplates } = useSelector((state) => state);

    const isEnabled = useMemo(() => {
        if (reportSource === 1) {
            return Boolean(reportName.trim() && client);
        } else {
            return Boolean(template && client && reportName.trim());
        }
    }, [reportSource, template, client, reportName]);

    const hdlReportSource = (e) => {
        const { value } = e.target;
        setReportSource(value);
        setError("");
    };

    const hdlTemplate = (e) => {
        const { value } = e.target;
        setTemplate(value);
        setError("");
    };

    const hdlClient = (e) => {
        const { value } = e.target;
        setClient(value);
        setError("");
    };

    const hdlReportName = (e) => {
        const { value } = e.target;
        setReportName(value);
        setError("");
    };

    const hdlConfirmNewReport = async () => {
        if (!isEnabled) return;

        setLoading(true);
        setError("");

        console.log("template-----", template);
        console.log("reportSource-----", reportSource);

        let reportData = null;

        if (template) {
            await dispatch(
                actions.reportTemplates.create.getTemplateContent(template)
            );
            reportData = reportTemplates.item;
        }

        try {
            const data = {
                title: reportName,
                // reportSource
                reportData: reportData
                // template: reportSource === 2 ? template : undefined,
                // client
            };

            const { report } = await dispatch(
                actions.reports.create.postReport(data)
            );

            navigate(`${report.id}`);
            hdlCloseDialog();
        } catch (err) {
            setError("Failed to create report. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 1 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Create a new therapy report for your client
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                required
                label="Report Name"
                value={reportName}
                onChange={hdlReportName}
                placeholder="Enter report name..."
                helperText="Give your report a descriptive name"
                fullWidth
            />

            <TextField
                select
                label="Report Source"
                value={reportSource}
                onChange={hdlReportSource}
                helperText="Choose how you want to create your report"
                fullWidth
            >
                {reportSources.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            {reportSource === 2 && (
                <TextField
                    select
                    required
                    label="Template"
                    value={template}
                    onChange={hdlTemplate}
                    helperText="Select a template to base your report on"
                    fullWidth
                >
                    <MenuItem value="">
                        <em>Choose a template...</em>
                    </MenuItem>
                    {reportTemplates.data.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            <TextField
                select
                required
                label="Client"
                value={client}
                onChange={hdlClient}
                helperText="Select the client this report is for"
                fullWidth
            >
                <MenuItem value="">
                    <em>Choose a client...</em>
                </MenuItem>
                {clients.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            <Stack
                direction="row"
                spacing={2}
                sx={{ mt: 2, justifyContent: "flex-end" }}
            >
                <Button
                    variant="outlined"
                    onClick={hdlCloseDialog}
                    disabled={loading}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        minWidth: 100
                    }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={hdlConfirmNewReport}
                    disabled={!isEnabled || loading}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        minWidth: 100,
                        boxShadow: "none"
                    }}
                >
                    {loading ? (
                        <CircularProgress size={20} color="inherit" />
                    ) : (
                        "Create Report"
                    )}
                </Button>
            </Stack>
        </Box>
    );
};

export default NewReport;
