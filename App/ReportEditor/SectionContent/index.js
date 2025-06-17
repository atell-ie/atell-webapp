import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import actions from "../../Store/actions";
import { Grid, IconButton, Menu, MenuItem } from "@mui/material";

import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import Title from "./Title";
import Paragraph from "./Paragraph";
import List from "./List";
import Table from "./Table";

import styles from "./styles";

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
        <Grid container>
            {content}
            <Grid item xs={12} sx={styles.moreOptions}>
                <IconButton
                    color="primary"
                    aria-label="options"
                    size="medium"
                    onClick={hdlMenuOpen}
                >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={hdlMenuClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button"
                    }}
                >
                    <MenuItem onClick={hdlMenuSelection("paragraph")}>
                        Paragraph
                    </MenuItem>
                    <MenuItem onClick={hdlMenuSelection("list")}>
                        Bullets list
                    </MenuItem>
                    <MenuItem onClick={hdlMenuSelection("table")}>
                        Table
                    </MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );
};

export default SectionContent;
