import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import actions from '../Store/actions';
import { useSnackbar } from 'notistack';
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
    Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { format } from 'date-fns';
import JourneyDialog from './JourneyDialog';

const Journeys = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false)
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
                console.error('Error fetching journeys:', error);
                enqueueSnackbar('Error fetching journeys', { variant: 'error' });
            }
        }
        fetchJourneys();
    }, []);


    const filteredJourneys = journeys.data.filter(journey =>
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
        setLoading(true)
        if (selectedJourney) {            
            await dispatch(actions.journeys.create.putJourneys(selectedJourney.id, journeyData));            
        } else {
            await dispatch(actions.journeys.create.postJourneys(journeyData));        
        }
        setLoading(false)
    };
    

    const handleExpandAll = () => {
        setGlobalExpanded(!globalExpanded);
        if (!globalExpanded) {
            const allCardIds = new Set();
            filteredJourneys.forEach(journey => {
                allCardIds.add(journey.id);
            });
            setExpandedCards(allCardIds);
        } else {
            setExpandedCards(new Set());
        }
    };

    const handleCardToggle = (cardId) => {
        setExpandedCards(prev => {
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
        <Container maxWidth="md" sx={{ py: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h5" component="h1">
                    Journeys
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={handleNewJourney}
                    size="small"
                >
                    New Journey
                </Button>
            </Box>

            <TextField
                fullWidth
                size="small"
                placeholder="Search by client..."
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mb: 2 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
            />

            <JourneyDialog
                open={isDialogOpen}
                onClose={handleCloseDialog}
                onSubmit={handleSubmitJourney}
                initialData={selectedJourney}
                loading={loading}
            />

            {filteredJourneys.length > 0 ? (
                <Box>
                    <Typography 
                        variant="body2" 
                        sx={{ 
                            mb: 1, 
                            cursor: 'pointer',
                            color: 'primary.main',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                        onClick={handleExpandAll}
                    >
                        {globalExpanded ? 'Collapse All' : 'Expand All'}
                    </Typography>
                    {filteredJourneys.map((journey) => (
                        <Box 
                            key={journey.id}
                            sx={{ mb: 1 }}
                        >
                            <Accordion 
                                key={journey.id}
                                expanded={expandedCards.has(journey.id)}
                                onChange={() => handleCardToggle(journey.id)}
                                sx={{ 
                                    '&:before': {
                                        display: 'none',
                                    }
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    sx={{
                                        minHeight: '48px',
                                        '& .MuiAccordionSummary-content': {
                                            margin: '8px 0',
                                        },
                                    }}
                                >
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: 2,
                                        width: '100%',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                            <Typography variant="subtitle1">
                                                {journey.client.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {journey.name}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Button
                                                variant="text"
                                                color="primary"
                                                size="small"
                                                onClick={() => navigate(`/auth/journeys/${journey.id}/sessions`)}
                                            >
                                                View Sessions
                                            </Button>
                                            <Tooltip title="Edit Journey">
                                                <IconButton 
                                                    size="small"
                                                    onClick={handleEditJourney(journey)}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </AccordionSummary>
                                <AccordionDetails 
                                    sx={{ pt: 0, pb: 2 }}
                                >
                                    <Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {journey.sessionsCount} sessions
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {journey.description}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Created {format(new Date(journey.createdDate), 'MMM d, yyyy')}
                                        </Typography>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography>No journeys found matching your search.</Typography>
            )}
        </Container>
    );
};

export default Journeys;
