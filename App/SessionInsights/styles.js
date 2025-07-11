export default {
    // Container and Layout (Journey-style)
    container: {
        py: 3,
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

    configureButton: {
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

    // Content Section
    contentBox: {
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        border: "1px solid #e8e8e8"
    },

    // Empty State
    emptyStateBox: {
        backgroundColor: "white",
        p: 6,
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center"
    },

    emptyStateIcon: {
        fontSize: "3rem",
        color: "#ddd",
        mb: 2
    },

    emptyStateTitle: {
        color: "#333",
        mb: 2,
        fontWeight: 600,
        fontSize: "1.25rem"
    },

    emptyStateMessage: {
        color: "#666",
        mb: 3,
        maxWidth: "400px",
        mx: "auto"
    },

    // Session Summary Section
    summaryBox: {
        p: 3,
        mb: 3,
        bgcolor: "#f8f9fa",
        border: "1px solid #e8e8e8",
        borderRadius: "12px"
    },

    summaryHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        mb: 2
    },

    sessionsDisplay: {
        display: "flex",
        alignItems: "center",
        gap: 2
    },

    sessionChip: {
        bgcolor: "white",
        color: "text.primary",
        borderColor: "grey.300",
        fontWeight: 500
    },

    progressStats: {
        display: "flex",
        alignItems: "center",
        gap: 2
    },

    progressChip: {
        fontSize: "0.75rem",
        height: 24,
        fontWeight: 600
    },

    improvementText: {
        fontSize: "0.875rem",
        fontWeight: 500,
        color: "#333"
    },

    changeSessionsButton: {
        fontSize: "0.75rem",
        py: 0.5,
        px: 1.5,
        height: 32,
        textTransform: "none",
        fontWeight: 500
    },

    // Modal Styles
    modalContent: {
        minHeight: 500,
        py: 2
    },

    sectionTitle: {
        fontWeight: 600,
        mb: 2,
        color: "#333",
        fontSize: "1.1rem"
    },

    journeySelect: {
        mb: 3
    },

    sessionCard: {
        p: 3,
        border: "2px solid",
        borderRadius: "12px",
        transition: "all 0.2s ease",
        cursor: "pointer"
    },

    sessionCardActive: {
        borderColor: "primary.main",
        bgcolor: "primary.50"
    },

    sessionCardInactive: {
        borderColor: "grey.300",
        bgcolor: "grey.50"
    },

    sessionCardTitle: {
        mb: 2,
        fontWeight: 600,
        display: "flex",
        alignItems: "center",
        gap: 1
    },

    sessionSelect: {
        bgcolor: "white",
        minHeight: 56,
        "& .MuiSelect-select": {
            py: 2
        }
    },

    // Success Message
    successMessage: {
        mt: 3,
        p: 2,
        bgcolor: "success.50",
        border: "1px solid",
        borderColor: "success.200",
        borderRadius: "8px",
        display: "flex",
        alignItems: "center",
        gap: 1
    },

    // Loading State
    loadingBox: {
        backgroundColor: "white",
        p: 6,
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        textAlign: "center"
    },

    // Comparison Content
    comparisonContainer: {
        p: 3
    }
};
