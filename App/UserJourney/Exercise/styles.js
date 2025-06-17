export default {
    clientHeader: {
        textAlign: "right",
        marginBottom: "2rem"
    },
    dataGridRoot: {
        border: 0,
        "& .MuiDataGrid-columnHeaders": {
            background: "#fff"
        },
        "& .MuiDataGrid-row": {
            background: "#fff"
        },
        "& .MuiDataGrid-columnSeparator": {
            display: "none !important"
        },
        "& .MuiTablePagination-toolbar": {
            display: "none !important"
        },
        "& .selected-row": {
            background: "#ccc"
            // '&:hover': {
            //   bgcolor: (theme) =>
            //     getHoverBackgroundColor(theme.palette.info.main, theme.palette.mode),
            // },
        }
    },
    mediaWrp: {
        width: "100%",
        display: "flex",
        flexFlow: "row",
        justifyContent: "center"
    },
    media: { maxWidth: "500px" },
    mediaText: { alignSelf: "center" },
    dataWrp: {
        justifyContent: "center",
        display: "flex",
        flexFlow: "row"
    },
    data: { width: "100%", width: "80%", margin: "0 1rem" },
    ipaWrp: { textAlign: "center" },
    entrySwitch: { alignSelf: "center" },
    actionBtn: {
        width: "20%"
    },
    // Summary screen
    tBody: {
        height: "32rem",
        overflowY: "scroll"
    },
    paper: {
        height: "32rem",
        padding: "2rem",
        height: "100%",
        // margin: "1rem",
        overflowY: "scroll"
    },
    soundLetter: {
        fontSize: "1.5rem",
        padding: "0 1rem"
    }
};
