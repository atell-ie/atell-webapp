import React from "react";
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Box,
    Typography,
    Chip,
    Paper
} from "@mui/material";
import { format } from "date-fns";

const SessionSelector = ({
    label,
    selectedSession,
    onSessionChange,
    sessions
}) => {
    const formatSessionDisplay = (session) => {
        if (!session) return "";

        const date = session.created
            ? format(new Date(session.created), "MMM dd, yyyy")
            : "Unknown date";
        return `${session.name || `Session ${session.id}`} - ${date}`;
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                bgcolor: "white"
            }}
        >
            <Typography
                variant="h6"
                sx={{
                    mb: 2,
                    fontWeight: "medium",
                    color: "text.primary"
                }}
            >
                {label}
            </Typography>
            <FormControl fullWidth>
                <Select
                    value={selectedSession || ""}
                    onChange={(e) => onSessionChange(e.target.value)}
                    displayEmpty
                    sx={{
                        minHeight: 56,
                        "& .MuiSelect-select": {
                            py: 2,
                            px: 2
                        }
                    }}
                    renderValue={(selected) => {
                        if (!selected) {
                            return (
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ fontStyle: "italic" }}
                                >
                                    Choose a session...
                                </Typography>
                            );
                        }
                        const session = sessions.find((s) => s.id === selected);
                        return session ? (
                            <Typography variant="body1">
                                {session.name || `Session ${session.id}`}
                            </Typography>
                        ) : (
                            ""
                        );
                    }}
                >
                    {sessions.map((session) => (
                        <MenuItem
                            key={session.id}
                            value={session.id}
                            sx={{ py: 2 }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "flex-start",
                                    width: "100%"
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{ fontWeight: "medium" }}
                                >
                                    {session.name || `Session ${session.id}`}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{ mt: 0.5 }}
                                >
                                    {session.created
                                        ? (() => {
                                              try {
                                                  const date = new Date(
                                                      session.created
                                                  );
                                                  return !isNaN(date.getTime())
                                                      ? format(
                                                            date,
                                                            "MMM dd, yyyy 'at' HH:mm"
                                                        )
                                                      : "Invalid date";
                                              } catch (error) {
                                                  return "Date error";
                                              }
                                          })()
                                        : "No date provided"}
                                    {session.mediaLength && (
                                        <span style={{ marginLeft: "8px" }}>
                                            • {session.mediaLength}
                                        </span>
                                    )}
                                </Typography>
                                {session.wordCount && (
                                    <Chip
                                        size="small"
                                        label={`${session.wordCount} words`}
                                        sx={{
                                            mt: 1,
                                            bgcolor: "#f5f5f5",
                                            color: "text.secondary",
                                            fontSize: "0.7rem"
                                        }}
                                    />
                                )}
                            </Box>
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Paper>
    );
};

export default SessionSelector;
