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
    flex: { display: "flex", alignItems: "center" },
    isolation: { background: "#5499C7", color: "#333" },
    syllables: { background: "#48C9B0", color: "#333" },
    singleWord: { background: "#52BE80", color: "#333" },
    phrase: { background: "#F4D03F", color: "#333" },
    singleSentence: { background: "#EB984E", color: "#333" },
    sentences: { background: "#CD6155", color: "#333" },
    disabled: { background: "#ccc", color: "#333" }
});
