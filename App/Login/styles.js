import images from "../common/images";

export const fontSize = 22;

export default {
    buttonRoot: {
        fontSize,
        paddingBottom: 2,
        paddingTop: 2,
        borderRadius: "1rem",
        backgroundColor: "theme.palette.secondary",
        color: "theme.palette.primary"
    },
    container: {
        background: "white",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        padding: "1rem"
    },
    form: {
        position: "relative"
    },
    loginContainer: {
        display: "flex",
        flexFlow: "column",
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    loginWrapper: {
        background: "#fff",
        padding: "3rem",
        borderRadius: ".5rem"
    },
    link: {
        color: "white",
        opacity: 0.6
    },
    slideContent: {
        overflow: "hidden"
    },
    textFieldRoot: {
        background: "rgba(255, 255, 255, 0.8)",
        borderRadius: "theme.shape.borderRadius"
    }
};
