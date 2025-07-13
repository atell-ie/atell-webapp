import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Store/actions";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import {
    Button,
    IconButton,
    Menu,
    MenuItem,
    Box,
    Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const placeholders = [
    {
        id: 1,
        value: "clientName"
    },
    { id: 2, value: "assignmentType" },
    { id: 3, value: "date" }
];

const ITEM_HEIGHT = 48;

const CardElement = ({ name, section, index, children }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const isMenuOpen = Boolean(anchorEl);

    const [anchorPlaceholder, setAnchorPlaceholder] = React.useState(null);
    const open = Boolean(anchorPlaceholder);
    const handleClick = (event) => {
        setAnchorPlaceholder(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorPlaceholder(null);
    };

    const hdlPlaceholderSelect = (value) => () => {
        navigator.clipboard.writeText(`{${value}}`);
        enqueueSnackbar(t("messages.placeholderCopied"), {
            variant: "info"
        });

        handleClose();
    };

    const { reports } = useSelector((state) => state);

    const hdlMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const hdlMenuClose = () => {
        setAnchorEl(null);
    };

    const hdlRemove = () => {
        const newData = [...reports.item[section]];
        newData.splice(index, 1);

        dispatch(actions.reports.create.itemUpdate(section, newData));
    };

    return (
        <Card
            sx={{
                mb: 3,
                borderRadius: "12px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                border: "1px solid #e8e8e8",
                overflow: "hidden"
            }}
        >
            <CardHeader
                action={
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Button
                            variant="text"
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                color: "#1976d2",
                                px: 2,
                                py: 1,
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#f0f7ff"
                                }
                            }}
                        >
                            Add placeholder
                        </Button>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                "aria-labelledby": "long-button"
                            }}
                            anchorEl={anchorPlaceholder}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: "20ch",
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                                }
                            }}
                        >
                            {placeholders.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    onClick={hdlPlaceholderSelect(item.value)}
                                    sx={{
                                        "&:hover": {
                                            backgroundColor: "#f0f7ff"
                                        }
                                    }}
                                >
                                    {item.value}
                                </MenuItem>
                            ))}
                        </Menu>

                        <IconButton
                            color="primary"
                            aria-label="options"
                            size="medium"
                            onClick={hdlMenuOpen}
                            sx={{
                                backgroundColor: "#f5f5f5",
                                border: "1px solid #ddd",
                                borderRadius: "8px",
                                "&:hover": {
                                    backgroundColor: "#eeeeee"
                                }
                            }}
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
                            PaperProps={{
                                style: {
                                    borderRadius: "8px",
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                                }
                            }}
                        >
                            <MenuItem
                                onClick={hdlRemove}
                                sx={{
                                    color: "#d32f2f",
                                    "&:hover": {
                                        backgroundColor: "#ffebee"
                                    }
                                }}
                            >
                                Remove
                            </MenuItem>
                        </Menu>
                    </Box>
                }
                title={
                    <Typography
                        variant="h6"
                        sx={{
                            fontWeight: 600,
                            color: "#1a1a1a",
                            fontSize: "1.1rem"
                        }}
                    >
                        {name}
                    </Typography>
                }
                sx={{
                    backgroundColor: "#fafafa",
                    borderBottom: "1px solid #e8e8e8",
                    px: 3,
                    py: 2
                }}
            />
            <CardContent sx={{ p: 3 }}>{children}</CardContent>
        </Card>
    );
};

export default CardElement;
