import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Store/actions";
import { Box, Button, MenuItem, TextField } from "@mui/material";

const clients = [
    {
        id: 1,
        label: "Alex"
    },
    {
        id: 2,
        label: "Garrett"
    }
];

const reportSources = [
    {
        id: 1,
        label: "New"
    },
    {
        id: 2,
        label: "From template"
    }
];

const NewReport = ({ hdlCloseDialog }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [reportSource, setReportSource] = useState(1);
    const [template, hdlTemplate] = useState(1);
    const [client, setClient] = useState(0);

    const { reportTemplates, typesList } = useSelector((state) => state);
    // const { reportSources } = typesList;

    const isEnabled = useMemo(() => {
        return !Boolean(reportSource && template && client);
    }, [reportSource, template, client]);

    const hdlReportSource = (e) => {
        const { value } = e.target;
        setReportSource(value);
    };

    const hdlClient = (e) => {
        const { value } = e.target;
        setClient(value);
    };

    const hdlConfirmNewReport = async () => {
        const data = {
            reportSource,
            template,
            client
        };

        const { report } = await dispatch(
            actions.reports.create.postReportRequest(data)
        );
        navigate(`${report.id}`);
        hdlCloseDialog();
    };

    const newReportActions = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "end",
                    padding: "1rem 0"
                }}
            >
                <Button
                    variant="outlined"
                    onClick={hdlCloseDialog}
                    sx={{ margin: "0 .5rem", width: "8rem" }}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={hdlConfirmNewReport}
                    disabled={isEnabled}
                    sx={{ width: "8rem" }}
                >
                    Confirm
                </Button>
            </Box>
        );
    };

    return (
        <Box sx={{ display: "flex", flexFlow: "column" }}>
            <TextField
                id="outlined-select-report-option"
                margin="normal"
                select
                label="Report source"
                value={reportSource}
                onChange={hdlReportSource}
                helperText="Please select how you want to create your report"
            >
                {reportSources.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>

            {reportSource === 2 && (
                <TextField
                    id="outlined-select-template"
                    margin="normal"
                    select
                    label="Available templates"
                    value={template}
                    onChange={hdlTemplate}
                >
                    {reportTemplates.data.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            )}

            <TextField
                id="outlined-select-client"
                margin="normal"
                select
                label="Select user"
                value={client}
                onChange={hdlClient}
            >
                <MenuItem key={0} value={0}>
                    None
                </MenuItem>
                {clients.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            {newReportActions()}
        </Box>
    );
};

export default NewReport;
