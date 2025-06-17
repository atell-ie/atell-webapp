import React, { useState } from "react";
import { Box, Typography, Button, Collapse, IconButton } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import PhonemeSegment from "./PhonemeSegment";

const ComparisonLegend = ({ disorderSubcategories }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // Generate legend items dynamically based on disorder data
    const generateLegendItems = () => {
        const items = [{ segment: "ex", status: "correct", label: "Correct" }];

        // Add disorder items if data is available
        if (disorderSubcategories?.data) {
            disorderSubcategories.data.forEach((disorder, index) => {
                items.push({
                    segment: "ex",
                    status: `disorder${index + 1}`,
                    label: disorder.name || `Disorder ${index + 1}`
                });
            });
        }

        return items;
    };

    const legendItems = generateLegendItems();

    return (
        <Box
            sx={{
                p: 1,
                bgcolor: "#f8f8f8",
                borderRadius: 1,
                border: "1px solid #e8e8e8"
            }}
        >
            {/* Compact trigger */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    cursor: "pointer"
                }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <HelpOutlineIcon
                    sx={{
                        fontSize: 16,
                        color: "text.secondary"
                    }}
                />
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: "0.75rem" }}
                >
                    Phoneme Status Legend
                </Typography>
                <IconButton size="small" sx={{ p: 0.25, ml: "auto" }}>
                    {isExpanded ? (
                        <ExpandLessIcon sx={{ fontSize: 14 }} />
                    ) : (
                        <ExpandMoreIcon sx={{ fontSize: 14 }} />
                    )}
                </IconButton>
            </Box>

            {/* Expandable legend content */}
            <Collapse in={isExpanded}>
                <Box
                    sx={{
                        mt: 1,
                        pt: 1,
                        borderTop: "1px solid #e0e0e0",
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap"
                    }}
                >
                    {legendItems.map((item, index) => (
                        <Box
                            key={index}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5
                            }}
                        >
                            <PhonemeSegment
                                segment={item.segment}
                                status={item.status}
                            />
                            <Typography
                                variant="caption"
                                sx={{ fontSize: "0.7rem" }}
                            >
                                {item.label}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Collapse>
        </Box>
    );
};

export default ComparisonLegend;
