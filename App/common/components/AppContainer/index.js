import React from "react";
import { Box } from "@mui/material";

export default ({ children }) => {
    return (
        <Box
            sx={{
                padding: "1rem 0",
                background: "#fff",
                borderRadius: ".3rem",
                height: 600,
                width: "100%"
            }}
        >
            {children}
        </Box>
    );
};
