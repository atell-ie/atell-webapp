import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import actions from "../Store/actions";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, TextField, Button } from "@mui/material";
import styles from "./styles.js";

import AppDialog from "../common/components/AppDialog";
import SectionContent from "./SectionContent";

// TODO: this modal needs refactoring

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

    const { reports, reportTemplates } = useSelector((state) => state);

    const isTemplate = templateId ? true : false;

    const hdlSectionName = (e) => {
        const { value } = e.target;
        setSectionName(value);
    };

    const hdlSectionDialogClose = () => {
        setSectionOpen(false);
    };

    const saveChange = (data) => {
        if (isTemplate)
            dispatch(
                actions.reportTemplates.create.putTemplateRequest(
                    templateId,
                    data
                )
            );
        else dispatch(actions.reports.create.putReportRequest(reportId, data));
    };

    const hdlSaveClick = () => {
        saveChange(isTemplate ? reportTemplates.item : reports.item);
        hdlDialogClose();
    };

    const hdlSectionSave = () => {
        let newReport = null;

        if (isTemplate) newReport = { ...reportTemplates.item };
        else newReport = { ...reports.item };

        const newSection = sectionName.toLowerCase().replace(" ", "-");
        newReport[newSection] = [
            {
                value: sectionName,
                element: "title"
            }
        ];

        saveChange(newReport);
        hdlSectionDialogClose();
        setSectionName("");
    };

    const getDialogActions = () => {
        return (
            <>
                <Button
                    variant="outlined"
                    onClick={hdlDialogClose}
                    sx={styles.actionBtn}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={hdlSaveClick}
                    sx={styles.actionBtn}
                >
                    Save
                </Button>
            </>
        );
    };

    const getSectionDialogActions = () => {
        return (
            <>
                <Button
                    variant="outlined"
                    onClick={hdlSectionDialogClose}
                    sx={styles.actionBtn}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    disabled={sectionName === ""}
                    onClick={hdlSectionSave}
                    sx={styles.actionBtn}
                >
                    Confirm
                </Button>
            </>
        );
    };

    const sectionCreationContent = () => {
        return (
            <>
                <Typography>Enter your page section title</Typography>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    type="text"
                    fullWidth
                    variant="standard"
                    defaultValue={sectionName}
                    onChange={hdlSectionName}
                />
            </>
        );
    };

    const confirmDeletion = async () => {
        let newReport = null;
        if (isTemplate) newReport = { ...reportTemplates.item };
        else newReport = { ...reports.item };

        delete newReport[deleteSection];
        saveChange(newReport);
        hdlSectionDialogClose();
    };

    const sectionDeletionContent = () => {
        return <Typography>Confirm section deletion</Typography>;
    };

    const getSectionDeletionActions = () => {
        return (
            <>
                <Button
                    variant="outlined"
                    onClick={hdlSectionDialogClose}
                    sx={styles.actionBtn}
                >
                    Cancel
                </Button>
                <Button
                    variant="contained"
                    onClick={confirmDeletion}
                    sx={styles.actionBtn}
                    autoFocus
                >
                    Confirm
                </Button>
            </>
        );
    };

    return (
        <>
            <AppDialog
                title={`Section`}
                open={open}
                handleClose={hdlDialogClose}
                dialogActions={getDialogActions}
                size="md"
            >
                <SectionContent section={section} />
            </AppDialog>
            <AppDialog
                title={`New report section`}
                open={sectionOpen}
                handleClose={hdlSectionDialogClose}
                dialogActions={
                    action === "create"
                        ? getSectionDialogActions
                        : getSectionDeletionActions
                }
                size="sm"
            >
                {action === "create"
                    ? sectionCreationContent()
                    : sectionDeletionContent()}
            </AppDialog>
        </>
    );
};

export default ReportEditorModal;
