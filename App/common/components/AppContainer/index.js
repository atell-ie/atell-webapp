import React from "react";
import { Box } from "@mui/material";

export default ({ children }) => {
    return (
        <Box
            sx={{
                padding: "0",
                background: "#fff",
                borderRadius: "0",
                height: 550,
                width: "100%"
            }}
        >
            {children}
        </Box>
    );
};
