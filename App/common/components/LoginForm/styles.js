export default (theme) => ({
    button: {
        position: "relative"
    },
    buttonProgress: {
        marginTop: theme.spacing(),
        left: "50%",
        top: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)"
    },
    loginContainer: {
        marginTop: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }
});
