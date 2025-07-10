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
        <Container maxWidth="lg" sx={{ minHeight: "100vh" }}>
            {/* Header Section */}
            <Box
                sx={{
                    backgroundColor: "white",
                    p: 3,
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    mb: 3
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        mb: 3
                    }}
                >
                    <Box>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                fontWeight: 600,
                                color: "#1a1a1a",
                                mb: 1,
                                fontSize: "1.75rem"
                            }}
                        >
                            Patient Journey Plans
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "#666",
                                mb: 0
                            }}
                        >
                            Manage and monitor patient speech therapy journeys
                        </Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleNewJourney}
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
                            fontSize: "0.95rem",
                            boxShadow: "none"
                        }}
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
                    sx={{
                        mb: 2,
                        "& .MuiOutlinedInput-root": {
                            backgroundColor: "#f8f9fa",
                            borderRadius: "8px",
                            "&:hover .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#1976d2"
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                borderColor: "#1976d2"
                            }
                        }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: "#666" }} />
                            </InputAdornment>
                        )
                    }}
                />

                {filteredJourneys.length > 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                color: "#666",
                                fontWeight: 500
                            }}
                        >
                            {filteredJourneys.length} Journey Plan
                            {filteredJourneys.length !== 1 ? "s" : ""} Found
                        </Typography>
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                borderColor: "#ddd",
                                color: "#555",
                                boxShadow: "none",
                                "&:hover": {
                                    borderColor: "#1976d2",
                                    backgroundColor: "#f5f5f5",
                                    boxShadow: "none"
                                }
                            }}
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
                        <Box key={journey.id} sx={{ mb: 1.5 }}>
                            <Accordion
                                expanded={expandedCards.has(journey.id)}
                                onChange={() => handleCardToggle(journey.id)}
                                sx={{
                                    "&:before": {
                                        display: "none"
                                    },
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                                    border: "1px solid #e8e8e8",
                                    borderRadius: "6px",
                                    "&.Mui-expanded": {
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.12)"
                                    },
                                    "&:hover": {
                                        boxShadow: "0 2px 6px rgba(0,0,0,0.12)"
                                    }
                                }}
                            >
                                {/* Patient/Journey Header */}
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        minHeight: "60px",
                                        backgroundColor: "#fbfbfb",
                                        borderBottom: expandedCards.has(
                                            journey.id
                                        )
                                            ? "1px solid #e8e8e8"
                                            : "none",
                                        px: 2.5,
                                        py: 1,
                                        "& .MuiAccordionSummary-content": {
                                            margin: "8px 0",
                                            alignItems: "center"
                                        },
                                        "&.Mui-expanded": {
                                            backgroundColor: "#f8f8f8",
                                            borderBottom: "1px solid #e8e8e8"
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: "1fr auto",
                                            alignItems: "center",
                                            width: "100%",
                                            gap: 3
                                        }}
                                    >
                                        {/* Patient and Journey Info */}
                                        <Box>
                                            <Typography
                                                variant="h6"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: "#1a1a1a",
                                                    fontSize: "1.1rem",
                                                    mb: 0.5
                                                }}
                                            >
                                                {journey.client.name}
                                            </Typography>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    color: "#555",
                                                    fontWeight: 500,
                                                    mb: 0.5
                                                }}
                                            >
                                                Journey Plan: {journey.name}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 2,
                                                    alignItems: "center"
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "#666",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.5
                                                    }}
                                                >
                                                    <Box
                                                        component="span"
                                                        sx={{
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: "50%",
                                                            backgroundColor:
                                                                journey.sessionsCount >
                                                                0
                                                                    ? "#4caf50"
                                                                    : "#ff9800",
                                                            display:
                                                                "inline-block"
                                                        }}
                                                    />
                                                    {journey.sessionsCount}{" "}
                                                    Sessions
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ color: "#666" }}
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
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1
                                            }}
                                        >
                                            <Button
                                                variant="contained"
                                                size="small"
                                                sx={{
                                                    backgroundColor: "#1976d2",
                                                    "&:hover": {
                                                        backgroundColor:
                                                            "#1565c0"
                                                    },
                                                    textTransform: "none",
                                                    fontWeight: 600,
                                                    px: 2,
                                                    py: 1,
                                                    borderRadius: "6px",
                                                    fontSize: "0.875rem",
                                                    boxShadow: "none",
                                                    mr: 2
                                                }}
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
                                                    sx={{
                                                        backgroundColor:
                                                            "#f5f5f5",
                                                        border: "1px solid #ddd",
                                                        boxShadow: "none",
                                                        "&:hover": {
                                                            backgroundColor:
                                                                "#eeeeee",
                                                            boxShadow: "none"
                                                        },
                                                        mr: 2
                                                    }}
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
                                <AccordionDetails
                                    sx={{
                                        pt: 3,
                                        pb: 3,
                                        backgroundColor: "white"
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "grid",
                                            gridTemplateColumns: {
                                                xs: "1fr",
                                                md: "1fr 1fr"
                                            },
                                            gap: 3
                                        }}
                                    >
                                        {/* Treatment Details */}
                                        <Box>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: "#333",
                                                    mb: 1.5,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.5px",
                                                    fontSize: "0.75rem"
                                                }}
                                            >
                                                Treatment Details
                                            </Typography>
                                            <Box
                                                sx={{
                                                    pl: 2,
                                                    borderLeft:
                                                        "3px solid #e0e0e0"
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "#555",
                                                        lineHeight: 1.6,
                                                        mb: 1
                                                    }}
                                                >
                                                    <strong>
                                                        Description:
                                                    </strong>{" "}
                                                    {journey.description ||
                                                        "No description provided"}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "#555",
                                                        lineHeight: 1.6
                                                    }}
                                                >
                                                    <strong>Status:</strong>{" "}
                                                    {journey.sessionsCount > 0
                                                        ? "Active"
                                                        : "Pending"}
                                                </Typography>
                                            </Box>
                                        </Box>

                                        {/* Clinical Information */}
                                        <Box>
                                            <Typography
                                                variant="subtitle2"
                                                sx={{
                                                    fontWeight: 600,
                                                    color: "#333",
                                                    mb: 1.5,
                                                    textTransform: "uppercase",
                                                    letterSpacing: "0.5px",
                                                    fontSize: "0.75rem"
                                                }}
                                            >
                                                Clinical Information
                                            </Typography>
                                            <Box
                                                sx={{
                                                    pl: 2,
                                                    borderLeft:
                                                        "3px solid #e0e0e0"
                                                }}
                                            >
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "#555",
                                                        lineHeight: 1.6,
                                                        mb: 1
                                                    }}
                                                >
                                                    <strong>
                                                        Total Sessions:
                                                    </strong>{" "}
                                                    {journey.sessionsCount}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        color: "#555",
                                                        lineHeight: 1.6,
                                                        mb: 1
                                                    }}
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
                                                    sx={{
                                                        color: "#555",
                                                        lineHeight: 1.6
                                                    }}
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
                <Box
                    sx={{
                        backgroundColor: "white",
                        p: 4,
                        borderRadius: "12px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        textAlign: "center"
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{
                            color: "#666",
                            mb: 1,
                            fontWeight: 500
                        }}
                    >
                        No Journey Plans Found
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#888" }}>
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
