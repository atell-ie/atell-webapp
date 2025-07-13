import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import actions from "../../Store/actions";
import { IconButton, Menu, MenuItem, Box, Typography } from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import ListIcon from "@mui/icons-material/List";
import TableChartIcon from "@mui/icons-material/TableChart";

import Title from "./Title";
import Paragraph from "./Paragraph";
import List from "./List";
import Table from "./Table";

const SectionContent = ({ section }) => {
    const dispatch = useDispatch();
    const { reports, reportTemplates } = useSelector((state) => state);
    const { reportId, templateId } = useParams();

    const [anchorEl, setAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isTemplate = templateId ? true : false;

    const hdlMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const hdlMenuClose = () => {
        setAnchorEl(null);
    };

    const reportData = isTemplate ? reportTemplates.item : reports.item;

    const updateSection = (data) => {
        if (isTemplate)
            dispatch(actions.reportTemplates.create.itemUpdate(section, data));
        else dispatch(actions.reports.create.itemUpdate(section, data));
    };

    const hdlMenuSelection = (contentType) => () => {
        const newData = [...reportData[section]];

        if (contentType == "paragraph") {
            newData.push({
                value: "",
                element: "paragraph"
            });
        }

        if (contentType == "list") {
            newData.push({
                value: [],
                element: "list"
            });
        }

        if (contentType == "table") {
            newData.push({
                value: [],
                isInitiated: false,
                element: "table"
            });
        }

        updateSection(newData);
        hdlMenuClose();
    };

    const content = useMemo(() => {
        let initContent = [];
        console.log("reportData", reportData);
        reportData[section].forEach((item, index) => {
            let content = "";
            if (item.element == "title")
                content = (
                    <Title
                        key={index}
                        isTemplate={isTemplate}
                        index={index}
                        section={section}
                        updateSection={updateSection}
                    />
                );
            else if (item.element === "paragraph")
                content = (
                    <Paragraph
                        key={index}
                        isTemplate={isTemplate}
                        index={index}
                        section={section}
                        updateSection={updateSection}
                    />
                );
            else if (item.element === "list")
                content = (
                    <List
                        key={index}
                        isTemplate={isTemplate}
                        index={index}
                        section={section}
                        updateSection={updateSection}
                    />
                );
            else if (item.element === "table")
                content = (
                    <Table
                        key={index}
                        isTemplate={isTemplate}
                        index={index}
                        section={section}
                        updateSection={updateSection}
                    />
                );

            initContent.push(content);
        });

        return initContent;
    }, [reportTemplates.item, reports.item]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
            {content}

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <IconButton
                    onClick={hdlMenuOpen}
                    sx={{
                        backgroundColor: "#1976d2",
                        color: "white",
                        borderRadius: "12px",
                        width: 48,
                        height: 48,
                        "&:hover": {
                            backgroundColor: "#1565c0"
                        },
                        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.3)"
                    }}
                >
                    <AddIcon />
                </IconButton>
                <Menu
                    id="content-menu"
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={hdlMenuClose}
                    MenuListProps={{
                        "aria-labelledby": "content-button"
                    }}
                    PaperProps={{
                        style: {
                            borderRadius: "12px",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                            minWidth: 200
                        }
                    }}
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "center"
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "center"
                    }}
                >
                    <MenuItem
                        onClick={hdlMenuSelection("paragraph")}
                        sx={{
                            py: 1.5,
                            px: 2,
                            "&:hover": {
                                backgroundColor: "#f0f7ff"
                            }
                        }}
                    >
                        <TextFieldsIcon sx={{ mr: 2, color: "#1976d2" }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Paragraph
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={hdlMenuSelection("list")}
                        sx={{
                            py: 1.5,
                            px: 2,
                            "&:hover": {
                                backgroundColor: "#f0f7ff"
                            }
                        }}
                    >
                        <ListIcon sx={{ mr: 2, color: "#1976d2" }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Bullets list
                        </Typography>
                    </MenuItem>
                    <MenuItem
                        onClick={hdlMenuSelection("table")}
                        sx={{
                            py: 1.5,
                            px: 2,
                            "&:hover": {
                                backgroundColor: "#f0f7ff"
                            }
                        }}
                    >
                        <TableChartIcon sx={{ mr: 2, color: "#1976d2" }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            Table
                        </Typography>
                    </MenuItem>
                </Menu>
            </Box>
        </Box>
    );
};

export default SectionContent;
