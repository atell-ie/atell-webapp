import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Store/actions";
import {
    Box,
    Button,
    Menu,
    MenuItem,
    IconButton,
    TextField
} from "@mui/material";
import { List, ListItem, ListItemText } from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";

const Templates = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [newTemplate, setNewTemplate] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [loading, setLoading] = useState(false);

    const { reportTemplates } = useSelector((state) => state);

    const ref = useRef("");
    const isMenuOpen = Boolean(anchorEl);

    const hdlMenuOpen = (event, templateId) => {
        // set key of the template row
        ref.current = templateId;
        setAnchorEl(event.currentTarget);
    };
    const hdlMenuClose = () => {
        setAnchorEl(null);
    };

    const hdlEditSection = (templateId) => () => {
        // go to template editing page
        navigate(`/auth/report-templates/${templateId}`);
    };

    const hdlDeleteSection = async () => {
        await dispatch(
            actions.reportTemplates.create.deleteTemplateRequest(ref.current)
        );
        hdlMenuClose();
    };

    const hdlAddTemplate = () => {
        setNewTemplate(true);
    };

    const onTemplateNameChange = (e) => {
        const { value } = e.target;
        setTemplateName(value);
    };

    const hdlConfirmName = async () => {
        setLoading(true);
        await dispatch(
            actions.reportTemplates.create.postTemplateRequest({
                name: templateName
            })
        );
        setTemplateName("");
        setNewTemplate(false);
        setLoading(false);
    };

    const getMenuActions = (key) => {
        return (
            <>
                <IconButton
                    name={key}
                    aria-label="section-options"
                    onClick={(e) => hdlMenuOpen(e, key)}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="template-menu"
                    anchorEl={anchorEl}
                    open={isMenuOpen}
                    onClose={hdlMenuClose}
                >
                    {/* <MenuItem key="edit" onClick={hdlEditSection}>
                        Edit
                    </MenuItem> */}
                    <MenuItem key="delete" onClick={hdlDeleteSection}>
                        Delete
                    </MenuItem>
                </Menu>
            </>
        );
    };

    return (
        <Box>
            <List>
                {reportTemplates.data.map((item) => {
                    return (
                        <ListItem
                            key={item.id}
                            secondaryAction={getMenuActions(item.id)}
                            sx={{
                                borderRadius: ".3rem",
                                border: "1px solid #ccc",
                                margin: ".5rem 0"
                            }}
                        >
                            <ListItemText primary={item.name} />
                            <Button
                                variant="text"
                                sx={{ marginRight: "2rem" }}
                                onClick={hdlEditSection(item.id)}
                            >
                                Edit
                            </Button>
                        </ListItem>
                    );
                })}
                {newTemplate && (
                    <ListItem>
                        <TextField
                            id="outlined-template-name"
                            margin="normal"
                            label="Template name"
                            fullWidth
                            value={templateName}
                            onChange={onTemplateNameChange}
                        />
                        <IconButton
                            name="template-name"
                            aria-label="confirm-template-name"
                            onClick={hdlConfirmName}
                        >
                            <DoneIcon />
                        </IconButton>
                    </ListItem>
                )}
            </List>
            <Button variant="contained" onClick={hdlAddTemplate}>
                Add template
            </Button>
        </Box>
    );
};

export default Templates;
