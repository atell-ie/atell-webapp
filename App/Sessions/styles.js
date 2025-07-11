export default {
    // Container and Layout (matching WordsList)
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

    buttonGroup: {
        display: "flex",
        gap: 2,
        alignItems: "center"
    },

    backButton: {
        textTransform: "none",
        fontWeight: 500,
        px: 2,
        py: 1,
        borderRadius: "8px",
        fontSize: "0.875rem"
    },

    uploadButton: {
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

    sessionCount: {
        color: "#666",
        fontWeight: 500
    },

    // Data Grid Container
    dataGridContainer: {
        height: "500px",
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

    // DataGrid styling
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

    // Legacy styles
    deviceShown: {
        display: "flex",
        alignItems: "center"
    },
    textField: {
        background: "#fff"
    },
    viewImage: {
        width: "100%"
    },
    uploadBox: {
        border: "2px dashed #ccc",
        borderRadius: "8px",
        padding: "24px",
        backgroundColor: "#fafafa",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        "&:hover": {
            borderColor: "#2196f3",
            backgroundColor: "#f0f7ff"
        }
    }
};
