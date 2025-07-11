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

    newListButton: {
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

    // Controls Section
    controlsBox: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 0
    },

    listCount: {
        color: "#666",
        fontWeight: 500
    },

    // Data Grid Container
    dataGridContainer: {
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        overflow: "hidden",
        border: "1px solid #e8e8e8"
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
    },

    // Layout styles
    formContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        padding: "1.5rem",
        maxHeight: "calc(100vh - 100px)", // Increased space for dialog header and padding
        overflow: "hidden"
    },
    formContent: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        gap: "1.5rem",
        height: "100%",
        overflow: "hidden"
    },
    headerSection: {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        flexShrink: 0,
        marginBottom: "1rem"
    },
    formFields: {
        display: "flex",
        gap: "1.5rem"
    },
    mainContent: {
        display: "flex",
        flex: 1,
        gap: "1rem",
        minHeight: 0, // Important for flex overflow
        overflow: "hidden"
    },
    footer: {
        display: "flex",
        flexShrink: 0, // Prevent footer from shrinking
        paddingTop: "1rem",
        marginTop: "auto", // Push footer to bottom
        borderTop: "1px solid #e0e0e0",
        backgroundColor: "#fff",
        position: "sticky",
        bottom: 0,
        zIndex: 1
    },

    // Form field styles
    nameField: {
        flex: 1,
        "& .MuiInputBase-root": {
            padding: "0"
        },
        "& .MuiOutlinedInput-input": {
            padding: "12px 14px"
        }
    },
    descriptionField: {
        flex: 2,
        "& .MuiInputBase-root": {
            padding: "0"
        },
        "& .MuiOutlinedInput-input": {
            padding: "12px 14px"
        }
    },

    // Panel styles
    sidePanel: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        padding: "0 1.5rem",
        minHeight: 0,
        backgroundColor: "#fff",
        "& .MuiListItemText-root": {
            margin: "6px 0"
        }
    },
    panelHeader: {
        marginBottom: "1.5rem",
        flexShrink: 0
    },
    panelHeaderTitle: {
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        marginBottom: "1rem",
        flexShrink: 0,
        "& .MuiTypography-root": {
            lineHeight: 1.5
        }
    },
    panelHeaderControls: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        flexShrink: 0 // Prevent controls from shrinking
    },
    panelContent: {
        flex: 1,
        overflow: "auto",
        minHeight: 0 // Important for flex overflow
    },

    // Search section styles
    searchSection: {
        display: "flex",
        gap: "1rem",
        alignItems: "center",
        width: "100%"
    },

    // Word card styles
    wordCard: {
        marginBottom: "0.5rem",
        "&:hover": {
            backgroundColor: "#f5f5f5"
        },
        "& .MuiListItem-root": {
            padding: "8px 16px"
        }
    },
    wordItem: {
        padding: "12px",
        cursor: "pointer",
        "&:hover": {
            backgroundColor: "#f5f5f5"
        }
    },
    wordItemContent: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        minWidth: 0, // Important for text truncation
        "& .MuiTypography-root": {
            minWidth: 0,
            overflow: "hidden",
            textOverflow: "ellipsis"
        }
    },
    wordChip: {
        marginLeft: "0.5rem"
    },
    removeButton: {
        marginRight: "0.5rem"
    },

    // Phoneme button styles
    phonemeButton: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "8px 12px",
        minWidth: "80px",
        margin: "0.25rem"
    },

    // Grid styles
    alphabeticalGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: "1rem"
    },

    // Lists wrapper
    listsWrapper: {
        display: "flex",
        flexDirection: "row",
        height: "50vh"
    },

    // Grid root (Journey-style)
    gridRoot: {
        border: "none",
        backgroundColor: "transparent",
        "& .MuiDataGrid-columnSeparator": {
            display: "none"
        },
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #e8e8e8",
            borderRadius: 0,
            "& .MuiDataGrid-columnHeader": {
                fontWeight: 600,
                color: "#333",
                fontSize: "0.875rem",
                padding: "16px 20px"
            }
        },
        "& .MuiDataGrid-row": {
            backgroundColor: "#fff",
            minHeight: "64px",
            "&:nth-of-type(even)": {
                backgroundColor: "#fafafa"
            },
            "&:hover": {
                backgroundColor: "#f5f5f5"
            }
        },
        "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f0f0f0",
            fontSize: "0.875rem",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center"
        },
        "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e8e8e8",
            backgroundColor: "#f8f9fa",
            minHeight: "56px"
        },
        // Remove any text overflow that might cause triple dots
        "& .MuiDataGrid-cellContent": {
            overflow: "visible",
            textOverflow: "unset",
            whiteSpace: "normal"
        }
    },

    // Word component styles
    wordContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        p: 1
    },
    wordText: {
        fontWeight: "500",
        textAlign: "center",
        width: "100%",
        wordBreak: "break-word"
    },
    ipaText: {
        color: "text.secondary",
        textAlign: "center",
        width: "100%",
        wordBreak: "break-word"
    },

    // Phoneme selection styles
    phonemeSelectionContainer: {
        mb: 3
    },
    phonemeSelectionTitle: {
        mb: 3,
        fontSize: "1.25rem",
        fontWeight: 600,
        color: "#333"
    },
    phonemeGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(85px, 1fr))",
        gap: "0.5rem",
        width: "100%"
    },
    phonemePaper: {
        border: "1px solid #e0e0e0",
        borderRadius: "6px",
        cursor: "pointer",
        padding: "0.75rem 0.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80px",
        backgroundColor: "#fefefe",
        "&:hover": {
            backgroundColor: "#f8f9fa",
            borderColor: "#1976d2"
        }
    },
    phonemeTitle: {
        fontSize: "1.5rem",
        fontWeight: 600,
        marginBottom: "0.25rem",
        textAlign: "center",
        color: "#333",
        lineHeight: 1
    },
    phonemeSubtitle: {
        color: "#666",
        textAlign: "center",
        fontSize: "0.75rem",
        fontWeight: 500,
        lineHeight: 1.1
    },

    // Position selection styles
    positionContainer: {
        mb: 3
    },
    backButton: {
        mb: 2
    },
    positionTitle: {
        mb: 2
    },
    positionButton: {
        minWidth: "120px",
        borderColor: "#e0e0e0",
        color: "text.primary",
        "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#bdbdbd"
        }
    },
    positionCount: {
        ml: 1,
        color: "text.secondary"
    },

    // Word list styles
    wordListTitle: {
        mb: 2
    },
    wordGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 2
    },
    wordPaper: {
        cursor: "pointer",
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        backgroundColor: "#fff",
        "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#bdbdbd"
        }
    },
    wordTitle: {
        mb: 0.5
    },

    // Header styles
    headerContainer: {
        display: "flex",
        alignItems: "center",
        mb: 2
    },
    infoIcon: {
        ml: 1,
        color: "info.main",
        fontSize: "20px"
    },
    searchIcon: {
        mr: 1,
        color: "text.secondary"
    },

    // Group styles
    groupContainer: {
        mb: 3
    },
    groupHeader: {
        display: "flex",
        alignItems: "center",
        gap: 1,
        mb: 1
    },
    badge: {
        "& .MuiBadge-badge": {
            right: -12
        }
    },

    // Word list container
    wordListContainer: {
        overflow: "auto",
        flex: 1,
        minHeight: 0, // Important for flex overflow
        padding: "4px"
    },

    // Phoneme content styles (using main phoneme styles above)
    backButton: {
        mb: 2
    },
    positionButton: {
        minWidth: "120px",
        borderColor: "#e0e0e0",
        color: "text.primary",
        "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#bdbdbd"
        }
    },
    positionCount: {
        ml: 1,
        color: "text.secondary"
    },
    wordGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
        gap: 2
    },
    wordPaper: {
        cursor: "pointer",
        border: "1px solid #e0e0e0",
        borderRadius: 1,
        backgroundColor: "#fff",
        transition: "all 0.2s ease",
        "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#bdbdbd"
        }
    }
};
