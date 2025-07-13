import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import actions from "../../Store/actions";
import {
    Box,
    TextField,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Divider
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default ({ isTemplate, section, index, updateSection }) => {
    const dispatch = useDispatch();
    const { reports, reportTemplates } = useSelector((state) => state);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const data = isTemplate ? reportTemplates.item : reports.item;
    const paragraphValue = data[section][index].value;

    // Alternate between grey and white backgrounds
    const backgroundColor = index % 2 === 0 ? "#fafafa" : "white";

    const hdlDataChange = (value, index) => {
        const newData = [...data[section]];
        newData[index].value = value;
        updateSection(newData);
    };

    const hdlDebounce = useDebouncedCallback((value, index) => {
        hdlDataChange(value, index);
    }, 500);

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
                        Paragraph
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

                <TextField
                    fullWidth
                    margin="dense"
                    id={`paragraph-${index}`}
                    label="Text Content"
                    onChange={(e) => hdlDebounce(e.target.value, index)}
                    defaultValue={paragraphValue}
                    multiline
                    rows={4}
                    placeholder="Enter your paragraph content here..."
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            backgroundColor:
                                index % 2 === 0 ? "white" : "#f8f9fa",
                            borderRadius: "8px",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#1976d2"
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#1976d2"
                            }
                        },
                        "& .MuiInputLabel-root": {
                            fontWeight: 500,
                            color: "#555"
                        }
                    }}
                />
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
