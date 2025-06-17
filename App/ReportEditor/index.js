import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import actions from "../Store/actions";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Box, Button, CircularProgress } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import styles from "./styles.js";

import { Typography, IconButton } from "@mui/material";
import { Card, CardHeader, CardActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import PdfGenerator from "./PdfGenerator";
import Modal from "./Modal";

const Report = () => {
    const dispatch = useDispatch();
    // component used to create template or report
    const { reportId, templateId } = useParams();
    let navigate = useNavigate();
    const { t } = useTranslation();
    const { reports, reportTemplates } = useSelector((state) => state);
    const { enqueueSnackbar } = useSnackbar();

    const [loading, setLoading] = useState(true);

    const [action, setAction] = useState("create");
    const [open, setOpen] = useState(false);
    const [sectionOpen, setSectionOpen] = useState(false);
    const [section, setSection] = useState("main");
    const [deleteSection, setDeleteSection] = useState(null);

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

    useEffect(() => {
        if (isTemplate)
            dispatch(
                actions.reportTemplates.create.getTemplateRequest(templateId)
            );
        else dispatch(actions.reports.create.getReportRequest(reportId));
    }, []);

    let report = null;
    if (isTemplate) report = reportTemplates.item;
    else report = reports.item;

    if (!report)
        return (
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        );

    return (
        <Box sx={{ height: "90%" }}>
            <Box
                sx={styles.clientHeader}
                sx={{
                    height: "5%",
                    display: "flex",
                    justifyContent: "space-between"
                }}
            >
                <Typography variant="h5" component="div">
                    {isTemplate ? "Template editor" : "Report"}
                </Typography>
            </Box>
            <Grid container sx={{ height: "85%" }}>
                <Grid
                    item
                    xs={4}
                    sx={{
                        background: "#ccc",
                        padding: "1rem",
                        overflowY: "scroll",
                        height: "100%"
                    }}
                >
                    {Object.keys(report).map((key) => {
                        const section = report[key];
                        return (
                            <Card key={key} sx={{ marginBottom: "1rem" }}>
                                <CardHeader
                                    action={
                                        <IconButton
                                            onClick={hdlDeleteSection(key)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    }
                                    title={section[0].value}
                                    titleTypographyProps={{ variant: "h6" }}
                                    // subheader="September 14, 2016"
                                />
                                {/* <CardActionArea>
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            component="div"
                                        >
                                            {section[0].value}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea> */}
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="primary"
                                        onClick={hdlCardClick(key)}
                                    >
                                        Edit
                                    </Button>
                                </CardActions>
                            </Card>
                        );
                    })}
                    <Button
                        variant="contained"
                        onClick={hdlSectionDialogOpen}
                        disableElevation
                        endIcon={<AddIcon />}
                        sx={{ width: "100%" }}
                    >
                        Add section
                    </Button>
                </Grid>
                <Grid item xs={8}>
                    <PdfGenerator />
                </Grid>
            </Grid>

            <Modal
                open={open}
                action={action}
                section={section}
                sectionOpen={sectionOpen}
                deleteSection={deleteSection}
                setSectionOpen={setSectionOpen}
                hdlDialogClose={hdlDialogClose}
            />
        </Box>
    );
};

export default Report;
