import React from "react";
import { Box, Grid, Typography } from "@mui/material/";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import VoiceOverOffIcon from "@mui/icons-material/VoiceOverOff";
import styles from "./styles.js";

function createData(col, a, b, c, d, e, f, g, h) {
    return { col, a, b, c, d, e, f, g, h };
}

const BasicTable = ({ hdlSymbolClick }) => {
    const rows = [
        createData(
            <Box></Box>,
            <Box sx={styles.soundBlock}>
                <VoiceOverOffIcon />
                <RecordVoiceOverIcon />
            </Box>,
            <Box sx={styles.soundBlock}>
                <VoiceOverOffIcon />
                <RecordVoiceOverIcon />
            </Box>,
            <Box sx={styles.soundBlock}>
                <VoiceOverOffIcon />
                <RecordVoiceOverIcon />
            </Box>,
            <Box sx={styles.soundBlock}>
                <VoiceOverOffIcon />
                <RecordVoiceOverIcon />
            </Box>,
            <Box sx={styles.soundBlock}>
                <VoiceOverOffIcon />
                <RecordVoiceOverIcon />
            </Box>,
            <Box sx={styles.soundBlock}>
                <VoiceOverOffIcon />
                <RecordVoiceOverIcon />
            </Box>,
            <Box sx={styles.soundBlock}>
                <VoiceOverOffIcon />
                <RecordVoiceOverIcon />
            </Box>,
            <Box sx={styles.soundBlock}>
                <VoiceOverOffIcon />
                <RecordVoiceOverIcon />
            </Box>
        ),
        createData(
            <Box>Plosive</Box>,
            <Box sx={styles.soundBlock}>
                <Box onClick={hdlSymbolClick("p")}>p</Box>
                <Box onClick={hdlSymbolClick("b")}>b</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box onClick={hdlSymbolClick("t")}>t</Box>
                <Box onClick={hdlSymbolClick("d")}>d</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box onClick={hdlSymbolClick("k")}>k</Box>
                <Box onClick={hdlSymbolClick("g")}>g</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box onClick={hdlSymbolClick("ʔ")}>ʔ</Box>
                <Box></Box>
            </Box>
        ),
        createData(
            <Box>Nasal</Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box onClick={hdlSymbolClick("m")}>m</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box onClick={hdlSymbolClick("n")}>n</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box onClick={hdlSymbolClick("ŋ")}>ŋ</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>
        ),
        createData(
            <Box>Fricatives</Box>,

            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box onClick={hdlSymbolClick("f")}>f</Box>
                <Box onClick={hdlSymbolClick("v")}>v</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box onClick={hdlSymbolClick("θ")}>θ</Box>
                <Box onClick={hdlSymbolClick("ð")}>ð</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box onClick={hdlSymbolClick("s")}>s</Box>
                <Box onClick={hdlSymbolClick("z")}>z</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box onClick={hdlSymbolClick("ʃ")}>ʃ</Box>
                <Box onClick={hdlSymbolClick("ʒ")}>ʒ</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box onClick={hdlSymbolClick("h")}></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box onClick={hdlSymbolClick("h")}>h</Box>
                <Box></Box>
            </Box>
        ),
        createData(
            <Box>Affricates</Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box onClick={hdlSymbolClick("tʃ")}>tʃ</Box>
                <Box onClick={hdlSymbolClick("dʒ")}>dʒ</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>
        ),
        createData(
            <Box>Liquid</Box>,

            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box onClick={hdlSymbolClick("23")}>l, ɫ, ɹ</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>
        ),
        createData(
            <Box>Glide</Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box onClick={hdlSymbolClick("w")}>w</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box onClick={hdlSymbolClick("j")}>j</Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>,
            <Box sx={styles.soundBlock}>
                <Box></Box>
                <Box></Box>
            </Box>
        )
    ];

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ width: "5rem" }}></TableCell>
                        <TableCell sx={styles.soundGroup}>Bilabial</TableCell>
                        <TableCell sx={styles.soundGroup}>
                            Labiodental
                        </TableCell>
                        <TableCell sx={styles.soundGroup}>Dental</TableCell>
                        <TableCell sx={styles.soundGroup}>Alveolar</TableCell>
                        <TableCell sx={styles.soundGroup}>
                            Postalveolar
                        </TableCell>
                        <TableCell sx={styles.soundGroup}>Palatal</TableCell>
                        <TableCell sx={styles.soundGroup}>Velar</TableCell>
                        <TableCell sx={styles.soundGroup}>Glottal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0
                                }
                            }}
                        >
                            <TableCell
                                component="th"
                                scope="row"
                                sx={{ width: "5rem" }}
                            >
                                {row.col}
                            </TableCell>
                            <TableCell align="right">{row.a}</TableCell>
                            <TableCell align="right">{row.b}</TableCell>
                            <TableCell align="right">{row.c}</TableCell>
                            <TableCell align="right">{row.d}</TableCell>
                            <TableCell align="right">{row.e}</TableCell>
                            <TableCell align="right">{row.f}</TableCell>
                            <TableCell align="right">{row.g}</TableCell>
                            <TableCell align="right">{row.h}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const Consonants = ({ hdlSymbolClick }) => {
    return (
        <Grid container sx={{ background: "#eee" }}>
            <Grid item xs={12} sx={{ padding: ".5rem" }}>
                <Typography>Place</Typography>
            </Grid>
            <Grid
                item
                xs={0.5}
                sx={{
                    writingMode: "vertical-lr",
                    textOrientation: "mixed",
                    transform: "rotate(180deg)",
                    padding: ".5rem"
                }}
            >
                <Typography>Manner</Typography>
            </Grid>
            <Grid item xs={11.5} sx={{ padding: ".5rem" }}>
                <BasicTable hdlSymbolClick={hdlSymbolClick} />
            </Grid>
        </Grid>
    );
};

export default Consonants;
