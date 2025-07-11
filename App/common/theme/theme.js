import { createTheme } from "@mui/material/styles";

// Professional medical-grade color palette
const medicalColors = {
    primary: {
        main: "#1976d2", // Professional blue
        light: "#42a5f5",
        dark: "#1565c0",
        contrastText: "#ffffff"
    },
    secondary: {
        main: "#455a64", // Professional gray-blue
        light: "#78909c",
        dark: "#263238",
        contrastText: "#ffffff"
    },
    success: {
        main: "#4caf50", // Medical green
        light: "#81c784",
        dark: "#388e3c",
        contrastText: "#ffffff"
    },
    warning: {
        main: "#ff9800", // Medical amber
        light: "#ffb74d",
        dark: "#f57c00",
        contrastText: "rgba(0, 0, 0, 0.87)"
    },
    error: {
        main: "#f44336", // Medical red
        light: "#e57373",
        dark: "#d32f2f",
        contrastText: "#ffffff"
    },
    info: {
        main: "#2196f3", // Information blue
        light: "#64b5f6",
        dark: "#1976d2",
        contrastText: "#ffffff"
    },
    background: {
        default: "#fafafa",
        paper: "#ffffff"
    },
    text: {
        primary: "rgba(0, 0, 0, 0.87)",
        secondary: "rgba(0, 0, 0, 0.6)",
        disabled: "rgba(0, 0, 0, 0.38)"
    },
    grey: {
        50: "#fafafa",
        100: "#f5f5f5",
        200: "#eeeeee",
        300: "#e0e0e0",
        400: "#bdbdbd",
        500: "#9e9e9e",
        600: "#757575",
        700: "#616161",
        800: "#424242",
        900: "#212121"
    }
};

// Professional typography with medical standards
const medicalTypography = {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
        fontSize: "2.5rem",
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: "-0.01562em"
    },
    h2: {
        fontSize: "2rem",
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: "-0.00833em"
    },
    h3: {
        fontSize: "1.75rem",
        fontWeight: 600,
        lineHeight: 1.2,
        letterSpacing: "0em"
    },
    h4: {
        fontSize: "1.5rem",
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: "0.00735em"
    },
    h5: {
        fontSize: "1.25rem",
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: "0em"
    },
    h6: {
        fontSize: "1.125rem",
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: "0.0075em"
    },
    body1: {
        fontSize: "1rem",
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em"
    },
    body2: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: "0.01071em"
    },
    subtitle1: {
        fontSize: "1rem",
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: "0.00938em"
    },
    subtitle2: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: "0.00714em"
    },
    button: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "none" // Professional appearance
    },
    caption: {
        fontSize: "0.75rem",
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: "0.03333em"
    },
    overline: {
        fontSize: "0.75rem",
        fontWeight: 500,
        lineHeight: 2.66,
        letterSpacing: "0.08333em"
    }
};

// Professional component overrides for medical applications
const medicalComponents = {
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 8,
                padding: "8px 16px"
            },
            contained: {
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)"
            }
        }
    },
    MuiCard: {
        styleOverrides: {
            root: {
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
            }
        }
    },
    MuiTextField: {
        styleOverrides: {
            root: {
                backgroundColor: "#fafafa"
            }
        }
    },
    MuiAccordion: {
        styleOverrides: {
            root: {
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
                borderRadius: 8,
                "&:before": {
                    display: "none"
                },
                "&.Mui-expanded": {
                    margin: 0
                }
            }
        }
    },
    MuiAccordionSummary: {
        styleOverrides: {
            root: {
                borderRadius: 8,
                minHeight: 56,
                "&.Mui-expanded": {
                    minHeight: 56
                }
            },
            content: {
                "&.Mui-expanded": {
                    margin: "12px 0"
                }
            }
        }
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                borderRadius: 8
            },
            elevation1: {
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)"
            },
            elevation2: {
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.12)"
            },
            elevation4: {
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
            }
        }
    },
    MuiChip: {
        styleOverrides: {
            root: {
                borderRadius: 16,
                fontWeight: 500
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            head: {
                backgroundColor: "#f8f9fa",
                fontWeight: 600,
                color: "rgba(0, 0, 0, 0.87)"
            }
        }
    },
    MuiAppBar: {
        styleOverrides: {
            root: {
                borderRadius: 0, // Remove rounded corners from top bar
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.12)"
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: {
                borderRight: "1px solid rgba(0, 0, 0, 0.08)"
            }
        }
    },
    // Simplified DataGrid styling for better performance
    MuiDataGrid: {
        styleOverrides: {
            root: {
                border: "none"
            },
            columnHeaders: {
                backgroundColor: "#f8f9fa",
                borderBottom: "1px solid rgba(0, 0, 0, 0.08)"
            }
        }
    }
};

// Create the professional medical theme
const theme = createTheme({
    palette: medicalColors,
    typography: medicalTypography,
    components: medicalComponents,
    shape: {
        borderRadius: 8
    },
    spacing: 8,
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },
    // Optimized shadows array - only essential elevations for better performance
    shadows: [
        "none",
        "0 1px 3px rgba(0, 0, 0, 0.08)",
        "0 2px 6px rgba(0, 0, 0, 0.12)",
        "0 3px 8px rgba(0, 0, 0, 0.15)",
        "0 4px 12px rgba(0, 0, 0, 0.15)",
        "0 6px 16px rgba(0, 0, 0, 0.18)",
        "0 8px 20px rgba(0, 0, 0, 0.18)",
        "0 12px 24px rgba(0, 0, 0, 0.20)",
        "0 16px 32px rgba(0, 0, 0, 0.22)",
        "0 20px 40px rgba(0, 0, 0, 0.24)"
    ]
});

// Legacy properties for backward compatibility with existing code
theme.tabButtons = {
    background: "linear-gradient(to right, #2196f3, #21cbf3)",
    color: "#fff",
    borderRadius: 25
};

theme.darkBackground = {
    backgroundColor: "#263238",
    color: "#ffffff"
};

theme.lightBackground = {
    backgroundColor: "#fafafa",
    color: "rgba(0, 0, 0, 0.87)"
};

theme.card = {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.08)"
};

theme.button = {
    textTransform: "none",
    fontWeight: 500,
    borderRadius: 8
};

export default theme;
