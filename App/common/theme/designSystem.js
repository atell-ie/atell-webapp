// Professional Medical Design System - v7 Compatible
// Comprehensive design patterns for consistent medical application UI

const designSystem = {
    // Layout & Container Patterns
    layout: {
        page: {
            padding: "24px",
            maxWidth: "1200px",
            margin: "0 auto",
            minHeight: "100vh",
            backgroundColor: "#fafafa"
        },
        maxWidth: {
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 16px"
        },
        centered: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
        },
        sidebar: {
            width: "280px",
            backgroundColor: "#ffffff",
            borderRight: "1px solid rgba(0, 0, 0, 0.08)",
            height: "100vh",
            position: "fixed",
            left: 0,
            top: 0,
            zIndex: 1200
        },
        main: {
            marginLeft: "280px",
            padding: "24px",
            minHeight: "100vh",
            backgroundColor: "#fafafa"
        }
    },

    // Card Components - Professional medical styling
    cards: {
        primary: {
            backgroundColor: "#ffffff",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            padding: "24px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
                boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
                transform: "translateY(-2px)"
            }
        },
        secondary: {
            backgroundColor: "#f8f9fa",
            borderRadius: 8,
            border: "1px solid #e9ecef",
            padding: "16px",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
            }
        },
        compact: {
            backgroundColor: "#ffffff",
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            padding: "12px 16px",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            "&:hover": {
                borderColor: "#1976d2",
                boxShadow: "0 2px 6px rgba(25, 118, 210, 0.15)"
            }
        }
    },

    // Headers & Typography Patterns
    headers: {
        pageHeader: {
            marginBottom: "32px",
            paddingBottom: "16px",
            borderBottom: "2px solid #f0f0f0"
        },
        sectionHeader: {
            marginBottom: "24px",
            marginTop: "32px"
        },
        title: {
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "rgba(0, 0, 0, 0.87)",
            marginBottom: "8px",
            lineHeight: 1.3
        },
        subtitle: {
            fontSize: "1rem",
            fontWeight: 400,
            color: "rgba(0, 0, 0, 0.6)",
            lineHeight: 1.5
        }
    },

    // Button Patterns
    buttons: {
        primary: {
            backgroundColor: "#1976d2",
            color: "#ffffff",
            fontWeight: 500,
            textTransform: "none",
            borderRadius: 8,
            padding: "10px 24px",
            boxShadow: "0 2px 4px rgba(25, 118, 210, 0.3)",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
                backgroundColor: "#1565c0",
                boxShadow: "0 4px 8px rgba(25, 118, 210, 0.4)",
                transform: "translateY(-1px)"
            }
        },
        secondary: {
            backgroundColor: "transparent",
            color: "#1976d2",
            fontWeight: 500,
            textTransform: "none",
            borderRadius: 8,
            padding: "10px 24px",
            border: "1px solid #1976d2",
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.04)",
                borderColor: "#1565c0"
            }
        },
        compact: {
            padding: "6px 16px",
            fontSize: "0.875rem",
            minHeight: "32px"
        },
        icon: {
            minWidth: "40px",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            padding: 0
        }
    },

    // Form Elements
    forms: {
        searchField: {
            "& .MuiOutlinedInput-root": {
                backgroundColor: "#f8f9fa",
                borderRadius: 25,
                fontSize: "0.875rem",
                "&:hover": {
                    backgroundColor: "#f5f5f5"
                },
                "&.Mui-focused": {
                    backgroundColor: "#ffffff",
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2"
                    }
                },
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "transparent"
                }
            },
            "& .MuiInputLabel-root": {
                fontSize: "0.875rem"
            }
        },
        standardField: {
            "& .MuiOutlinedInput-root": {
                backgroundColor: "#fafafa",
                borderRadius: 8,
                "&:hover": {
                    backgroundColor: "#f5f5f5"
                },
                "&.Mui-focused": {
                    backgroundColor: "#ffffff"
                }
            }
        }
    },

    // List & Data Display Patterns
    lists: {
        container: {
            backgroundColor: "#ffffff",
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            overflow: "hidden"
        },
        item: {
            padding: "12px 16px",
            borderBottom: "1px solid #f5f5f5",
            cursor: "pointer",
            transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
                backgroundColor: "#f8f9fa"
            },
            "&:last-child": {
                borderBottom: "none"
            }
        },
        itemSelected: {
            backgroundColor: "rgba(25, 118, 210, 0.08)",
            borderLeft: "3px solid #1976d2",
            "&:hover": {
                backgroundColor: "rgba(25, 118, 210, 0.12)"
            }
        },
        itemDisabled: {
            opacity: 0.6,
            cursor: "not-allowed",
            "&:hover": {
                backgroundColor: "transparent"
            }
        }
    },

    // Status & Indicator Patterns
    status: {
        dot: {
            width: 8,
            height: 8,
            borderRadius: "50%",
            display: "inline-block",
            marginRight: 8
        },
        dotSuccess: {
            backgroundColor: "#4caf50"
        },
        dotWarning: {
            backgroundColor: "#ff9800"
        },
        dotError: {
            backgroundColor: "#f44336"
        },
        dotInfo: {
            backgroundColor: "#2196f3"
        },
        chip: {
            borderRadius: 16,
            fontSize: "0.75rem",
            fontWeight: 500,
            padding: "4px 12px",
            height: "auto"
        },
        chipSuccess: {
            backgroundColor: "rgba(76, 175, 80, 0.1)",
            color: "#2e7d32"
        },
        chipWarning: {
            backgroundColor: "rgba(255, 152, 0, 0.1)",
            color: "#e65100"
        },
        chipError: {
            backgroundColor: "rgba(244, 67, 54, 0.1)",
            color: "#c62828"
        },
        chipInfo: {
            backgroundColor: "rgba(33, 150, 243, 0.1)",
            color: "#1565c0"
        }
    },

    // Table Patterns
    tables: {
        container: {
            backgroundColor: "#ffffff",
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            overflow: "hidden"
        },
        header: {
            backgroundColor: "#f8f9fa",
            "& .MuiTableCell-head": {
                fontWeight: 600,
                color: "rgba(0, 0, 0, 0.87)",
                fontSize: "0.875rem",
                padding: "16px",
                borderBottom: "1px solid #e0e0e0"
            }
        },
        row: {
            "&:nth-of-type(even)": {
                backgroundColor: "#fafafa"
            },
            "&:hover": {
                backgroundColor: "#f5f5f5"
            }
        },
        cell: {
            padding: "12px 16px",
            fontSize: "0.875rem",
            borderBottom: "1px solid #f0f0f0"
        }
    },

    // Accordion Patterns
    accordions: {
        container: {
            backgroundColor: "#ffffff",
            borderRadius: 8,
            border: "1px solid #e0e0e0",
            marginBottom: 8,
            overflow: "hidden",
            "&:before": {
                display: "none"
            }
        },
        summary: {
            backgroundColor: "#f8f9fa",
            fontWeight: 500,
            padding: "16px 20px",
            "&.Mui-expanded": {
                backgroundColor: "#f0f0f0"
            }
        },
        details: {
            padding: "20px",
            borderTop: "1px solid #e0e0e0"
        }
    },

    // Empty & Loading States
    states: {
        empty: {
            textAlign: "center",
            padding: "48px 24px",
            color: "rgba(0, 0, 0, 0.6)"
        },
        emptyIcon: {
            fontSize: "48px",
            color: "rgba(0, 0, 0, 0.3)",
            marginBottom: "16px"
        },
        loading: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px"
        },
        error: {
            backgroundColor: "rgba(244, 67, 54, 0.05)",
            border: "1px solid rgba(244, 67, 54, 0.2)",
            borderRadius: 8,
            padding: "16px",
            color: "#c62828"
        }
    },

    // Navigation Patterns
    navigation: {
        tab: {
            textTransform: "none",
            fontWeight: 500,
            fontSize: "0.875rem",
            minHeight: "48px",
            padding: "12px 16px"
        },
        menu: {
            backgroundColor: "#ffffff",
            borderRadius: 8,
            boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(0, 0, 0, 0.08)",
            marginTop: 4
        },
        menuItem: {
            padding: "10px 16px",
            fontSize: "0.875rem",
            "&:hover": {
                backgroundColor: "#f8f9fa"
            }
        }
    },

    // Spacing Utilities
    spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
        xxl: 48
    },

    // Text Utilities
    text: {
        bold: {
            fontWeight: 600
        },
        medium: {
            fontWeight: 500
        },
        muted: {
            color: "rgba(0, 0, 0, 0.6)"
        },
        small: {
            fontSize: "0.75rem"
        },
        ellipsis: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap"
        },
        center: {
            textAlign: "center"
        },
        uppercase: {
            textTransform: "uppercase",
            letterSpacing: "0.5px"
        }
    },

    // Flex Utilities
    flex: {
        row: {
            display: "flex",
            flexDirection: "row"
        },
        column: {
            display: "flex",
            flexDirection: "column"
        },
        center: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        between: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
        },
        around: {
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center"
        },
        start: {
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
        },
        end: {
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center"
        },
        wrap: {
            flexWrap: "wrap"
        },
        grow: {
            flexGrow: 1
        },
        shrink: {
            flexShrink: 1
        }
    },

    // Animation & Transition Utilities
    animations: {
        fadeIn: {
            animation: "fadeIn 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        },
        slideUp: {
            animation: "slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        },
        smoothTransition: {
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        }
    },

    // Shadow Utilities
    shadows: {
        none: "none",
        sm: "0 1px 3px rgba(0, 0, 0, 0.08)",
        md: "0 2px 6px rgba(0, 0, 0, 0.12)",
        lg: "0 4px 12px rgba(0, 0, 0, 0.15)",
        xl: "0 8px 24px rgba(0, 0, 0, 0.18)"
    },

    // Border Utilities
    borders: {
        light: "1px solid #e0e0e0",
        medium: "1px solid #bdbdbd",
        top: {
            borderTop: "1px solid #e0e0e0"
        },
        bottom: {
            borderBottom: "1px solid #e0e0e0"
        },
        left: {
            borderLeft: "1px solid #e0e0e0"
        },
        right: {
            borderRight: "1px solid #e0e0e0"
        }
    }
};

export default designSystem;
