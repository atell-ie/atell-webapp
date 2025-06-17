export default {
    // Layout styles
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: '1.5rem',
        maxHeight: 'calc(100vh - 100px)', // Increased space for dialog header and padding
        overflow: 'hidden'
    },
    formContent: {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: '1.5rem',
        height: '100%',
        overflow: 'hidden'
    },
    headerSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        flexShrink: 0,
        marginBottom: '1rem'
    },
    formFields: {
        display: 'flex',
        gap: '1.5rem',
    },
    mainContent: {
        display: 'flex',
        flex: 1,
        gap: '1rem',
        minHeight: 0, // Important for flex overflow
        overflow: 'hidden'
    },
    footer: {
        display: 'flex',
        flexShrink: 0 // Prevent footer from shrinking
    },

    // Form field styles
    nameField: {
        flex: 1,
        '& .MuiInputBase-root': {
            padding: '0',
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 14px',
        }
    },
    descriptionField: {
        flex: 2,
        '& .MuiInputBase-root': {
            padding: '0',
        },
        '& .MuiOutlinedInput-input': {
            padding: '12px 14px',
        }
    },

    // Panel styles
    sidePanel: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        padding: '1.5rem',
        minHeight: 0,
        backgroundColor: '#fff',
        '& .MuiListItemText-root': {
            margin: '6px 0'
        }
    },
    panelHeader: {
        marginBottom: '1.5rem',
        flexShrink: 0
    },
    panelHeaderTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        marginBottom: '1rem',
        flexShrink: 0,
        '& .MuiTypography-root': {
            lineHeight: 1.5
        }
    },
    panelHeaderControls: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flexShrink: 0 // Prevent controls from shrinking
    },
    panelContent: {
        flex: 1,
        overflow: 'auto',
        minHeight: 0 // Important for flex overflow
    },

    // Search section styles
    searchSection: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        width: '100%'
    },

    // Word card styles
    wordCard: {
        marginBottom: '0.5rem',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
        '& .MuiListItem-root': {
            padding: '8px 16px'
        }
    },
    wordItem: {
        padding: '12px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        }
    },
    wordItemContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        minWidth: 0, // Important for text truncation
        '& .MuiTypography-root': {
            minWidth: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        }
    },
    wordChip: {
        marginLeft: '0.5rem'
    },
    removeButton: {
        marginRight: '0.5rem',
    },

    // Phoneme button styles
    phonemeButton: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '8px 12px',
        minWidth: '80px',
        margin: '0.25rem',
    },

    // Grid styles
    alphabeticalGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '1rem',
    },

    // Lists wrapper
    listsWrapper: {
        display: "flex",
        flexDirection: "row",
        height: "50vh"
    },

    // Grid root
    gridRoot: {
        background: "#fff",
        padding: "0 !important",
        width: "90% !important",
        margin: "0 auto",
        border: "0 !important",
        "& .MuiDataGrid-columnSeparator": { display: "none" },
    },

    // Word component styles
    wordContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '100%',
        p: 1
    },
    wordText: {
        fontWeight: "500",
        textAlign: 'center',
        width: '100%',
        wordBreak: 'break-word'
    },
    ipaText: {
        color: "text.secondary",
        textAlign: 'center',
        width: '100%',
        wordBreak: 'break-word'
    },

    // Phoneme selection styles
    phonemeSelectionContainer: {
        mb: 3
    },
    phonemeSelectionTitle: {
        mb: 2
    },
    phonemeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: 2,
        width: '100%',
    },
    phonemePaper: {
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        cursor: 'pointer',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100px',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bdbdbd'
        }
    },
    phonemeTitle: {
        fontSize: '2rem',
        fontWeight: 500,
        marginBottom: '0.5rem',
        textAlign: 'center'
    },
    phonemeSubtitle: {
        color: 'text.secondary',
        textAlign: 'center'
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
        minWidth: '120px',
        borderColor: '#e0e0e0',
        color: 'text.primary',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bdbdbd'
        }
    },
    positionCount: {
        ml: 1,
        color: 'text.secondary'
    },

    // Word list styles
    wordListTitle: {
        mb: 2
    },
    wordGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 2
    },
    wordPaper: {
        cursor: "pointer",
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        backgroundColor: '#fff',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bdbdbd'
        }
    },
    wordTitle: {
        mb: 0.5
    },

    // Header styles
    headerContainer: {
        display: 'flex',
        alignItems: 'center',
        mb: 2
    },
    infoIcon: {
        ml: 1,
        color: 'info.main',
        fontSize: '20px'
    },
    searchIcon: {
        mr: 1,
        color: 'text.secondary'
    },

    // Group styles
    groupContainer: {
        mb: 3
    },
    groupHeader: {
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        mb: 1
    },
    badge: {
        '& .MuiBadge-badge': {
            right: -12,
        }
    },

    // Word list container
    wordListContainer: {
        overflow: 'auto',
        flex: 1,
        minHeight: 0, // Important for flex overflow
        padding: '4px'
    },

    // Phoneme content styles
    phonemeGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
        gap: 2,
        width: '100%'
    },
    phonemePaper: {
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        cursor: 'pointer',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bdbdbd'
        }
    },
    phonemeTitle: {
        mb: 0.5,
        variant: 'h6'
    },
    phonemeSubtitle: {
        variant: 'body2',
        color: 'text.secondary'
    },
    backButton: {
        mb: 2
    },
    positionButton: {
        minWidth: '120px',
        borderColor: '#e0e0e0',
        color: 'text.primary',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bdbdbd'
        }
    },
    positionCount: {
        ml: 1,
        color: 'text.secondary'
    },
    wordGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 2
    },
    wordPaper: {
        cursor: 'pointer',
        border: '1px solid #e0e0e0',
        borderRadius: 1,
        backgroundColor: '#fff',
        transition: 'all 0.2s ease',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bdbdbd'
        }
    }
};
