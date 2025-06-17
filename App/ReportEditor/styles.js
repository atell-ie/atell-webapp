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
    actionBtn: {
        width: "20%"
    },
    moreOptions: {
        textAlign: "center"
    }
});
