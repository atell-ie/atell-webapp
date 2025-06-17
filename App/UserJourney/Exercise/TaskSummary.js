import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    List,
    ListItem,
    ListItemText,
    Grid,
    Tabs,
    Tab,
    Box,
    Paper,
    Popover,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import AppContainer from "../../common/components/AppContainer";
import AppHeader from "../../common/components/AppHeader";

import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import styles from "./styles";

function BasicTable({ rows, hdlPopoverClick }) {
    return (
        <TableContainer component={Paper} sx={{ height: "32rem" }}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: "100" }} align="left">
                            Expected
                        </TableCell>
                        <TableCell style={{ width: "100" }} align="left">
                            Initial
                        </TableCell>
                        <TableCell style={{ width: "100" }} align="left">
                            Medial
                        </TableCell>
                        <TableCell style={{ width: "100" }} align="left">
                            Final
                        </TableCell>
                        <TableCell style={{ width: "100" }} align="left">
                            Actual
                        </TableCell>
                        <TableCell style={{ width: "100" }} align="left">
                            Words
                        </TableCell>
                        <TableCell align="right">Error frequency</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={styles.tBody}>
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
                                align="left"
                                style={{ width: "100" }}
                            >
                                {row.expected}
                            </TableCell>
                            <TableCell align="left" style={{ width: "100" }}>
                                {row.initial}
                            </TableCell>
                            <TableCell align="left" style={{ width: "100" }}>
                                {row.medial}
                            </TableCell>
                            <TableCell align="left" style={{ width: "100" }}>
                                {row.final}
                            </TableCell>
                            <TableCell align="left" style={{ width: "100" }}>
                                {row.actual}
                            </TableCell>
                            <TableCell align="center" style={{ width: "100" }}>
                                <Typography
                                    onClick={hdlPopoverClick(row.words)}
                                >
                                    View
                                </Typography>
                            </TableCell>
                            <TableCell align="right">{row.count}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const TaskSummary = () => {
    const { tasks } = useSelector((state) => state);
    const [rows, setRows] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [words, setWords] = useState([]);

    const hdlPopoverClick = (words) => (event) => {
        setWords(words);
        setAnchorEl(event.currentTarget);
    };

    const hdlPopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const [assesment, setAssesment] = useState("");
    const [value, setValue] = useState("1");

    const hdlTabChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange = (event) => {
        setAssesment(event.target.value);
    };

    useEffect(() => {
        const data = {};
        tasks.item.entries.forEach((item) => {
            Object.keys(item.processErrors).forEach((key) => {
                const mappedSound = item.processErrors[key];

                if (data[key]) {
                    if (data[key][mappedSound])
                        data[key][mappedSound].count += 1;
                    else data[key][mappedSound] = { count: 1 };
                } else {
                    data[key] = {
                        [mappedSound]: { count: 1 }
                    };
                }
            });
        });

        const newRows = [];
        Object.keys(data).forEach((key) => {
            const soundKeys = Object.keys(data[key]);
            soundKeys.forEach((sKey) => {
                const count = data[key][sKey].count;
                newRows.push({
                    expected: key,
                    initial: "",
                    medial: "",
                    final: "",
                    actual: sKey,
                    words: ["Watch", "Gloves", "Sock"],
                    count
                });
            });
        });
        setRows(newRows);
    }, []);

    const Sounds = ({ index, sounds }) => {
        return Object.keys(sounds).map((sound) => {
            return (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography>{`${index}`}</Typography>
                    <ArrowForwardIosIcon
                        fontSize="small"
                        sx={{
                            marginTop: "0 !important",
                            fontSize: "1rem",
                            margin: "0 .5rem"
                        }}
                    />
                    <Typography>{`${sound}`}</Typography>
                </Box>
            );
        });
    };

    return (
        <>
            {" "}
            <AppHeader>
                <Typography>Summary page</Typography>
            </AppHeader>
            <AppContainer>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <TabContext value={value}>
                            <Tabs
                                value={value}
                                onChange={hdlTabChange}
                                indicatorColor="secondary"
                                textColor="inherit"
                                variant="fullWidth"
                                aria-label="full width tabs example"
                                style={{ background: "#fff" }}
                            >
                                <Tab label="Consonants" value="1" />
                                <Tab label="Vowels" value="2" />
                            </Tabs>
                            <TabPanel value="1" style={{ padding: 0 }}>
                                <BasicTable
                                    rows={rows}
                                    // classes={classes}
                                    hdlPopoverClick={hdlPopoverClick}
                                />
                            </TabPanel>
                            <TabPanel value="2" style={{ padding: 0 }}>
                                <BasicTable
                                    rows={rows}
                                    // classes={classes}
                                    hdlPopoverClick={hdlPopoverClick}
                                />
                            </TabPanel>
                        </TabContext>
                        <Popover
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={hdlPopoverClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left"
                            }}
                        >
                            <Typography sx={{ p: 2 }}>
                                Words containing error
                            </Typography>
                            <List>
                                {words.map((word, index) => {
                                    return (
                                        <ListItem
                                            key={index}
                                            secondaryAction={"Play"}
                                        >
                                            <ListItemText
                                                primary={word}
                                                // secondary={"secondary text"}
                                            />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </Popover>

                        {/* <Stack spacing={2}>
                        {Object.keys(errors).map((key) => (
                            <Sounds
                                key={key}
                                index={key}
                                sounds={errors[key]}
                            />
                        ))}
                    </Stack> */}
                    </Grid>
                    <Grid item xs={4}>
                        <Paper sx={styles.paper}>
                            <Typography>Please assign template</Typography>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Assesment template
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={assesment}
                                    label="Assesment template"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Template 1</MenuItem>
                                    <MenuItem value={20}>Template 2</MenuItem>
                                    <MenuItem value={30}>Template 3</MenuItem>
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>
                </Grid>
            </AppContainer>
        </>
    );
};

export default TaskSummary;
