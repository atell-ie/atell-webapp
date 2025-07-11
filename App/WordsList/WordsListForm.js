import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import actions from "../Store/actions";
import {
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Paper,
    Chip,
    Divider,
    Badge,
    Tooltip,
    Button
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import TextFieldsIcon from "@mui/icons-material/TextFields";
import InfoIcon from "@mui/icons-material/Info";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Word from "./Word";
import styles from "./styles";
import Incrementor from "./Incrementor";

const WordsListForm = ({ wordListId, hdlModalClose }) => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [availableWords, setAvailableWords] = useState([]);
    const [filter, setFilter] = useState("");
    const [viewMode, setViewMode] = useState("phoneme");
    const [phonemeMap, setPhonemeMap] = useState({});
    const [loading, setLoading] = useState(false);
    const [selectedPhoneme, setSelectedPhoneme] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [validationError, setValidationError] = useState(null);

    const { targetWordsList, wordsList } = useSelector((state) => state);

    useEffect(() => {
        let isMounted = true;

        // Set available words from API data
        if (isMounted) {
            setAvailableWords(wordsList.data);
        }

        // For new list (wordListId === 0), just use all words
        if (wordListId === 0) {
            return () => {
                isMounted = false;
            };
        }

        // For editing existing list
        const index = targetWordsList.byId[wordListId];
        const listData = targetWordsList.data[index];

        if (isMounted) {
            dispatch(actions.targetWordsList.create.itemSet({ ...listData }));

            // Create a set of selected word IDs for faster lookup
            const selectedWordIds = new Set(
                listData.words.map((word) => word.id)
            );

            // Filter available words to exclude those already in the list
            const availWords = wordsList.data.filter(
                (word) => !selectedWordIds.has(word.id)
            );

            setAvailableWords(availWords);
        }

        return () => {
            isMounted = false;
        };
    }, [wordListId]);

    const handleTransferWord = (wordObj) => {
        const found = targetWordsList.item.words.find(
            (entry) => entry.word === wordObj.word
        );

        // remove from selected and add to available
        if (Boolean(found)) {
            const newList = targetWordsList.item.words.filter(
                (entry) => entry.word !== wordObj.word
            );
            dispatch(
                actions.targetWordsList.create.itemSet({ words: newList })
            );
            setAvailableWords([...availableWords, wordObj]);
            // remove from available and add to selected
        } else {
            setAvailableWords(
                availableWords.filter((entry) => entry.word !== wordObj.word)
            );

            dispatch(
                actions.targetWordsList.create.itemSet({
                    words: [
                        ...targetWordsList.item.words,
                        {
                            ...wordObj,
                            selectedPosition: selectedPosition,
                            selectedPhoneme: selectedPhoneme
                        }
                    ]
                })
            );
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    // Memoize filtered words to prevent re-computation on every render
    const filteredAvailableWords = useMemo(() => {
        return availableWords.filter((entry) =>
            entry.word.toLowerCase().includes(filter.toLowerCase())
        );
    }, [availableWords, filter]);

    const handleViewModeChange = useCallback((event, newViewMode) => {
        if (newViewMode !== null) {
            setViewMode(newViewMode);
        }
    }, []);

    const getIpaSymbol = useCallback(
        (ipaCode) => {
            return phonemeMap[ipaCode] || ipaCode;
        },
        [phonemeMap]
    );

    // Memoize expensive grouped content computation
    const getGroupedContent = useMemo(() => {
        if (viewMode === "word") {
            const groups = filteredAvailableWords.reduce((groups, entry) => {
                const firstLetter = entry.word.charAt(0).toUpperCase();
                if (!groups[firstLetter]) {
                    groups[firstLetter] = [];
                }
                groups[firstLetter].push({
                    ...entry,
                    displayIpa: entry.ipa
                        .split(" ")
                        .map((code) => getIpaSymbol(code))
                        .join(" ")
                });
                return groups;
            }, {});

            // Sort each group alphabetically
            Object.keys(groups).forEach((key) => {
                groups[key].sort((a, b) => a.word.localeCompare(b.word));
            });

            return Object.keys(groups)
                .sort()
                .reduce((obj, key) => {
                    obj[key] = groups[key];
                    return obj;
                }, {});
        } else {
            // Initialize phoneme groups using the phoneme map
            const phonemeGroups = {};
            Object.values(phonemeMap).forEach((phoneme) => {
                if (!phonemeGroups[phoneme]) {
                    phonemeGroups[phoneme] = {
                        initial: [],
                        medial: [],
                        final: []
                    };
                }
            });

            // Process each word and break down into individual phonemes
            filteredAvailableWords.forEach((entry) => {
                const phonemes = entry.ipa
                    .split(" ")
                    .map((code) => getIpaSymbol(code));

                phonemes.forEach((phoneme, index) => {
                    if (!phonemeGroups[phoneme]) {
                        phonemeGroups[phoneme] = {
                            initial: [],
                            medial: [],
                            final: []
                        };
                    }

                    let position;
                    if (index === 0) position = "initial";
                    else if (index === phonemes.length - 1) position = "final";
                    else position = "medial";

                    // Only add the word if it's not already in this position for this phoneme
                    if (
                        !phonemeGroups[phoneme][position].find(
                            (item) => item.word === entry.word
                        )
                    ) {
                        phonemeGroups[phoneme][position].push({
                            ...entry,
                            position,
                            displayIpa: phoneme
                        });
                    }
                });
            });

            // If no phoneme is selected, show all phonemes with their positions
            if (!selectedPhoneme) {
                return Object.entries(phonemeGroups)
                    .filter(([_, positions]) =>
                        Object.values(positions).some(
                            (words) => words.length > 0
                        )
                    )
                    .reduce((obj, [phoneme, positions]) => {
                        const availablePositions = Object.entries(positions)
                            .filter(([_, words]) => words.length > 0)
                            .map(([pos]) => pos);

                        if (availablePositions.length > 0) {
                            obj[phoneme] = availablePositions;
                        }
                        return obj;
                    }, {});
            }

            // If phoneme is selected but no position, show positions for that phoneme
            if (!selectedPosition) {
                const positions = phonemeGroups[selectedPhoneme] || {
                    initial: [],
                    medial: [],
                    final: []
                };
                return Object.entries(positions)
                    .filter(([_, words]) => words.length > 0)
                    .reduce((obj, [pos, words]) => {
                        obj[`${selectedPhoneme} (${pos})`] = words;
                        return obj;
                    }, {});
            }

            // If both phoneme and position are selected, show words for that combination
            const phonemeGroup = phonemeGroups[selectedPhoneme] || {
                initial: [],
                medial: [],
                final: []
            };
            const words = phonemeGroup[selectedPosition] || [];
            return {
                [`${selectedPhoneme} (${selectedPosition})`]: words
            };
        }
    }, [
        filteredAvailableWords,
        viewMode,
        phonemeMap,
        selectedPhoneme,
        selectedPosition,
        getIpaSymbol
    ]);

    const handlePhonemeClick = (phoneme) => {
        if (selectedPhoneme === phoneme) {
            setSelectedPhoneme(null);
            setSelectedPosition(null);
        } else {
            setSelectedPhoneme(phoneme);
            setSelectedPosition(null);
        }
    };

    const handlePositionClick = (position) => {
        setSelectedPosition(position);
    };

    const handleBackClick = () => {
        if (selectedPosition) {
            setSelectedPosition(null);
        } else if (selectedPhoneme) {
            setSelectedPhoneme(null);
        }
    };

    const hdlFieldChange = (field) => (event) => {
        dispatch(
            actions.targetWordsList.create.itemSet({
                ...targetWordsList.item,
                [field]: event.target.value
            })
        );
    };

    const renderPhonemeContent = () => {
        const content = getGroupedContent;

        if (!selectedPhoneme) {
            return (
                <Box sx={styles.phonemeSelectionContainer}>
                    <Typography variant="h6" sx={styles.phonemeSelectionTitle}>
                        Select a Phoneme
                    </Typography>
                    <Box sx={styles.phonemeGrid}>
                        {Object.entries(content).map(([phoneme, positions]) => (
                            <Paper
                                key={phoneme}
                                elevation={0}
                                onClick={() => handlePhonemeClick(phoneme)}
                                sx={styles.phonemePaper}
                            >
                                <Typography sx={styles.phonemeTitle}>
                                    {phoneme}
                                </Typography>
                                <Typography sx={styles.phonemeSubtitle}>
                                    {Object.entries(content[phoneme]).length}{" "}
                                    position
                                    {Object.entries(content[phoneme]).length !==
                                    1
                                        ? "s"
                                        : ""}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>
            );
        }

        return (
            <>
                <Box sx={{ mb: 3 }}>
                    <Button
                        startIcon={<ArrowBackIcon />}
                        onClick={handleBackClick}
                        variant="text"
                        sx={styles.backButton}
                    >
                        Back to Phonemes
                    </Button>

                    {!selectedPosition ? (
                        <>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Select position for "{selectedPhoneme}"
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    flexWrap: "wrap"
                                }}
                            >
                                {Object.entries(content).map(([key, items]) => {
                                    const position = key
                                        .split(" (")[1]
                                        .replace(")", "");
                                    return (
                                        <Button
                                            key={position}
                                            variant="outlined"
                                            onClick={() =>
                                                handlePositionClick(position)
                                            }
                                            sx={styles.positionButton}
                                        >
                                            {position}
                                            <Typography
                                                component="span"
                                                variant="caption"
                                                sx={styles.positionCount}
                                            >
                                                ({items.length})
                                            </Typography>
                                        </Button>
                                    );
                                })}
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography variant="h6" sx={{ mb: 2 }}>
                                Words with {selectedPhoneme} ({selectedPosition}
                                )
                            </Typography>
                            <Box sx={styles.wordGrid}>
                                {Object.values(content)[0].map(
                                    (entry, index) => (
                                        <Paper
                                            key={`${entry.word}-${index}`}
                                            elevation={0}
                                            sx={styles.wordPaper}
                                            onClick={() =>
                                                handleTransferWord({
                                                    ...entry,
                                                    noOfInstances: 3
                                                })
                                            }
                                        >
                                            <Word
                                                word={entry.word}
                                                ipa={
                                                    entry.ipaSymbol ||
                                                    entry.displayIpa ||
                                                    entry.ipa
                                                }
                                            />
                                        </Paper>
                                    )
                                )}
                            </Box>
                        </>
                    )}
                </Box>
            </>
        );
    };

    const hdlDeleteList = async () => {
        setLoading(true);
        try {
            await dispatch(
                actions.targetWordsList.create.deleteTargetList(wordListId)
            );
            enqueueSnackbar(`List deleted successfully`, {
                variant: "info"
            });
            hdlModalClose();
        } catch (error) {
            enqueueSnackbar(`Error deleting list: ${error.message}`, {
                variant: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleSaveList = async () => {
        // Reset any previous validation errors
        setValidationError(null);

        // Validate name
        if (
            !targetWordsList.item.name ||
            targetWordsList.item.name.trim() === ""
        ) {
            setValidationError("Please enter a list name");
            return;
        }

        // Validate words
        if (
            !targetWordsList.item.words ||
            targetWordsList.item.words.length === 0
        ) {
            setValidationError("Please select at least one word");
            return;
        }

        setLoading(true);
        try {
            if (!wordListId) {
                await dispatch(
                    actions.targetWordsList.create.postTargetList(
                        targetWordsList.item
                    )
                );
            } else {
                await dispatch(
                    actions.targetWordsList.create.putTargetList(
                        wordListId,
                        targetWordsList.item
                    )
                );
            }
            enqueueSnackbar(
                `List ${wordListId === 0 ? "created" : "updated"} successfully`,
                {
                    variant: "info"
                }
            );
            hdlModalClose();
        } catch (error) {
            setValidationError("Failed to save list. Please try again.");
            enqueueSnackbar(`Error saving list: ${error.message}`, {
                variant: "error"
            });
        } finally {
            setLoading(false);
        }
    };

    const groupedContent = getGroupedContent;

    return (
        <Box sx={styles.formContainer}>
            <Box sx={styles.formContent}>
                <Box sx={styles.headerSection}>
                    <Box sx={styles.formFields}>
                        <TextField
                            label="List name"
                            variant="outlined"
                            value={targetWordsList.item.name}
                            onChange={hdlFieldChange("name")}
                            size="small"
                            sx={styles.nameField}
                            required
                            error={
                                validationError && !targetWordsList.item.name
                            }
                            helperText={
                                validationError && !targetWordsList.item.name
                                    ? "Name is required"
                                    : ""
                            }
                        />
                        <TextField
                            label="Description"
                            variant="outlined"
                            value={targetWordsList.item.description}
                            onChange={hdlFieldChange("description")}
                            size="small"
                            sx={styles.descriptionField}
                        />
                    </Box>
                </Box>

                <Box sx={styles.mainContent}>
                    <Paper elevation={0} sx={styles.sidePanel}>
                        <Typography variant="h6" sx={styles.panelHeader}>
                            Selected Words
                            <Badge
                                badgeContent={targetWordsList.item.words.length}
                                color="primary"
                                sx={{ ml: 2 }}
                            />
                        </Typography>
                        <Box sx={styles.panelContent}>
                            <List>
                                {targetWordsList.item.words.map(
                                    (entry, index) => (
                                        <Paper
                                            key={`${entry.word}-${index}`}
                                            elevation={0}
                                            sx={styles.wordCard}
                                        >
                                            <ListItem>
                                                <Tooltip title="Remove word">
                                                    <IconButton
                                                        aria-label="remove"
                                                        onClick={() =>
                                                            handleTransferWord(
                                                                entry
                                                            )
                                                        }
                                                        size="small"
                                                        sx={styles.removeButton}
                                                    >
                                                        <ClearIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <ListItemText
                                                    primary={
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                gap: 1
                                                            }}
                                                        >
                                                            <Typography variant="subtitle1">
                                                                {entry.word}
                                                            </Typography>
                                                            {entry.selectedPhoneme &&
                                                                entry.selectedPosition && (
                                                                    <Chip
                                                                        label={`${entry.selectedPhoneme} (${entry.selectedPosition})`}
                                                                        size="small"
                                                                        color="primary"
                                                                        variant="outlined"
                                                                        sx={
                                                                            styles.wordChip
                                                                        }
                                                                    />
                                                                )}
                                                        </Box>
                                                    }
                                                />
                                                <Incrementor
                                                    index={index}
                                                    targetWord={entry.word}
                                                />
                                            </ListItem>
                                        </Paper>
                                    )
                                )}
                            </List>
                        </Box>
                    </Paper>

                    <Divider orientation="vertical" flexItem />

                    <Paper elevation={0} sx={styles.sidePanel}>
                        <Box sx={styles.panelHeader}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mb: 2
                                }}
                            >
                                <Typography variant="h6">
                                    Available Words
                                </Typography>
                                <Tooltip title="Select words by their phoneme positions. Words are grouped by where the phoneme appears in the word (initial, medial, or final position).">
                                    <InfoIcon
                                        sx={{
                                            ml: 1,
                                            color: "info.main",
                                            fontSize: "20px"
                                        }}
                                    />
                                </Tooltip>
                            </Box>
                            <Box sx={styles.searchSection}>
                                <TextField
                                    value={filter}
                                    onChange={handleFilterChange}
                                    placeholder="Search words..."
                                    size="small"
                                    fullWidth
                                />
                                <ToggleButtonGroup
                                    value={viewMode}
                                    exclusive
                                    onChange={handleViewModeChange}
                                    size="small"
                                >
                                    <ToggleButton value="phoneme">
                                        <Tooltip title="Group by phoneme position">
                                            <RecordVoiceOverIcon />
                                        </Tooltip>
                                    </ToggleButton>
                                    <ToggleButton value="word">
                                        <Tooltip title="Group alphabetically">
                                            <TextFieldsIcon />
                                        </Tooltip>
                                    </ToggleButton>
                                </ToggleButtonGroup>
                            </Box>
                        </Box>

                        <Box sx={styles.panelContent}>
                            {viewMode === "phoneme"
                                ? renderPhonemeContent()
                                : Object.keys(groupedContent).map((key) => (
                                      <Box key={key} sx={{ mb: 3 }}>
                                          <Typography
                                              variant="h6"
                                              sx={{
                                                  display: "flex",
                                                  alignItems: "center",
                                                  gap: 1,
                                                  mb: 1
                                              }}
                                          >
                                              {key}
                                              <Chip
                                                  label={`${groupedContent[key].length} words`}
                                                  size="small"
                                                  color="primary"
                                              />
                                          </Typography>
                                          <Box sx={styles.alphabeticalGrid}>
                                              {groupedContent[key].map(
                                                  (entry, index) => (
                                                      <Paper
                                                          key={`${entry.word}-${index}`}
                                                          elevation={0}
                                                          sx={styles.wordItem}
                                                          onClick={() =>
                                                              handleTransferWord(
                                                                  {
                                                                      ...entry,
                                                                      noOfInstances: 3
                                                                  }
                                                              )
                                                          }
                                                      >
                                                          <Typography
                                                              variant="subtitle1"
                                                              sx={{ mb: 0.5 }}
                                                          >
                                                              {entry.word}
                                                          </Typography>
                                                          <Typography
                                                              variant="body2"
                                                              color="text.secondary"
                                                          >
                                                              /
                                                              {entry.displayIpa}
                                                              /
                                                          </Typography>
                                                      </Paper>
                                                  )
                                              )}
                                          </Box>
                                      </Box>
                                  ))}
                        </Box>
                    </Paper>
                </Box>

                <Box
                    sx={{
                        ...styles.footer,
                        justifyContent:
                            wordListId > 0 ? "space-between" : "flex-end"
                    }}
                >
                    {validationError && (
                        <Typography color="error" sx={{ mr: 2 }}>
                            {validationError}
                        </Typography>
                    )}
                    {wordListId > 0 && (
                        <Button
                            loading={loading}
                            variant="outlined"
                            color="primary"
                            sx={{ borderColor: "red", color: "red" }}
                            onClick={hdlDeleteList}
                        >
                            Delete
                        </Button>
                    )}
                    <Button
                        loading={loading}
                        variant="contained"
                        color="primary"
                        onClick={handleSaveList}
                    >
                        Save List
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default WordsListForm;
