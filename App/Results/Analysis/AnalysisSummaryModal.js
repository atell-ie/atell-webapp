import React, { useMemo, useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Chip,
    Divider,
    Grid,
    ToggleButton,
    ToggleButtonGroup,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tabs,
    Tab,
    Card,
    CardContent,
    LinearProgress,
    Collapse,
    IconButton,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tooltip
} from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import GroupIcon from "@mui/icons-material/Group";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BarChartIcon from "@mui/icons-material/BarChart";
import ViewListIcon from "@mui/icons-material/ViewList";
import TuneIcon from "@mui/icons-material/Tune";
import InfoIcon from "@mui/icons-material/Info";

const AnalysisSummaryModal = ({ open, onClose }) => {
    const navigate = useNavigate();
    const { sessionId } = useParams();
    const [groupBy, setGroupBy] = useState("disorder");
    const [sortBy, setSortBy] = useState("occurrences");
    const [viewMode, setViewMode] = useState("grouped");
    const [tabValue, setTabValue] = useState(0);

    const { analysisPhonemes, typesList, wordIpas, results, wordsList } =
        useSelector((state) => state);

    // Calculate summary data with smart grouping
    const summaryData = useMemo(() => {
        if (!analysisPhonemes.data || !typesList.disorderSubcategories.data) {
            return {
                disorders: [],
                totalPhonemes: 0,
                totalDisorders: 0,
                groupedData: {},
                disorderTypes: [],
                phonemeTypes: []
            };
        }

        const disorderMap = new Map();
        const disorderTypes = new Set();
        const phonemeTypes = new Set();
        const disorderCounts = new Map(); // Track total occurrences per disorder type
        let totalDisorders = 0;
        let totalPhonemes = 0;

        // Process all active analysis phonemes
        analysisPhonemes.data.forEach((ap) => {
            if (!ap.active || !ap.disorderSubcategory) return;

            totalDisorders++;

            // Get disorder info
            const disorderIndex =
                typesList.disorderSubcategories.byId[ap.disorderSubcategory];
            const disorder =
                typesList.disorderSubcategories.data[disorderIndex];

            if (!disorder) return;

            // Get phoneme info
            const phonemeIndex = wordIpas.byId[ap.wordIpa];
            const phoneme = wordIpas.data[phonemeIndex];

            if (!phoneme) return;

            // Get IPA symbol
            const ipaIndex = typesList.ipas.byId[phoneme.ipa];
            const ipa = typesList.ipas.data[ipaIndex];

            if (!ipa) return;

            // Get word info
            const wordIndex = wordsList.byId[phoneme.word];
            const word = wordsList.data[wordIndex];

            disorderTypes.add(disorder.name);
            phonemeTypes.add(ipa.ipa);

            // Count total occurrences per disorder type
            disorderCounts.set(
                disorder.name,
                (disorderCounts.get(disorder.name) || 0) + 1
            );

            const key = `${disorder.name}_${ipa.ipa}`;

            if (!disorderMap.has(key)) {
                disorderMap.set(key, {
                    disorderName: disorder.name,
                    phoneme: ipa.ipa,
                    occurrences: 0,
                    words: new Set(),
                    positions: new Set()
                });
            }

            const entry = disorderMap.get(key);
            entry.occurrences++;
            if (word) entry.words.add(word.word);
            entry.positions.add(phoneme.position || "Unknown");
        });

        // Count total unique phonemes analyzed
        const uniquePhonemes = new Set();
        wordIpas.data.forEach((phoneme) => {
            const ipaIndex = typesList.ipas.byId[phoneme.ipa];
            const ipa = typesList.ipas.data[ipaIndex];
            if (ipa) uniquePhonemes.add(ipa.ipa);
        });
        totalPhonemes = uniquePhonemes.size;

        // Convert map to array and calculate meaningful percentages
        const disorders = Array.from(disorderMap.values()).map((disorder) => {
            const disorderTypeTotal =
                disorderCounts.get(disorder.disorderName) || 0;

            return {
                ...disorder,
                words: Array.from(disorder.words),
                positions: Array.from(disorder.positions),
                disorderTypeTotal: disorderTypeTotal
            };
        });

        // Apply sorting
        let sortedDisorders = [...disorders];
        switch (sortBy) {
            case "occurrences":
                sortedDisorders.sort((a, b) => b.occurrences - a.occurrences);
                break;
            case "disorder":
                sortedDisorders.sort((a, b) =>
                    a.disorderName.localeCompare(b.disorderName)
                );
                break;
            case "phoneme":
                sortedDisorders.sort((a, b) =>
                    a.phoneme.localeCompare(b.phoneme)
                );
                break;
        }

        // Apply filtering - removed severity filtering since it's not meaningful

        // Group data based on groupBy selection
        const groupedData = {};
        if (groupBy === "disorder") {
            sortedDisorders.forEach((disorder) => {
                if (!groupedData[disorder.disorderName]) {
                    groupedData[disorder.disorderName] = [];
                }
                groupedData[disorder.disorderName].push(disorder);
            });
        } else if (groupBy === "phoneme") {
            sortedDisorders.forEach((disorder) => {
                if (!groupedData[disorder.phoneme]) {
                    groupedData[disorder.phoneme] = [];
                }
                groupedData[disorder.phoneme].push(disorder);
            });
        }

        return {
            disorders: sortedDisorders,
            totalPhonemes,
            totalDisorders,
            groupedData,
            disorderTypes: Array.from(disorderTypes),
            phonemeTypes: Array.from(phonemeTypes),
            disorderCounts: Object.fromEntries(disorderCounts)
        };
    }, [
        analysisPhonemes.data,
        typesList,
        wordIpas.data,
        wordsList.data,
        groupBy,
        sortBy
    ]);

    const handleProceedToReport = () => {
        onClose();
        navigate(`/auth/sessions`);
    };

    const renderGroupedView = () => {
        return (
            <Box>
                {Object.entries(summaryData.groupedData).map(
                    ([groupName, items]) => (
                        <Accordion key={groupName} defaultExpanded>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {groupName}
                                    </Typography>
                                    <Chip
                                        label={`${items.length} patterns`}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                    <Chip
                                        label={`${items.reduce(
                                            (sum, item) =>
                                                sum + item.occurrences,
                                            0
                                        )} total`}
                                        size="small"
                                        color="secondary"
                                    />
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer
                                    component={Paper}
                                    variant="outlined"
                                >
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow
                                                sx={{ bgcolor: "grey.50" }}
                                            >
                                                {groupBy !== "disorder" && (
                                                    <TableCell
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        Disorder Type
                                                    </TableCell>
                                                )}
                                                {groupBy !== "phoneme" && (
                                                    <TableCell
                                                        sx={{ fontWeight: 600 }}
                                                    >
                                                        Phoneme
                                                    </TableCell>
                                                )}
                                                <TableCell
                                                    sx={{ fontWeight: 600 }}
                                                    align="center"
                                                >
                                                    Occurrences
                                                </TableCell>
                                                <TableCell
                                                    sx={{ fontWeight: 600 }}
                                                    align="center"
                                                >
                                                    Affected Words
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {items.map((disorder, index) => (
                                                <TableRow key={index} hover>
                                                    {groupBy !== "disorder" && (
                                                        <TableCell>
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    fontWeight: 500
                                                                }}
                                                            >
                                                                {
                                                                    disorder.disorderName
                                                                }
                                                            </Typography>
                                                        </TableCell>
                                                    )}
                                                    {groupBy !== "phoneme" && (
                                                        <TableCell>
                                                            <Chip
                                                                label={
                                                                    disorder.phoneme
                                                                }
                                                                size="small"
                                                                color="primary"
                                                                variant="outlined"
                                                            />
                                                        </TableCell>
                                                    )}
                                                    <TableCell align="center">
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 500
                                                            }}
                                                        >
                                                            {
                                                                disorder.occurrences
                                                            }
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                flexWrap:
                                                                    "wrap",
                                                                gap: 0.5
                                                            }}
                                                        >
                                                            {disorder.words
                                                                .slice(0, 3)
                                                                .map(
                                                                    (
                                                                        word,
                                                                        idx
                                                                    ) => (
                                                                        <Chip
                                                                            key={
                                                                                idx
                                                                            }
                                                                            label={
                                                                                word
                                                                            }
                                                                            size="small"
                                                                            variant="outlined"
                                                                        />
                                                                    )
                                                                )}
                                                            {disorder.words
                                                                .length > 3 && (
                                                                <Chip
                                                                    label={`+${
                                                                        disorder
                                                                            .words
                                                                            .length -
                                                                        3
                                                                    } more`}
                                                                    size="small"
                                                                    variant="outlined"
                                                                    color="secondary"
                                                                />
                                                            )}
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    )
                )}
            </Box>
        );
    };

    const renderStandardTable = () => {
        return (
            <TableContainer component={Paper} variant="outlined">
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: "grey.50" }}>
                            <TableCell sx={{ fontWeight: 600 }}>
                                Disorder Type
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                                Phoneme
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="center">
                                Occurrences
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }} align="center">
                                Affected Words
                            </TableCell>
                            <TableCell sx={{ fontWeight: 600 }}>
                                Positions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {summaryData.disorders.map((disorder, index) => (
                            <TableRow key={index} hover>
                                <TableCell>
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {disorder.disorderName}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Chip
                                        label={disorder.phoneme}
                                        size="small"
                                        color="primary"
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Typography
                                        variant="body2"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {disorder.occurrences}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5
                                        }}
                                    >
                                        {disorder.words
                                            .slice(0, 3)
                                            .map((word, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={word}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            ))}
                                        {disorder.words.length > 3 && (
                                            <Chip
                                                label={`+${
                                                    disorder.words.length - 3
                                                } more`}
                                                size="small"
                                                variant="outlined"
                                                color="secondary"
                                            />
                                        )}
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: 0.5
                                        }}
                                    >
                                        {disorder.positions.map(
                                            (position, idx) => (
                                                <Chip
                                                    key={idx}
                                                    label={position}
                                                    size="small"
                                                    color="secondary"
                                                    variant="filled"
                                                />
                                            )
                                        )}
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xl"
            fullWidth
            elevation={8}
        >
            <DialogTitle>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <AssessmentIcon color="primary" />
                    <Box>
                        <Typography
                            variant="h5"
                            component="h2"
                            sx={{ fontWeight: 600 }}
                        >
                            Analysis Summary
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Comprehensive overview of identified speech patterns
                            and disorders
                        </Typography>
                    </Box>
                </Box>
            </DialogTitle>

            <DialogContent>
                {/* Summary Stats */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Paper
                            sx={{
                                p: 3,
                                textAlign: "center",
                                bgcolor: "primary.50"
                            }}
                        >
                            <Typography
                                variant="h3"
                                color="primary.main"
                                sx={{ fontWeight: 600 }}
                            >
                                {summaryData.disorders.length}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Disorder Patterns
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Paper
                            sx={{
                                p: 3,
                                textAlign: "center",
                                bgcolor: "warning.50"
                            }}
                        >
                            <Typography
                                variant="h3"
                                color="warning.main"
                                sx={{ fontWeight: 600 }}
                            >
                                {summaryData.totalDisorders}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Total Occurrences
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Paper
                            sx={{
                                p: 3,
                                textAlign: "center",
                                bgcolor: "success.50"
                            }}
                        >
                            <Typography
                                variant="h3"
                                color="success.main"
                                sx={{ fontWeight: 600 }}
                            >
                                {summaryData.totalPhonemes}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Phonemes Analyzed
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 3 }}>
                        <Paper
                            sx={{
                                p: 3,
                                textAlign: "center",
                                bgcolor: "info.50"
                            }}
                        >
                            <Typography
                                variant="h3"
                                color="info.main"
                                sx={{ fontWeight: 600 }}
                            >
                                {summaryData.disorderTypes.length}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                Disorder Types
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>

                {/* Tabs for different views */}
                <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                    <Tabs
                        value={tabValue}
                        onChange={(e, newValue) => setTabValue(newValue)}
                    >
                        <Tab
                            label="Detailed Analysis"
                            icon={<ViewListIcon />}
                        />
                        <Tab label="Overview" icon={<BarChartIcon />} />
                    </Tabs>
                </Box>

                {tabValue === 0 && (
                    <>
                        {/* Controls */}
                        <Box
                            sx={{
                                mb: 3,
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                flexWrap: "wrap"
                            }}
                        >
                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Group By</InputLabel>
                                <Select
                                    value={groupBy}
                                    onChange={(e) => setGroupBy(e.target.value)}
                                    label="Group By"
                                >
                                    <MenuItem value="disorder">
                                        Disorder Type
                                    </MenuItem>
                                    <MenuItem value="phoneme">Phoneme</MenuItem>
                                </Select>
                            </FormControl>

                            <FormControl size="small" sx={{ minWidth: 120 }}>
                                <InputLabel>Sort By</InputLabel>
                                <Select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    label="Sort By"
                                >
                                    <MenuItem value="occurrences">
                                        Occurrences
                                    </MenuItem>
                                    <MenuItem value="disorder">
                                        Disorder Type
                                    </MenuItem>
                                    <MenuItem value="phoneme">Phoneme</MenuItem>
                                </Select>
                            </FormControl>

                            <ToggleButtonGroup
                                value={viewMode}
                                exclusive
                                onChange={(e, newMode) =>
                                    newMode && setViewMode(newMode)
                                }
                                size="small"
                            >
                                <ToggleButton value="table">
                                    <ViewListIcon />
                                </ToggleButton>
                                <ToggleButton value="grouped">
                                    <GroupIcon />
                                </ToggleButton>
                            </ToggleButtonGroup>
                        </Box>

                        {summaryData.disorders.length > 0 ? (
                            viewMode === "grouped" ? (
                                renderGroupedView()
                            ) : (
                                renderStandardTable()
                            )
                        ) : (
                            <Paper
                                sx={{
                                    p: 4,
                                    textAlign: "center",
                                    bgcolor: "success.50"
                                }}
                            >
                                <CheckCircleIcon
                                    sx={{
                                        fontSize: 48,
                                        color: "success.main",
                                        mb: 2
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    color="success.dark"
                                    sx={{ mb: 1 }}
                                >
                                    No Disorders Identified
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    All analyzed phonemes appear to be produced
                                    correctly.
                                </Typography>
                            </Paper>
                        )}
                    </>
                )}

                {tabValue === 1 && (
                    <>
                        {summaryData.disorders.length > 0 && (
                            <Box>
                                <Typography variant="h6" sx={{ mb: 2 }}>
                                    Disorder Type Distribution
                                </Typography>
                                <Grid container spacing={2}>
                                    {summaryData.disorderTypes.map(
                                        (disorderType) => {
                                            const count =
                                                summaryData.disorders.filter(
                                                    (d) =>
                                                        d.disorderName ===
                                                        disorderType
                                                ).length;
                                            const totalOccurrences =
                                                summaryData.disorderCounts[
                                                    disorderType
                                                ] || 0;

                                            return (
                                                <Grid
                                                    item
                                                    xs={12}
                                                    sm={6}
                                                    md={4}
                                                    key={disorderType}
                                                >
                                                    <Card>
                                                        <CardContent>
                                                            <Typography
                                                                variant="h6"
                                                                gutterBottom
                                                            >
                                                                {disorderType}
                                                            </Typography>
                                                            <Typography
                                                                variant="h4"
                                                                color="primary.main"
                                                            >
                                                                {
                                                                    totalOccurrences
                                                                }
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                            >
                                                                {count} phoneme
                                                                patterns
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            );
                                        }
                                    )}
                                </Grid>
                            </Box>
                        )}
                    </>
                )}
            </DialogContent>

            <DialogActions sx={{ p: 3, gap: 2 }}>
                <Button
                    onClick={onClose}
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                >
                    Continue Analysis
                </Button>
                <Button
                    onClick={handleProceedToReport}
                    variant="contained"
                    startIcon={<CheckCircleIcon />}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        px: 3
                    }}
                >
                    Complete Session
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AnalysisSummaryModal;
