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
    TextField,
    Typography,
    Stack,
    Card,
    CardContent,
    CardActions,
    Divider,
    Chip,
    CircularProgress,
    Alert,
    Paper
} from "@mui/material";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const Templates = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const [newTemplate, setNewTemplate] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { reportTemplates } = useSelector((state) => state);

    const ref = useRef("");
    const isMenuOpen = Boolean(anchorEl);

    const hdlMenuOpen = (event, templateId) => {
        event.stopPropagation();
        ref.current = templateId;
        setAnchorEl(event.currentTarget);
    };

    const hdlMenuClose = () => {
        setAnchorEl(null);
    };

    const hdlEditTemplate = (templateId) => () => {
        navigate(`/auth/report-templates/${templateId}`);
    };

    const hdlDeleteTemplate = async () => {
        try {
            await dispatch(
                actions.reportTemplates.create.deleteTemplate(ref.current)
            );
            hdlMenuClose();
        } catch (error) {
            setError("Failed to delete template");
        }
    };

    const hdlAddTemplate = () => {
        setNewTemplate(true);
        setError("");
    };

    const hdlCancelNewTemplate = () => {
        setNewTemplate(false);
        setTemplateName("");
        setError("");
    };

    const onTemplateNameChange = (e) => {
        const { value } = e.target;
        setTemplateName(value);
        setError("");
    };

    const hdlConfirmName = async () => {
        if (!templateName.trim()) {
            setError("Template name is required");
            return;
        }

        setLoading(true);
        try {
            await dispatch(
                actions.reportTemplates.create.postTemplate({
                    name: templateName.trim(),
                    templateType: 1,
                    content: {}
                })
            );
            setTemplateName("");
            setNewTemplate(false);
        } catch (error) {
            setError("Failed to create template");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            hdlConfirmName();
        } else if (event.key === "Escape") {
            hdlCancelNewTemplate();
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Manage your report templates. Create reusable templates to
                streamline report creation.
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {/* Templates List */}
            <Stack spacing={2} sx={{ mb: 3 }}>
                {reportTemplates.data.length === 0 && !newTemplate ? (
                    <Paper
                        sx={{
                            p: 4,
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
                            No templates yet
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 3 }}
                        >
                            Create your first template to get started
                        </Typography>
                    </Paper>
                ) : (
                    reportTemplates.data.map((template) => (
                        <Card
                            key={template.id}
                            sx={{
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    transform: "translateY(-1px)",
                                    boxShadow: 2
                                }
                            }}
                        >
                            <CardContent>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2
                                        }}
                                    >
                                        <DescriptionIcon color="primary" />
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{ fontWeight: 600 }}
                                            >
                                                {template.name}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                            >
                                                Template • Created{" "}
                                                {new Date(
                                                    template.createdAt ||
                                                        Date.now()
                                                ).toLocaleDateString()}
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1
                                        }}
                                    >
                                        <Chip
                                            label="Template"
                                            size="small"
                                            color="primary"
                                            variant="outlined"
                                        />
                                        <IconButton
                                            onClick={(e) =>
                                                hdlMenuOpen(e, template.id)
                                            }
                                            sx={{ color: "text.secondary" }}
                                        >
                                            <MoreVertIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                            </CardContent>
                            <CardActions sx={{ px: 2, pb: 2 }}>
                                <Button
                                    startIcon={<EditIcon />}
                                    onClick={hdlEditTemplate(template.id)}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 500
                                    }}
                                >
                                    Edit Template
                                </Button>
                            </CardActions>
                        </Card>
                    ))
                )}

                {/* New Template Input */}
                {newTemplate && (
                    <Card
                        sx={{
                            bgcolor: "primary.50",
                            border: "2px solid",
                            borderColor: "primary.200"
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2
                                }}
                            >
                                <DescriptionIcon color="primary" />
                                <TextField
                                    autoFocus
                                    fullWidth
                                    label="Template Name"
                                    value={templateName}
                                    onChange={onTemplateNameChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter template name..."
                                    size="small"
                                    disabled={loading}
                                />
                                <Stack direction="row" spacing={1}>
                                    <IconButton
                                        onClick={hdlConfirmName}
                                        disabled={
                                            loading || !templateName.trim()
                                        }
                                        sx={{
                                            color: "success.main",
                                            "&:hover": { bgcolor: "success.50" }
                                        }}
                                    >
                                        {loading ? (
                                            <CircularProgress size={20} />
                                        ) : (
                                            <CheckIcon />
                                        )}
                                    </IconButton>
                                    <IconButton
                                        onClick={hdlCancelNewTemplate}
                                        disabled={loading}
                                        sx={{
                                            color: "error.main",
                                            "&:hover": { bgcolor: "error.50" }
                                        }}
                                    >
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            </Box>
                        </CardContent>
                    </Card>
                )}
            </Stack>

            {/* Add Template Button */}
            <Button
                variant="contained"
                onClick={hdlAddTemplate}
                startIcon={<AddIcon />}
                disabled={newTemplate}
                sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    boxShadow: "none",
                    "&:hover": { boxShadow: 1 }
                }}
            >
                Add Template
            </Button>

            {/* Action Menu */}
            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={hdlMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                        borderRadius: 2
                    }
                }}
            >
                <MenuItem
                    onClick={hdlDeleteTemplate}
                    sx={{ gap: 1, color: "error.main" }}
                >
                    <DeleteIcon fontSize="small" />
                    Delete Template
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default Templates;
