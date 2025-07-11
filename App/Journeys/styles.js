const styles = {
    // Container and Layout
    container: {
        minHeight: "100vh",
        width: "100%",
        maxWidth: "none"
    },

    // Header Section
    headerBox: {
        backgroundColor: "white",
        p: 3,
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        mb: 3
    },

    headerContent: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        mb: 3
    },

    titleBox: {},

    mainTitle: {
        fontWeight: 600,
        color: "#1a1a1a",
        mb: 1,
        fontSize: "1.75rem"
    },

    subtitle: {
        color: "#666",
        mb: 0
    },

    newJourneyButton: {
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
    },

    // Search and Controls
    searchField: {
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
    },

    searchIcon: {
        color: "#666"
    },

    controlsBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2
    },

    journeyCount: {
        color: "#666",
        fontWeight: 500
    },

    expandAllButton: {
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
    },

    // Journey Cards/Accordion
    journeyCardContainer: {
        mb: 1.5
    },

    accordion: {
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
    },

    accordionSummary: {
        minHeight: "60px",
        backgroundColor: "#fbfbfb",
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
    },

    accordionSummaryExpanded: {
        borderBottom: "1px solid #e8e8e8"
    },

    summaryGrid: {
        display: "grid",
        gridTemplateColumns: "1fr auto",
        alignItems: "center",
        width: "100%",
        gap: 3
    },

    // Patient and Journey Info
    patientInfoBox: {},

    patientName: {
        fontWeight: 600,
        color: "#1a1a1a",
        fontSize: "1.1rem",
        mb: 0.5
    },

    journeyPlanName: {
        color: "#555",
        fontWeight: 500,
        mb: 0.5
    },

    statusBox: {
        display: "flex",
        gap: 2,
        alignItems: "center"
    },

    sessionsInfo: {
        color: "#666",
        display: "flex",
        alignItems: "center",
        gap: 0.5
    },

    statusDot: {
        width: 8,
        height: 8,
        borderRadius: "50%",
        display: "inline-block"
    },

    statusDotActive: {
        backgroundColor: "#4caf50"
    },

    statusDotPending: {
        backgroundColor: "#ff9800"
    },

    createdDate: {
        color: "#666"
    },

    // Action Buttons
    actionsBox: {
        display: "flex",
        alignItems: "center",
        gap: 1
    },

    viewSessionsButton: {
        backgroundColor: "#1976d2",
        "&:hover": {
            backgroundColor: "#1565c0"
        },
        textTransform: "none",
        fontWeight: 600,
        px: 2,
        py: 1,
        borderRadius: "6px",
        fontSize: "0.875rem",
        boxShadow: "none",
        mr: 2
    },

    editButton: {
        backgroundColor: "#f5f5f5",
        border: "1px solid #ddd",
        boxShadow: "none",
        "&:hover": {
            backgroundColor: "#eeeeee",
            boxShadow: "none"
        },
        mr: 2
    },

    // Expanded Details
    accordionDetails: {
        pt: 3,
        pb: 3,
        backgroundColor: "white"
    },

    detailsGrid: {
        display: "grid",
        gridTemplateColumns: {
            xs: "1fr",
            md: "1fr 1fr"
        },
        gap: 3
    },

    sectionBox: {},

    sectionTitle: {
        fontWeight: 600,
        color: "#333",
        mb: 1.5,
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        fontSize: "0.75rem"
    },

    sectionContent: {
        pl: 2,
        borderLeft: "3px solid #e0e0e0"
    },

    detailText: {
        color: "#555",
        lineHeight: 1.6,
        mb: 1
    },

    detailTextLast: {
        color: "#555",
        lineHeight: 1.6
    },

    // Empty State
    emptyStateBox: {
        backgroundColor: "white",
        p: 4,
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center"
    },

    emptyStateTitle: {
        color: "#666",
        mb: 1,
        fontWeight: 500
    },

    emptyStateMessage: {
        color: "#888"
    }
};

export default styles;
