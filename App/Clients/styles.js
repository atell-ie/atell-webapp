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
            background: "#fff",
            marginBottom: ".2rem"
        },
        "& .MuiDataGrid-columnSeparator": {
            display: "none !important"
        }
    }
});
