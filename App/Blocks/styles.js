export default (theme) => ({
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
        }
    },
    accordSummary: {
        borderBottom: "1px solid #ccc",
        padding: ".5rem 1rem"
    },
    accordDetails: {
        background: "#fcfcfc"
    },
    stepWrapper: {
        padding: "1rem",
        border: "1px solid #eee",
        background: "#ddd",
        borderRadius: "0.5rem",
        margin: "0.1rem 0"
    }
});
