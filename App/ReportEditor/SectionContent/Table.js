import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import actions from "../../Store/actions";
import styles from "./styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CardElement from "./CardElement";
import { update } from "lodash";

export default function DynamicTable({
    isTemplate,
    section,
    index,
    updateSection
}) {
    const dispatch = useDispatch();

    const { reports, reportTemplates } = useSelector((state) => state);

    const table = reports.item[section][index];
    const data = isTemplate ? reportTemplates.item : reports.item;

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
        let data = [];
        for (let i = 0; i < rows; i++) {
            let row = [];
            for (let j = 0; j < cols; j++) {
                row.push("");
            }
            data.push(row);
        }

        const newData = [...data[section]];
        newData[index].isInitiated = true;
        newData[index].value = data;

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

    return (
        <Grid item xs={12} key={index}>
            <CardElement name="Table" section={section} index={index}>
                {!table.isInitiated && (
                    <>
                        <TextField
                            id="rows"
                            label="Rows"
                            type="number"
                            sx={styles.textField}
                            value={rows}
                            onChange={handleChangeRows}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <TextField
                            id="cols"
                            label="Columns"
                            type="number"
                            sx={styles.textField}
                            value={cols}
                            onChange={handleChangeCols}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            sx={styles.button}
                            onClick={handleAddTable}
                        >
                            Create Table
                        </Button>
                    </>
                )}

                <TableContainer>
                    <Table sx={styles.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {[...Array(cols)].map((_, i) => (
                                    <TableCell key={i}>
                                        {" "}
                                        Column {i + 1}{" "}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {table.value.map((row, rowIndex) => (
                                <TableRow key={rowIndex}>
                                    {row.map((cell, colIndex) => (
                                        <TableCell key={colIndex}>
                                            <TextField
                                                defaultValue={cell}
                                                onChange={(e) =>
                                                    hdlDebounce(
                                                        e,
                                                        rowIndex,
                                                        colIndex
                                                    )
                                                }
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CardElement>
        </Grid>
    );
}
