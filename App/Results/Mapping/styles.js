export default {
    gridRoot: {
        border: "none",
        backgroundColor: "transparent",
        "& .MuiDataGrid-columnSeparator": {
            display: "none"
        },
        "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#f8f9fa",
            borderBottom: "1px solid #e8e8e8",
            borderRadius: 0,
            "& .MuiDataGrid-columnHeader": {
                fontWeight: 600,
                color: "#333",
                fontSize: "0.875rem",
                padding: "16px 20px"
            }
        },
        "& .MuiDataGrid-row": {
            backgroundColor: "#fff",
            minHeight: "64px",
            "&:nth-of-type(even)": {
                backgroundColor: "#fafafa"
            },
            "&:hover": {
                backgroundColor: "#f5f5f5"
            }
        },
        "& .MuiDataGrid-cell": {
            borderBottom: "1px solid #f0f0f0",
            fontSize: "0.875rem",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center"
        },
        "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid #e8e8e8",
            backgroundColor: "#f8f9fa",
            minHeight: "56px"
        },
        // Remove any text overflow that might cause triple dots
        "& .MuiDataGrid-cellContent": {
            overflow: "visible",
            textOverflow: "unset",
            whiteSpace: "normal"
        }
    }
};
