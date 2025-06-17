import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box, Button } from "@mui/material";

function createData(
    disorder,
    occurrences,
    phoneme,
    word,
    sylPosition,
    freq,
    perc
) {
    return { disorder, occurrences, phoneme, word, sylPosition, freq, perc };
}

const rows = [
    createData("Articulation Error", 12, "/f/", "feather", "2nd", 5, "42%"),
    createData("", "", "/l/", "flower", "1st", 4, "33%"),
    createData("", "", "/s/", "box", "3rd", 3, "25%"),
    createData("Phonological Delay", 10, "/k/", "knife", "1st", 4, "40%"),
    createData("", 10, "/l/", "flower", "1st", 4, "40%"),
    createData("", 10, "/f/", "feather", "2nd", 2, "20%"),
    createData("Dysarthria", 6, "/k/", "knife", "1st", 6, "100%"),
    createData("Apraxia", 5, "/s/", "box", "3rd", 5, "100%")
];

export default function BasicTable() {
    return (
        <>
            <TableContainer sx={{ padding: "0 2rem" }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Disorder</TableCell>
                            <TableCell align="right">Occurrences</TableCell>
                            <TableCell align="right">Phoneme</TableCell>
                            <TableCell align="right">Word</TableCell>
                            <TableCell align="right">
                                Syllable Position
                            </TableCell>
                            <TableCell align="right">Frequency</TableCell>
                            <TableCell align="right">Percentage</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.disorder}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0
                                    }
                                }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.disorder}
                                </TableCell>
                                <TableCell align="right">
                                    {row.occurrences}
                                </TableCell>
                                <TableCell align="right">
                                    {row.phoneme}
                                </TableCell>
                                <TableCell align="right">{row.word}</TableCell>
                                <TableCell align="right">
                                    {row.sylPosition}
                                </TableCell>
                                <TableCell align="right">{row.freq}</TableCell>
                                <TableCell align="right">{row.perc}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ width: "100%", textAlign: "center", marginTop: "2rem" }}>
                <Button variant="text" sx={{ marginRight: "1rem" }}>
                    Cancel
                </Button>
                <Button variant="contained" disableElevation>
                    Proceed to generate report
                </Button>
            </Box>
        </>
    );
}
