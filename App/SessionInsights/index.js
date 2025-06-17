import React, { useState, useEffect } from "react";
import {
    Box,
    Grid,
    Typography,
    Paper,
    Card,
    CardContent,
    Chip,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Divider,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Collapse,
    CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import SettingsIcon from "@mui/icons-material/Settings";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SessionComparison from "./SessionComparison";
import PhonemeSegment from "./PhonemeSegment";
import actions from "../Store/actions";
import {
    useTargetWordInstances,
    getUniqueTargetWordIds
} from "../common/components/InstancePhonemes";

const SessionInsights = () => {
    const [selectedJourney, setSelectedJourney] = useState(null);
    const [selectedSessionA, setSelectedSessionA] = useState(null);
    const [selectedSessionB, setSelectedSessionB] = useState(null);
    const [comparisonData, setComparisonData] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [statsExpanded, setStatsExpanded] = useState(false);
    const [legendExpanded, setLegendExpanded] = useState(false);
    const [loadingAnalysis, setLoadingAnalysis] = useState(false);

    // New state for managing session results data
    const [sessionAResults, setSessionAResults] = useState(null);
    const [sessionBResults, setSessionBResults] = useState(null);
    const [loadingSessionData, setLoadingSessionData] = useState({
        sessionA: false,
        sessionB: false
    });

    const dispatch = useDispatch();
    const {
        sessions,
        journeys,
        analysisPhonemes,
        wordsList,
        wordIpas,
        typesList
    } = useSelector((state) => state);

    // Use the enhanced hook for processing session results data
    const sessionAAnalysis = useTargetWordInstances(
        sessionAResults?.data || []
    );
    const sessionBAnalysis = useTargetWordInstances(
        sessionBResults?.data || []
    );

    // Transform API sessions data to match expected format
    const transformSession = (session) => {
        // Handle both camelCase (transformed API) and snake_case (raw API) properties
        const sessionDate = session.sessionDate || session.session_date;
        const mediaFile = session.mediaFile || session.media_file;
        const sessionName =
            mediaFile?.friendlyName ||
            mediaFile?.friendly_name ||
            `Session ${session.id}`;

        const parsedDate = sessionDate ? new Date(sessionDate) : null;

        return {
            ...session,
            name: sessionName,
            created: sessionDate, // Keep the original string format
            wordCount: null, // Could be derived from analysis results later
            displayName: `${sessionName} - ${
                parsedDate ? parsedDate.toLocaleDateString() : "Unknown date"
            }`,
            mediaLength: mediaFile?.length,
            mediaSize: mediaFile?.size
        };
    };

    // Use real sessions data from Redux store
    const availableSessions =
        sessions.data && Array.isArray(sessions.data)
            ? sessions.data.map(transformSession)
            : [];

    // Filter sessions by selected journey - handle type conversion
    const journeySessions = selectedJourney
        ? availableSessions.filter((session) => {
              const sessionJourneyId = session.journey || session.journeyId;
              const selectedJourneyId = selectedJourney.id;

              // Handle both string and number comparisons
              return (
                  sessionJourneyId == selectedJourneyId || // Loose equality for type conversion
                  sessionJourneyId === selectedJourneyId ||
                  sessionJourneyId === selectedJourneyId.toString() ||
                  sessionJourneyId.toString() === selectedJourneyId.toString()
              );
          })
        : [];

    // Use real journeys data from Redux store
    const availableJourneys =
        journeys.data && journeys.data.length > 0 ? journeys.data : [];

    useEffect(() => {
        // Fetch journeys on component mount
        dispatch(actions.journeys.create.getJourneys());

        // Fetch necessary data for word and phoneme display
        dispatch(actions.wordsList.create.getWordsRequest());
    }, [dispatch]);

    useEffect(() => {
        // Fetch sessions when a journey is selected
        if (selectedJourney) {
            dispatch(actions.sessions.create.getSessions(selectedJourney.id));
        }
    }, [dispatch, selectedJourney]);

    // Update comparison data when analysis results change
    useEffect(() => {
        if (
            selectedSessionA &&
            selectedSessionB &&
            sessionAResults &&
            sessionBResults &&
            sessionAAnalysis.targetWordIds.length > 0 &&
            sessionBAnalysis.targetWordIds.length > 0 &&
            wordIpas.data?.length &&
            analysisPhonemes.data?.length
        ) {
            const comparisonData = transformHookDataToComparison(
                selectedSessionA,
                selectedSessionB,
                sessionAAnalysis,
                sessionBAnalysis
            );

            setComparisonData(comparisonData);
        }
    }, [
        selectedSessionA,
        selectedSessionB,
        sessionAResults,
        sessionBResults,
        sessionAAnalysis.targetWordIds,
        sessionBAnalysis.targetWordIds,
        wordIpas.data?.length,
        analysisPhonemes.data?.length
    ]);

    const handleJourneyChange = (event, newValue) => {
        setSelectedJourney(newValue);
        // Reset sessions and comparison data when journey changes
        setSelectedSessionA(null);
        setSelectedSessionB(null);
        setComparisonData(null);
    };

    const handleSessionAChange = (sessionId) => {
        setSelectedSessionA(sessionId);
    };

    const handleSessionBChange = (sessionId) => {
        setSelectedSessionB(sessionId);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    // Function to fetch session results data (moved from Results/index.js)
    const fetchSessionResults = async (sessionId) => {
        try {
            const { resultsData } = await dispatch(
                actions.results.create.getResults(sessionId)
            );
            return { data: resultsData };
        } catch (error) {
            console.error(
                `Error fetching results for session ${sessionId}:`,
                error
            );
            return null;
        }
    };

    const generateComparisonWithSessions = async (sessionAId, sessionBId) => {
        if (sessionAId && sessionBId) {
            setLoadingAnalysis(true);

            try {
                // Fetch session results data for both sessions
                setLoadingSessionData({ sessionA: true, sessionB: true });

                const [sessionAResultsData, sessionBResultsData] =
                    await Promise.all([
                        fetchSessionResults(sessionAId),
                        fetchSessionResults(sessionBId)
                    ]);

                setSessionAResults(sessionAResultsData);
                setSessionBResults(sessionBResultsData);
                setLoadingSessionData({ sessionA: false, sessionB: false });

                if (sessionAResultsData && sessionBResultsData) {
                    // Extract unique target word IDs from both sessions
                    const uniqueWordIdsA = getUniqueTargetWordIds(
                        sessionAResultsData.data
                    );
                    const uniqueWordIdsB = getUniqueTargetWordIds(
                        sessionBResultsData.data
                    );
                    const allUniqueWordIds = {
                        ...uniqueWordIdsA,
                        ...uniqueWordIdsB
                    };

                    // Fetch required data for phoneme analysis (matching Analysis component logic)
                    if (Object.keys(allUniqueWordIds).length > 0) {
                        // Fetch wordIpas data for the target words
                        try {
                            await dispatch(
                                actions.wordIpas.create.getWordIpas(
                                    Object.keys(allUniqueWordIds).join(",")
                                )
                            );
                        } catch (apiError) {
                            console.error(
                                "❌ WordIpas API call failed:",
                                apiError
                            );
                        }

                        // Fetch analysis phonemes (word errors) for both sessions
                        await dispatch(
                            actions.analysisPhonemes.create.getWordErrors(
                                sessionAId
                            )
                        );
                        await dispatch(
                            actions.analysisPhonemes.create.getWordErrors(
                                sessionBId
                            )
                        );
                    }

                    // The comparison data will be generated automatically by the useEffect
                    // when the hook data is ready
                } else {
                    throw new Error("Failed to fetch session results data");
                }
            } catch (error) {
                console.error("Error generating comparison:", error);
                // Clear comparison data on error
                setComparisonData(null);
            } finally {
                setLoadingAnalysis(false);
            }
        }
    };

    // Build instances and phonemes list directly from targetWordInstances
    const buildInstancesAndPhonemesList = (
        targetWordInstances,
        sessionId,
        sessionName
    ) => {
        const instancesList = [];

        // Iterate through each target word
        Object.entries(targetWordInstances).forEach(
            ([targetWordId, instances]) => {
                instances.forEach((instance, instanceIndex) => {
                    const instanceData = {
                        // Instance metadata
                        instanceId: instance.id,
                        targetWordId: targetWordId,
                        wordName: getWordNameFromId(targetWordId),
                        sessionId: sessionId,
                        sessionName: sessionName,

                        // Instance performance data
                        score: instance.score,
                        duration: instance.duration,

                        // Phonemes with full error information
                        phonemes: instance.phonemes.map(
                            (phoneme, phonemeIndex) => {
                                return {
                                    // Phoneme data
                                    phonemeId: phoneme.id,
                                    targetWordId: targetWordId,
                                    ipaSymbol: phoneme.ipaSymbol,
                                    position: phoneme.positionInWord,

                                    // Status and error information
                                    hasError: phoneme.hasError,
                                    errorType: phoneme.error
                                        ? phoneme.error.disorderInfo?.name
                                        : null,
                                    errorDescription: phoneme.error
                                        ? phoneme.error.disorderInfo
                                              ?.description
                                        : null,

                                    // Full error object for detailed analysis
                                    error: phoneme.error
                                };
                            }
                        )
                    };

                    instancesList.push(instanceData);
                });
            }
        );

        return instancesList;
    };

    const getWordNameFromId = (targetWordId) => {
        if (wordsList.data && wordsList.data.length > 0) {
            const wordEntry = wordsList.data.find(
                (word) => word.id == targetWordId
            );
            return wordEntry ? wordEntry.word : `Word ${targetWordId}`;
        }
        return `Word ${targetWordId}`;
    };

    // Transform hook data into comparison format using rich targetWordInstances with phonemes and errors
    const transformHookDataToComparison = (
        sessionAId,
        sessionBId,
        sessionAAnalysis,
        sessionBAnalysis
    ) => {
        // Build comprehensive instances and phonemes lists for both sessions
        const sessionAInstancesList = buildInstancesAndPhonemesList(
            sessionAAnalysis.targetWordInstances,
            sessionAId,
            getSessionName(sessionAId)
        );

        const sessionBInstancesList = buildInstancesAndPhonemesList(
            sessionBAnalysis.targetWordInstances,
            sessionBId,
            getSessionName(sessionBId)
        );

        // Get all unique target words from both sessions
        const allTargetWordIds = new Set([
            ...sessionAAnalysis.targetWordIds,
            ...sessionBAnalysis.targetWordIds
        ]);

        const words = [];

        for (const targetWordId of allTargetWordIds) {
            const sessionAInstances =
                sessionAAnalysis.targetWordInstances[targetWordId] || [];
            const sessionBInstances =
                sessionBAnalysis.targetWordInstances[targetWordId] || [];

            // Get word name from the first instance or fallback to ID lookup
            const wordName = getWordNameFromInstances(
                sessionAInstances,
                sessionBInstances,
                targetWordId
            );

            if (sessionAInstances.length > 0 || sessionBInstances.length > 0) {
                words.push({
                    word: wordName,
                    targetWordId: targetWordId
                });
            }
        }

        return {
            sessionA: {
                id: sessionAId,
                name: getSessionName(sessionAId),
                instancesList: sessionAInstancesList,
                targetWordInstances: sessionAAnalysis.targetWordInstances,
                words: words.map((word) => ({
                    word: word.word,
                    targetWordId: word.targetWordId,
                    instances: (
                        sessionAAnalysis.targetWordInstances[
                            word.targetWordId
                        ] || []
                    ).map((instance, instanceIndex) => {
                        const transformedInstance = {
                            ...instance,
                            phonemes: Array.isArray(instance.phonemes)
                                ? instance.phonemes.map(
                                      (phoneme, phonemeIndex) => {
                                          const transformedPhoneme = {
                                              segment:
                                                  phoneme.ipaSymbol ||
                                                  phoneme.ipa ||
                                                  "?",
                                              status: phoneme.hasError
                                                  ? getPhonemeStatusFromError(
                                                        phoneme.error
                                                    )
                                                  : "correct",
                                              ...phoneme
                                          };

                                          return transformedPhoneme;
                                      }
                                  )
                                : []
                        };

                        return transformedInstance;
                    })
                }))
            },
            sessionB: {
                id: sessionBId,
                name: getSessionName(sessionBId),
                instancesList: sessionBInstancesList,
                targetWordInstances: sessionBAnalysis.targetWordInstances,
                words: words.map((word) => ({
                    word: word.word,
                    targetWordId: word.targetWordId,
                    instances: (
                        sessionBAnalysis.targetWordInstances[
                            word.targetWordId
                        ] || []
                    ).map((instance) => ({
                        ...instance,
                        phonemes: Array.isArray(instance.phonemes)
                            ? instance.phonemes.map((phoneme) => ({
                                  segment:
                                      phoneme.ipaSymbol || phoneme.ipa || "?",
                                  status: phoneme.hasError
                                      ? getPhonemeStatusFromError(phoneme.error)
                                      : "correct",
                                  ...phoneme
                              }))
                            : []
                    }))
                }))
            }
        };
    };

    // Helper function to get word name from instances or fallback to ID lookup
    const getWordNameFromInstances = (
        sessionAInstances,
        sessionBInstances,
        targetWordId
    ) => {
        // Try to get word name from the first available instance
        const firstInstance = sessionAInstances[0] || sessionBInstances[0];
        if (firstInstance && firstInstance.wordName) {
            return firstInstance.wordName;
        }

        // Fallback to wordsList lookup
        if (wordsList.data && wordsList.data.length > 0) {
            const wordEntry = wordsList.data.find(
                (word) => word.id == targetWordId
            );
            if (wordEntry) {
                return wordEntry.word || `Word ${targetWordId}`;
            }
        }
        return `Word ${targetWordId}`;
    };

    const getPhonemeStatusFromError = (error) => {
        if (!error || !error.disorderSubcategory) return "correct";

        // Map disorder subcategory IDs to status strings
        switch (error.disorderSubcategory) {
            case 1:
                return "disorder1";
            case 2:
                return "disorder2";
            case 3:
                return "disorder3";
            case 4:
                return "disorder4";
            default:
                return "disorder1";
        }
    };

    const generateComparison = async () => {
        await generateComparisonWithSessions(
            selectedSessionA,
            selectedSessionB
        );
    };

    const getSessionName = (sessionId) => {
        const session = journeySessions.find((s) => s.id === sessionId);
        return session ? session.name : `Session ${sessionId}`;
    };

    // Calculate progress for the combined section
    const calculateProgress = () => {
        if (
            !comparisonData ||
            !comparisonData.sessionA ||
            !comparisonData.sessionB
        )
            return null;
        if (!comparisonData.sessionA.words || !comparisonData.sessionB.words)
            return null;

        let totalSegments = 0;
        let improvedSegments = 0;
        let maintainedCorrect = 0;
        let regressed = 0;

        comparisonData.sessionA.words.forEach((wordA, wordIndex) => {
            const wordB = comparisonData.sessionB.words[wordIndex];
            if (!wordB || !wordA) return;

            const minInstances = Math.min(
                wordA.instances?.length || 0,
                wordB.instances?.length || 0
            );

            for (
                let instanceIndex = 0;
                instanceIndex < minInstances;
                instanceIndex++
            ) {
                const instanceA = wordA.instances?.[instanceIndex];
                const instanceB = wordB.instances?.[instanceIndex];

                if (
                    !instanceA ||
                    !instanceB ||
                    !instanceA.phonemes ||
                    !instanceB.phonemes
                )
                    continue;

                instanceA.phonemes.forEach((phonemeA, phonemeIndex) => {
                    const phonemeB = instanceB.phonemes[phonemeIndex];
                    if (!phonemeB) return;

                    totalSegments++;

                    if (
                        phonemeA.status !== "correct" &&
                        phonemeB.status === "correct"
                    ) {
                        improvedSegments++;
                    } else if (
                        phonemeA.status === "correct" &&
                        phonemeB.status === "correct"
                    ) {
                        maintainedCorrect++;
                    } else if (
                        phonemeA.status === "correct" &&
                        phonemeB.status !== "correct"
                    ) {
                        regressed++;
                    }
                });
            }
        });

        return {
            totalSegments,
            improvedSegments,
            maintainedCorrect,
            regressed,
            improvementRate:
                totalSegments > 0
                    ? ((improvedSegments / totalSegments) * 100).toFixed(1)
                    : 0
        };
    };

    // Generate legend items dynamically based on disorder data
    const generateLegendItems = () => {
        const items = [{ segment: "ex", status: "correct", label: "Correct" }];

        // Add disorder items if data is available
        if (typesList?.disorderSubcategories?.data) {
            typesList.disorderSubcategories.data.forEach((disorder, index) => {
                items.push({
                    segment: "ex",
                    status: `disorder${index + 1}`,
                    label: disorder.name || `Disorder ${index + 1}`
                });
            });
        }

        return items;
    };

    const legendItems = generateLegendItems();

    const hasSelectedSessions = selectedSessionA && selectedSessionB;
    const progress = calculateProgress();

    return (
        <Box sx={{ p: 3 }}>
            {/* Combined Session and Summary Section */}
            {hasSelectedSessions && comparisonData && (
                <Paper
                    sx={{
                        p: 2,
                        mb: 3,
                        bgcolor: "#f8f9fa",
                        border: "1px solid #e8e8e8"
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 1
                        }}
                    >
                        {/* Session Comparison */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2
                            }}
                        >
                            <Typography variant="body1" color="text.secondary">
                                Comparing:
                            </Typography>
                            <Chip
                                label={getSessionName(selectedSessionA)}
                                variant="outlined"
                                sx={{
                                    bgcolor: "white",
                                    color: "text.primary",
                                    borderColor: "grey.300"
                                }}
                            />
                            <ArrowForwardIcon sx={{ color: "grey.500" }} />
                            <Chip
                                label={getSessionName(selectedSessionB)}
                                variant="outlined"
                                sx={{
                                    bgcolor: "white",
                                    color: "text.primary",
                                    borderColor: "grey.300"
                                }}
                            />

                            {/* Compact legend trigger */}
                            <IconButton
                                size="small"
                                onClick={() =>
                                    setLegendExpanded(!legendExpanded)
                                }
                                sx={{
                                    ml: 1,
                                    p: 0.5,
                                    color: "text.secondary",
                                    "&:hover": {
                                        bgcolor: "grey.100"
                                    }
                                }}
                                title="Show/hide phoneme status legend"
                            >
                                <HelpOutlineIcon sx={{ fontSize: 16 }} />
                            </IconButton>
                        </Box>

                        {/* Progress Summary and Change Sessions Button */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2
                            }}
                        >
                            <Chip
                                size="small"
                                label={`+${progress?.improvedSegments || 0}`}
                                color="success"
                                variant="outlined"
                                sx={{ fontSize: "0.75rem", height: 24 }}
                            />
                            <Chip
                                size="small"
                                label={`-${progress?.regressed || 0}`}
                                color="error"
                                variant="outlined"
                                sx={{ fontSize: "0.75rem", height: 24 }}
                            />
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                {progress?.improvementRate}% improvement
                            </Typography>
                            <Button
                                variant="outlined"
                                size="small"
                                onClick={() => setModalOpen(true)}
                                startIcon={<SettingsIcon />}
                                sx={{
                                    fontSize: "0.75rem",
                                    py: 0.5,
                                    px: 1,
                                    height: 28
                                }}
                            >
                                Change Sessions
                            </Button>
                        </Box>
                    </Box>

                    {/* Phoneme Status Legend (Collapsible) */}
                    <Collapse in={legendExpanded}>
                        <Box
                            sx={{
                                mt: 2,
                                p: 2,
                                bgcolor: "white",
                                borderRadius: 1,
                                border: "1px solid #e0e0e0"
                            }}
                        >
                            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                                Phoneme Status Legend:
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    flexWrap: "wrap"
                                }}
                            >
                                {legendItems.map((item, index) => (
                                    <Box
                                        key={index}
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5
                                        }}
                                    >
                                        <PhonemeSegment
                                            segment={item.segment}
                                            status={item.status}
                                        />
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {item.label}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    </Collapse>
                </Paper>
            )}

            {/* Session Configuration Modal */}
            <Dialog
                open={modalOpen}
                onClose={handleModalClose}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <SettingsIcon />
                        Configure Session Comparison
                    </Box>
                </DialogTitle>
                <DialogContent sx={{ minHeight: 400 }}>
                    <Box sx={{ py: 2 }}>
                        {/* Journey Selection */}
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                variant="subtitle1"
                                sx={{ mb: 2, fontWeight: 600 }}
                            >
                                1. Select Journey
                            </Typography>
                            <FormControl fullWidth size="large">
                                <InputLabel>Choose a journey</InputLabel>
                                <Select
                                    value={selectedJourney?.id || ""}
                                    onChange={(e) => {
                                        const journey = availableJourneys.find(
                                            (j) => j.id === e.target.value
                                        );
                                        handleJourneyChange(null, journey);
                                    }}
                                    label="Choose a journey"
                                    sx={{
                                        minHeight: 60,
                                        "& .MuiSelect-select": {
                                            py: 2
                                        }
                                    }}
                                >
                                    {availableJourneys.map((journey) => (
                                        <MenuItem
                                            key={journey.id}
                                            value={journey.id}
                                            sx={{ py: 2 }}
                                        >
                                            <Box sx={{ width: "100%" }}>
                                                <Typography
                                                    variant="body1"
                                                    sx={{ fontWeight: 500 }}
                                                >
                                                    {journey.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{ mt: 0.5 }}
                                                >
                                                    Client:{" "}
                                                    {journey.client?.name ||
                                                        "Unknown"}
                                                </Typography>
                                            </Box>
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>

                        {/* Session Selection */}
                        {selectedJourney && (
                            <Box sx={{ mb: 3 }}>
                                <Typography
                                    variant="subtitle1"
                                    sx={{ mb: 2, fontWeight: 600 }}
                                >
                                    2. Select Sessions to Compare
                                </Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                            sx={{
                                                p: 3,
                                                border: "2px solid",
                                                borderColor: selectedSessionA
                                                    ? "primary.main"
                                                    : "grey.300",
                                                borderRadius: 2,
                                                bgcolor: selectedSessionA
                                                    ? "primary.50"
                                                    : "grey.50",
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    mb: 2,
                                                    color: "primary.main"
                                                }}
                                            >
                                                📅 Earlier Session (A)
                                            </Typography>
                                            <FormControl fullWidth>
                                                <InputLabel>
                                                    Select earlier session
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        selectedSessionA || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleSessionAChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Select earlier session"
                                                    sx={{
                                                        bgcolor: "white",
                                                        minHeight: 56,
                                                        "& .MuiSelect-select": {
                                                            py: 2
                                                        }
                                                    }}
                                                >
                                                    {journeySessions.map(
                                                        (session) => (
                                                            <MenuItem
                                                                key={session.id}
                                                                value={
                                                                    session.id
                                                                }
                                                                sx={{ py: 2 }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        width: "100%"
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{
                                                                            fontWeight: 500
                                                                        }}
                                                                    >
                                                                        {session.name ||
                                                                            `Session ${session.id}`}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        color="text.secondary"
                                                                        sx={{
                                                                            mt: 0.5
                                                                        }}
                                                                    >
                                                                        {session.created
                                                                            ? new Date(
                                                                                  session.created
                                                                              ).toLocaleDateString(
                                                                                  "en-US",
                                                                                  {
                                                                                      year: "numeric",
                                                                                      month: "long",
                                                                                      day: "numeric"
                                                                                  }
                                                                              )
                                                                            : "Date unknown"}
                                                                    </Typography>
                                                                </Box>
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                            sx={{
                                                p: 3,
                                                border: "2px solid",
                                                borderColor: selectedSessionB
                                                    ? "secondary.main"
                                                    : "grey.300",
                                                borderRadius: 2,
                                                bgcolor: selectedSessionB
                                                    ? "secondary.50"
                                                    : "grey.50",
                                                transition: "all 0.2s"
                                            }}
                                        >
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    mb: 2,
                                                    color: "secondary.main"
                                                }}
                                            >
                                                📈 Later Session (B)
                                            </Typography>
                                            <FormControl fullWidth>
                                                <InputLabel>
                                                    Select later session
                                                </InputLabel>
                                                <Select
                                                    value={
                                                        selectedSessionB || ""
                                                    }
                                                    onChange={(e) =>
                                                        handleSessionBChange(
                                                            e.target.value
                                                        )
                                                    }
                                                    label="Select later session"
                                                    sx={{
                                                        bgcolor: "white",
                                                        minHeight: 56,
                                                        "& .MuiSelect-select": {
                                                            py: 2
                                                        }
                                                    }}
                                                >
                                                    {journeySessions.map(
                                                        (session) => (
                                                            <MenuItem
                                                                key={session.id}
                                                                value={
                                                                    session.id
                                                                }
                                                                sx={{ py: 2 }}
                                                            >
                                                                <Box
                                                                    sx={{
                                                                        width: "100%"
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{
                                                                            fontWeight: 500
                                                                        }}
                                                                    >
                                                                        {session.name ||
                                                                            `Session ${session.id}`}
                                                                    </Typography>
                                                                    <Typography
                                                                        variant="body2"
                                                                        color="text.secondary"
                                                                        sx={{
                                                                            mt: 0.5
                                                                        }}
                                                                    >
                                                                        {session.created
                                                                            ? new Date(
                                                                                  session.created
                                                                              ).toLocaleDateString(
                                                                                  "en-US",
                                                                                  {
                                                                                      year: "numeric",
                                                                                      month: "long",
                                                                                      day: "numeric"
                                                                                  }
                                                                              )
                                                                            : "Date unknown"}
                                                                    </Typography>
                                                                </Box>
                                                            </MenuItem>
                                                        )
                                                    )}
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Box>

                    {/* Status Messages */}
                    {selectedSessionA && selectedSessionB && (
                        <Box
                            sx={{
                                mt: 3,
                                p: 2,
                                bgcolor: "success.light",
                                borderRadius: 1
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="success.dark"
                                align="center"
                            >
                                ✓ Both sessions selected! Click "Generate
                                Comparison" to analyze the progress.
                            </Typography>
                        </Box>
                    )}

                    {selectedJourney && journeySessions.length === 0 && (
                        <Box
                            sx={{
                                mt: 3,
                                p: 2,
                                bgcolor: "warning.light",
                                borderRadius: 1
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="warning.dark"
                                align="center"
                            >
                                No sessions found for this journey. Please
                                create sessions first.
                            </Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleModalClose}
                        disabled={loadingAnalysis}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={async () => {
                            await generateComparison();
                            handleModalClose();
                        }}
                        variant="contained"
                        disabled={
                            !selectedSessionA ||
                            !selectedSessionB ||
                            loadingAnalysis
                        }
                        startIcon={
                            loadingAnalysis ? (
                                <CircularProgress size={20} />
                            ) : null
                        }
                    >
                        {loadingAnalysis
                            ? "Generating..."
                            : "Generate Comparison"}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Main Content */}
            {!hasSelectedSessions && (
                <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="h6" gutterBottom>
                        Session Insights
                    </Typography>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        Compare phoneme-level performance between two sessions
                        to track progress and identify improvement areas.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => setModalOpen(true)}
                        startIcon={<SettingsIcon />}
                    >
                        Select Sessions to Compare
                    </Button>
                </Paper>
            )}

            {hasSelectedSessions && loadingAnalysis && (
                <Paper sx={{ p: 4, textAlign: "center" }}>
                    <CircularProgress sx={{ mb: 2 }} />
                    <Typography variant="body1">
                        Analyzing session data...
                    </Typography>
                </Paper>
            )}

            {hasSelectedSessions && !loadingAnalysis && comparisonData && (
                <SessionComparison data={comparisonData} />
            )}

            {hasSelectedSessions && !loadingAnalysis && !comparisonData && (
                <Paper sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="body1" color="text.secondary">
                        Unable to generate comparison data. Please ensure both
                        sessions have analysis results.
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() => setModalOpen(true)}
                        sx={{ mt: 2 }}
                    >
                        Select Different Sessions
                    </Button>
                </Paper>
            )}
        </Box>
    );
};

export default SessionInsights;
