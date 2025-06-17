import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Store/actions";
import { useTranslation } from "react-i18next";
import { useSnackbar } from "notistack";
import { Button, IconButton, Menu, MenuItem } from "@mui/material";
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
        <Card sx={{ boxShadow: "none", borderRadius: 0, transition: "none" }}>
            <CardHeader
                action={
                    <>
                        <Button
                            variant="text"
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? "long-menu" : undefined}
                            aria-expanded={open ? "true" : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
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
                                    width: "20ch"
                                }
                            }}
                        >
                            {placeholders.map((item) => (
                                <MenuItem
                                    key={item.id}
                                    onClick={hdlPlaceholderSelect(item.value)}
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
                            <MenuItem onClick={hdlRemove}>Remove</MenuItem>
                        </Menu>
                    </>
                }
                title={name}
                sx={{
                    background: "#eee",
                    padding: "1rem",
                    borderRadius: "0.3rem"
                }}
                // subheader="September 14, 2016"
            />
            <CardContent sx={{ padding: "1rem 0" }}>{children}</CardContent>
        </Card>
    );
};

export default CardElement;
