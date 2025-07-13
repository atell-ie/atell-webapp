import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import actions from "../../Store/actions";
import {
    Box,
    Button,
    IconButton,
    TextField,
    Typography,
    Menu,
    MenuItem,
    Divider
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default ({ isTemplate, section, index, updateSection }) => {
    const dispatch = useDispatch();
    const { reports, reportTemplates } = useSelector((state) => state);
    const [anchorEl, setAnchorEl] = useState(null);

    const data = isTemplate ? reportTemplates.item : reports.item;
    const values = data[section][index].value;

    // Alternate between grey and white backgrounds
    const backgroundColor = index % 2 === 0 ? "#fafafa" : "white";

    const hdlDataChange = (value, itemIndx) => {
        const newData = [...data[section]];
        newData[index].value[itemIndx] = value;
        updateSection(newData);
    };

    const hdlDebounce = useDebouncedCallback((value, index) => {
        hdlDataChange(value, index);
    }, 500);

    const hdlAddItem = () => {
        const newData = [...data[section]];
        newData[index].value.push("");
        dispatch(actions.reports.create.itemUpdate(section, newData));
    };

    const hdlMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const hdlMenuClose = () => {
        setAnchorEl(null);
    };

    const hdlRemove = () => {
        const newData = [...data[section]];
        newData.splice(index, 1);
        dispatch(actions.reports.create.itemUpdate(section, newData));
        hdlMenuClose();
    };

    return (
        <Box>
            <Box
                sx={{
                    mb: 4,
                    p: 3,
                    backgroundColor: backgroundColor,
                    borderRadius: "8px",
                    border: "1px solid #e8e8e8"
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        sx={{
                            fontWeight: 600,
                            color: "#333",
                            fontSize: "0.9rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.5px"
                        }}
                    >
                        List
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={hdlMenuOpen}
                        sx={{
                            color: "#666",
                            "&:hover": {
                                backgroundColor:
                                    index % 2 === 0 ? "#f0f0f0" : "#f5f5f5"
                            }
                        }}
                    >
                        <MoreVertIcon fontSize="small" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={hdlMenuClose}
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

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {values.map((value, itemIndex) => (
                        <Box
                            key={itemIndex}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2
                            }}
                        >
                            <CircleIcon
                                sx={{
                                    fontSize: 8,
                                    color: "#666",
                                    flexShrink: 0,
                                    mt: 2
                                }}
                            />
                            <TextField
                                fullWidth
                                margin="dense"
                                id={`item=${itemIndex}`}
                                onChange={(e) =>
                                    hdlDebounce(e.target.value, itemIndex)
                                }
                                defaultValue={value}
                                placeholder={`List item ${itemIndex + 1}`}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "white"
                                                : "#f8f9fa",
                                        borderRadius: "8px",
                                        "&:hover .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#1976d2"
                                            },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#1976d2"
                                            }
                                    }
                                }}
                            />
                        </Box>
                    ))}

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            mt: 1
                        }}
                    >
                        <CircleIcon
                            sx={{
                                fontSize: 8,
                                color: "#ccc",
                                flexShrink: 0
                            }}
                        />
                        <Button
                            variant="outlined"
                            onClick={hdlAddItem}
                            startIcon={<AddIcon />}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                borderColor: "#ddd",
                                color: "#555",
                                borderRadius: "8px",
                                px: 3,
                                py: 1.5,
                                "&:hover": {
                                    borderColor: "#1976d2",
                                    backgroundColor: "#f0f7ff"
                                }
                            }}
                        >
                            Add item
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Section Divider */}
            <Divider
                sx={{
                    mb: 4,
                    borderColor: "#e8e8e8",
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "40px",
                        height: "2px",
                        backgroundColor: "#1976d2",
                        borderRadius: "1px"
                    }
                }}
            />
        </Box>
    );
};
