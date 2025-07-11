import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";
import { useSnackbar } from "notistack";
import {
    Box,
    Typography,
    TextField,
    Button,
    InputAdornment,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Container,
    IconButton,
    Tooltip
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { format } from "date-fns";
import JourneyDialog from "./JourneyDialog";
import styles from "./styles";

const Journeys = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [expandedCards, setExpandedCards] = useState(new Set());
    const [globalExpanded, setGlobalExpanded] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedJourney, setSelectedJourney] = useState(null);

    const { journeys } = useSelector((state) => state);

    useEffect(() => {
        async function fetchJourneys() {
            try {
                await dispatch(actions.journeys.create.getJourneys());
                await dispatch(actions.clients.create.getClients());
            } catch (error) {
                console.error("Error fetching journeys:", error);
                enqueueSnackbar("Error fetching journeys", {
                    variant: "error"
                });
            }
        }
        fetchJourneys();
    }, []);

    const filteredJourneys = journeys.data.filter((journey) =>
        journey.client.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleNewJourney = () => {
        setSelectedJourney(null);
        setIsDialogOpen(true);
    };

    const handleEditJourney = (journey) => (event) => {
        event.stopPropagation();
        setSelectedJourney(journey);
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setSelectedJourney(null);
    };

    const handleSubmitJourney = async (journeyData) => {
        setLoading(true);
        if (selectedJourney) {
            await dispatch(
                actions.journeys.create.putJourneys(
                    selectedJourney.id,
                    journeyData
                )
            );
        } else {
            await dispatch(actions.journeys.create.postJourneys(journeyData));
        }
        setLoading(false);
    };

    const handleExpandAll = () => {
        setGlobalExpanded(!globalExpanded);
        if (!globalExpanded) {
            const allCardIds = new Set();
            filteredJourneys.forEach((journey) => {
                allCardIds.add(journey.id);
            });
            setExpandedCards(allCardIds);
        } else {
            setExpandedCards(new Set());
        }
    };

    const handleCardToggle = (cardId) => {
        setExpandedCards((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(cardId)) {
                newSet.delete(cardId);
            } else {
                newSet.add(cardId);
            }
            return newSet;
        });
    };

    return (
        <Container maxWidth={false} sx={styles.container}>
            {/* Header Section */}
            <Box sx={styles.headerBox}>
                <Box sx={styles.headerContent}>
                    <Box sx={styles.titleBox}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={styles.mainTitle}
                        >
                            Patient Journey Plans
                        </Typography>
                        <Typography variant="body1" sx={styles.subtitle}>
                            Manage and monitor patient speech therapy journeys
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleNewJourney}
                        sx={styles.newJourneyButton}
                    >
                        New Journey Plan
                    </Button>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Search by patient name or ID..."
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={styles.searchField}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={styles.searchIcon} />
                            </InputAdornment>
                        )
                    }}
                />

                {filteredJourneys.length > 0 && (
                    <Box sx={styles.controlsBox}>
                        <Typography variant="body2" sx={styles.journeyCount}>
                            {filteredJourneys.length} Journey Plan
                            {filteredJourneys.length !== 1 ? "s" : ""} Found
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={styles.expandAllButton}
                            onClick={handleExpandAll}
                        >
                            {globalExpanded ? "Collapse All" : "Expand All"}
                        </Button>
                    </Box>
                )}
            </Box>

            <JourneyDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSubmit={handleSubmitJourney}
                initialData={selectedJourney}
                loading={loading}
            />

            {filteredJourneys.length > 0 ? (
                <Box>
                    {filteredJourneys.map((journey) => (
                        <Box key={journey.id} sx={styles.journeyCardContainer}>
                            <Accordion
                                expanded={expandedCards.has(journey.id)}
                                onChange={() => handleCardToggle(journey.id)}
                                sx={styles.accordion}
                            >
                                {/* Patient/Journey Header */}
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        ...styles.accordionSummary,
                                        ...(expandedCards.has(journey.id)
                                            ? styles.accordionSummaryExpanded
                                            : {})
                                    }}
                                >
                                    <Box sx={styles.summaryGrid}>
                                        {/* Patient and Journey Info */}
                                        <Box sx={styles.patientInfoBox}>
                                            <Typography
                                                variant="h6"
                                                sx={styles.patientName}
                                            >
                                                {journey.client.name}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={styles.journeyPlanName}
                                            >
                                                Journey Plan: {journey.name}
                                            </Typography>
                                            <Box sx={styles.statusBox}>
                                                <Typography
                                                    variant="body2"
                                                    sx={styles.sessionsInfo}
                                                >
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            ...styles.statusDot,
                                                            ...(journey.sessionsCount >
                                                            0
                                                                ? styles.statusDotActive
                                                                : styles.statusDotPending)
                                                        }}
                                                    />
                                                    {journey.sessionsCount}{" "}
                                                    Sessions
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={styles.createdDate}
                                                >
                                                    Created{" "}
                                                    {format(
                                                        new Date(
                                                            journey.createdDate
                                                        ),
                                                        "MMM d, yyyy"
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Action Buttons */}
                                        <Box sx={styles.actionsBox}>
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={styles.viewSessionsButton}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(
                                                        `/auth/journeys/${journey.id}/sessions`
                                                    );
                                                }}
                                            >
                                                View Sessions
                                            </Button>
                                            <Tooltip title="Edit Journey Plan">
                                                <IconButton
                                                    size="small"
                                                    sx={styles.editButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleEditJourney(
                                                            journey
                                                        )(e);
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </AccordionSummary>

                                {/* Expanded Details */}
                                <AccordionDetails sx={styles.accordionDetails}>
                                    <Box sx={styles.detailsGrid}>
                                        {/* Treatment Details */}
                                        <Box sx={styles.sectionBox}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={styles.sectionTitle}
                                            >
                                                Treatment Details
                                            </Typography>
                                            <Box sx={styles.sectionContent}>
                                                <Typography
                                                    variant="body2"
                                                    sx={styles.detailText}
                                                >
                                                    <strong>
                                                        Description:
                                                    </strong>{" "}
                                                    {journey.description ||
                                                        "No description provided"}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={styles.detailTextLast}
                                                >
                                                    <strong>Status:</strong>{" "}
                                                    {journey.sessionsCount > 0
                                                        ? "Active"
                                                        : "Pending"}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Clinical Information */}
                                        <Box sx={styles.sectionBox}>
                                            <Typography
                                                variant="subtitle2"
                                                sx={styles.sectionTitle}
                                            >
                                                Clinical Information
                                            </Typography>
                                            <Box sx={styles.sectionContent}>
                                                <Typography
                                                    variant="body2"
                                                    sx={styles.detailText}
                                                >
                                                    <strong>
                                                        Total Sessions:
                                                    </strong>{" "}
                                                    {journey.sessionsCount}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={styles.detailText}
                                                >
                                                    <strong>
                                                        Plan Created:
                                                    </strong>{" "}
                                                    {format(
                                                        new Date(
                                                            journey.createdDate
                                                        ),
                                                        "MMMM d, yyyy"
                                                    )}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={styles.detailTextLast}
                                                >
                                                    <strong>
                                                        Last Updated:
                                                    </strong>{" "}
                                                    {format(
                                                        new Date(
                                                            journey.createdDate
                                                        ),
                                                        "MMMM d, yyyy"
                                                    )}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Box sx={styles.emptyStateBox}>
                    <Typography variant="h6" sx={styles.emptyStateTitle}>
                        No Journey Plans Found
                    </Typography>
                    <Typography variant="body2" sx={styles.emptyStateMessage}>
                        {searchTerm
                            ? `No journey plans match your search for "${searchTerm}"`
                            : "No journey plans have been created yet"}
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Journeys;
