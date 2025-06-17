export default (theme) => ({
    root: {
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "auto",
        margin: theme.spacing(2),
        width: "100%"
    },
    dateContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: theme.spacing(2),
        width: "20%"
    },
    dateBox: {
        textAlign: "center",
        display: "flex",
        width: "100%",
        position: "relative"
    },
    date: {
        // margin: theme.spacing(2)
    },
    appointments: {
        marginTop: theme.spacing(2)
    },
    paper: {
        padding: theme.spacing(1),
        margin: "0.2rem 0",
        textAlign: "center"
    }
});
