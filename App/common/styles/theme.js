import { createTheme } from "@mui/material/styles";
import colors from "./colors";
const {
    black,
    blue,
    darkGrey,
    darkGreyText,
    lightGrey,
    lightGreen,
    emerald,
    green,
    red,
    white,
    yellow
} = colors;

const theme = createTheme({
    typography: {
        allVariants: {
            color: black
        }
    },
    transitions: {
        easing: {
            // This is the most common easing curve.
            easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
            // Objects enter the screen at full velocity from off-screen and
            // slowly decelerate to a resting point.
            easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
            // Objects leave the screen at full velocity. They do not decelerate when off-screen.
            easeIn: "cubic-bezier(0.4, 0, 1, 1)",
            // The sharp curve is used by objects that may return to the screen at any time.
            sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
        },
        duration: {
            shortest: 150,
            shorter: 200,
            short: 250,
            // most basic recommended timing
            standard: 300,
            // this is to be used in complex animations
            complex: 375,
            // recommended when something is entering screen
            enteringScreen: 225,
            // recommended when something is leaving screen
            leavingScreen: 195
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },
    palette: {
        type: "light",
        primary: {
            main: blue,
            contrastText: white,
            darkBackground: black,
            greyBackground: lightGrey,
            lightBackground: white,
            darkBorder: darkGrey,
            lightBorder: lightGrey
        },
        secondary: {
            main: darkGrey
        },
        tabButtons: {
            active: blue,
            activeText: white,
            default: lightGrey,
            defaultText: black
        },
        text: {
            secondary: black,
            darkText: darkGreyText,
            contrastText: white
        },
        success: {
            main: green
        },
        info: {
            main: blue
        },
        warning: {
            main: yellow
        },
        error: {
            main: red
        }
    },
    props: {
        MuiTooltip: {
            arrow: true
        },
        MuiButton: {
            size: "small"
        },
        MuiButtonGroup: {
            size: "small"
        },
        MuiCheckbox: {
            size: "small"
        },
        MuiFab: {
            size: "small"
        },
        MuiFormControl: {
            margin: "dense",
            size: "small"
        },
        MuiFormHelperText: {
            margin: "dense"
        },
        MuiIconButton: {
            size: "small"
        },
        MuiInputBase: {
            margin: "dense"
        },
        MuiInputLabel: {
            margin: "dense"
        },
        MuiRadio: {
            size: "small"
        },
        MuiSwitch: {
            size: "small"
        },
        MuiTextField: {
            margin: "dense",
            size: "small"
        },
        MuiList: {
            dense: true
        },
        MuiMenuItem: {
            dense: true
        },
        MuiTable: {
            size: "small"
        }
    }
});

export default theme;
