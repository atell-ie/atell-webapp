import React from "react";
import { Box, Typography } from "@mui/material";

const PhonemeSegment = ({ segment, status }) => {
    const getSegmentStyle = () => {
        const baseStyle = {
            minWidth: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px",
            border: "2px solid",
            fontWeight: "bold",
            fontSize: "14px",
            textAlign: "center"
        };

        // Define colors for different disorder types
        const disorderColors = [
            { bg: "#ffb74d", border: "#ff9800", text: "#e65100" }, // Orange
            { bg: "#e57373", border: "#f44336", text: "#b71c1c" }, // Red
            { bg: "#ba68c8", border: "#9c27b0", text: "#4a148c" }, // Purple
            { bg: "#64b5f6", border: "#2196f3", text: "#0d47a1" }, // Blue
            { bg: "#81c784", border: "#4caf50", text: "#1b5e20" }, // Light Green (different from correct)
            { bg: "#ffab91", border: "#ff5722", text: "#bf360c" }, // Deep Orange
            { bg: "#f06292", border: "#e91e63", text: "#880e4f" }, // Pink
            { bg: "#aed581", border: "#8bc34a", text: "#33691e" } // Lime
        ];

        if (status === "correct") {
            return {
                ...baseStyle,
                backgroundColor: "#81c784", // Light green
                borderColor: "#4caf50", // Green
                color: "#1b5e20" // Dark green text
            };
        }

        // Handle disorder1, disorder2, disorder3, etc.
        const disorderMatch = status.match(/^disorder(\d+)$/);
        if (disorderMatch) {
            const disorderIndex = parseInt(disorderMatch[1]) - 1;
            const colorIndex = disorderIndex % disorderColors.length;
            const colors = disorderColors[colorIndex];

            return {
                ...baseStyle,
                backgroundColor: colors.bg,
                borderColor: colors.border,
                color: colors.text
            };
        }

        // Default/unknown status
        return {
            ...baseStyle,
            backgroundColor: "#e0e0e0", // Light gray
            borderColor: "#9e9e9e", // Gray
            color: "#424242" // Dark gray text
        };
    };

    const getStatusLabel = () => {
        if (status === "correct") {
            return "✓";
        }

        const disorderMatch = status.match(/^disorder(\d+)$/);
        if (disorderMatch) {
            return disorderMatch[1]; // Return the disorder number
        }

        return "?";
    };

    return (
        <Box sx={getSegmentStyle()} title={`${segment} - ${status}`}>
            <Typography
                variant="body2"
                sx={{
                    fontWeight: "inherit",
                    fontSize: "inherit",
                    color: "inherit"
                }}
            >
                {segment}
            </Typography>
        </Box>
    );
};

export default PhonemeSegment;
