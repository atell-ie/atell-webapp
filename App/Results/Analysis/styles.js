export default {
    // Container and Layout (matching Journeys)
    container: {
        py: 3,
        width: "100%",
        maxWidth: "none"
    },

    // Header Section (matching Journeys pattern)
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
        alignItems: "center",
        mb: 2
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

    // Audio section styling
    audioSection: {
        display: "flex",
        alignItems: "center",
        gap: 2,
        p: 2,
        backgroundColor: "#f8f9fa",
        borderRadius: "8px",
        border: "1px solid #e8e8e8"
    },

    sessionFileName: {
        color: "#333",
        fontWeight: 500
    },

    // Action buttons
    adjustMappingButton: {
        textTransform: "none",
        fontWeight: 500,
        px: 2,
        py: 1,
        borderRadius: "8px",
        fontSize: "0.875rem"
    },

    // Content area
    contentArea: {
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        minHeight: "600px",
        display: "flex",
        flexDirection: "column"
    },

    // Sidebar styling
    sidebar: {
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #e8e8e8",
        p: 3
    },

    sidebarTitle: {
        fontWeight: 600,
        color: "#333",
        mb: 2,
        fontSize: "1.1rem"
    },

    targetWordsList: {
        maxHeight: 500,
        overflow: "auto"
    },

    // Target word item styling
    targetWordItem: {
        mb: 1,
        borderRadius: "8px",
        transition: "all 0.2s ease",
        cursor: "pointer",
        border: "1px solid transparent"
    },

    targetWordItemSelected: {
        backgroundColor: "#e3f2fd",
        borderColor: "#1976d2",
        boxShadow: "0 2px 4px rgba(25, 118, 210, 0.15)"
    },

    targetWordItemDefault: {
        backgroundColor: "#fff",
        "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#ddd"
        }
    },

    targetWordItemDisabled: {
        opacity: 0.5,
        cursor: "not-allowed",
        pointerEvents: "none"
    },

    // Main content area
    mainContent: {
        p: 3,
        width: "100%",
        overflow: "hidden"
    },

    // Legacy styles (keeping for compatibility)
    headerRow: {
        padding: "1rem 0",
        margin: ".3rem 0"
    },
    headerText: { fontWeight: "bold" },
    gridRow: {
        background: "#fff",
        padding: "1rem",
        margin: ".1rem 0",
        borderRadius: ".3rem",
        alignItems: "center"
    },
    gridChildRow: {
        alignItems: "center",
        padding: ".2rem 0"
    },
    playAudioWrapper: {
        display: "flex",
        padding: "0.5rem 0",
        borderRadius: ".3rem"
    },
    audioChip: {
        borderRadius: ".3rem",
        padding: ".5rem",
        margin: "0 .5rem 0 0"
    },
    selectedTarget: {
        background: "#eee",
        borderRadius: ".5rem",
        margin: ".5rem",
        boxShadow: "1px 1px 1px 1px #ccc"
    },
    defaultTarget: {
        background: "#fff",
        pading: "0 1rem",
        borderRadius: "0.5rem",
        margin: ".5rem",
        boxShadow: "1px 1px 1px 1px #ccc"
    },
    phoneme: {
        padding: ".3rem .8rem",
        margin: ".5rem",
        textTransform: "lowercase"
    },
    syllable: {
        paddingTop: ".5rem",
        margin: "0 1rem",
        borderTop: "3px solid #ccc"
    }
};
