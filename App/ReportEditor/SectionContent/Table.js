import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import actions from "../../Store/actions";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
    Box,
    Paper,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    Divider
} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function DynamicTable({
    isTemplate,
    section,
    index,
    updateSection
}) {
    const dispatch = useDispatch();
    const { reports, reportTemplates } = useSelector((state) => state);
    const [anchorEl, setAnchorEl] = useState(null);

    const data = isTemplate ? reportTemplates.item : reports.item;
    const table = data[section][index];

    // Alternate between grey and white backgrounds
    const backgroundColor = index % 2 === 0 ? "#fafafa" : "white";

    const [rows, setRows] = useState(table ? table.value.length : 0);
    const [cols, setCols] = useState(
        table.value[0] ? table.value[0].length : 2
    );

    const handleChangeRows = (event) => {
        setRows(event.target.value);
    };

    const handleChangeCols = (event) => {
        setCols(event.target.value);
    };

    const handleAddTable = () => {
        let tableData = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                row.push("");
            }
            tableData.push(row);
        }

        const newData = [...data[section]];
        newData[index].isInitiated = true;
        newData[index].value = tableData;

        updateSection(newData);
    };

    const hdlCellChange = (event, row, col) => {
        let newData = [...data[section]];
        newData[index].value[row][col] = event.target.value;
        updateSection(newData);
    };

    const hdlDebounce = useDebouncedCallback((e, value, index) => {
        hdlCellChange(e, value, index);
    }, 300);

    const hdlMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const hdlMenuClose = () => {
        setAnchorEl(null);
    };

    const hdlRemove = () => {
        const newData = [...data[section]];
        newData.splice(index, 1);
        if (isTemplate) {
            dispatch(
                actions.reportTemplates.create.itemUpdate(section, newData)
            );
        } else {
            dispatch(actions.reports.create.itemUpdate(section, newData));
        }
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
                        Table
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

                {!table.isInitiated && (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                            p: 3,
                            backgroundColor:
                                index % 2 === 0 ? "white" : "#f8f9fa",
                            borderRadius: "8px",
                            border: "1px solid #e8e8e8"
                        }}
                    >
                        <Box sx={{ display: "flex", gap: 2 }}>
                            <TextField
                                id="rows"
                                label="Rows"
                                type="number"
                                value={rows}
                                onChange={handleChangeRows}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                sx={{
                                    flex: 1,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "#f8f9fa"
                                                : "white",
                                        borderRadius: "8px",
                                        "&:hover .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#1976d2"
                                            },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#1976d2"
                                            }
                                    },
                                    "& .MuiInputLabel-root": {
                                        fontWeight: 500,
                                        color: "#555"
                                    }
                                }}
                            />
                            <TextField
                                id="cols"
                                label="Columns"
                                type="number"
                                value={cols}
                                onChange={handleChangeCols}
                                InputLabelProps={{
                                    shrink: true
                                }}
                                sx={{
                                    flex: 1,
                                    "& .MuiOutlinedInput-root": {
                                        backgroundColor:
                                            index % 2 === 0
                                                ? "#f8f9fa"
                                                : "white",
                                        borderRadius: "8px",
                                        "&:hover .MuiOutlinedInput-notchedOutline":
                                            {
                                                borderColor: "#1976d2"
                                            },
                                        "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                            {
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
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleAddTable}
                            startIcon={<AddIcon />}
                            sx={{
                                backgroundColor: "#1976d2",
                                "&:hover": {
                                    backgroundColor: "#1565c0"
                                },
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                                py: 1.5,
                                borderRadius: "8px",
                                boxShadow: "none",
                                alignSelf: "flex-start"
                            }}
                        >
                            Create Table
                        </Button>
                    </Box>
                )}

                {table.isInitiated && (
                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: "8px",
                            border: "1px solid #e8e8e8",
                            overflow: "hidden"
                        }}
                    >
                        <Table aria-label="dynamic table">
                            <TableHead>
                                <TableRow sx={{ backgroundColor: "#f8f9fa" }}>
                                    {[...Array(cols)].map((_, i) => (
                                        <TableCell
                                            key={i}
                                            sx={{
                                                fontWeight: 600,
                                                color: "#333",
                                                borderBottom:
                                                    "2px solid #e8e8e8"
                                            }}
                                        >
                                            Column {i + 1}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {table.value.map((row, rowIndex) => (
                                    <TableRow
                                        key={rowIndex}
                                        sx={{
                                            "&:nth-of-type(odd)": {
                                                backgroundColor: "#fafafa"
                                            },
                                            "&:hover": {
                                                backgroundColor: "#f0f7ff"
                                            }
                                        }}
                                    >
                                        {row.map((cell, colIndex) => (
                                            <TableCell
                                                key={colIndex}
                                                sx={{ p: 1 }}
                                            >
                                                <TextField
                                                    fullWidth
                                                    defaultValue={cell}
                                                    onChange={(e) =>
                                                        hdlDebounce(
                                                            e,
                                                            rowIndex,
                                                            colIndex
                                                        )
                                                    }
                                                    placeholder={`Row ${
                                                        rowIndex + 1
                                                    }, Col ${colIndex + 1}`}
                                                    sx={{
                                                        "& .MuiOutlinedInput-root":
                                                            {
                                                                backgroundColor:
                                                                    "white",
                                                                borderRadius:
                                                                    "6px",
                                                                "& fieldset": {
                                                                    borderColor:
                                                                        "#e8e8e8"
                                                                },
                                                                "&:hover fieldset":
                                                                    {
                                                                        borderColor:
                                                                            "#1976d2"
                                                                    },
                                                                "&.Mui-focused fieldset":
                                                                    {
                                                                        borderColor:
                                                                            "#1976d2"
                                                                    }
                                                            },
                                                        "& .MuiInputBase-input":
                                                            {
                                                                py: 1.5,
                                                                fontSize:
                                                                    "0.875rem"
                                                            }
                                                    }}
                                                />
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
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
}
