import React, { useRef, useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import StopIcon from "@mui/icons-material/Stop";

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AudioPlayer = ({
    mediaUrl,
    fileName,
    playId,
    showFileName = true,
    showTime = true,
    showStopButton = true,
    startTime = null,
    endTime = null,
    size = "small",
    color = "primary"
}) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentUrl, setCurrentUrl] = useState(null);
    const [timeoutId, setTimeoutId] = useState(null);

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            if (audioRef.current) {
                audioRef.current.pause();
            }
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        };
    }, [timeoutId]);

    const setupAudioListeners = (audio) => {
        audio.addEventListener("timeupdate", () => {
            const relativeTime = startTime
                ? audio.currentTime - parseFloat(startTime)
                : audio.currentTime;
            setCurrentTime(relativeTime);

            // Stop at endTime if specified
            if (endTime && audio.currentTime >= parseFloat(endTime)) {
                audio.pause();
                setIsPlaying(false);
                setCurrentTime(0);
            }
        });

        audio.addEventListener("loadedmetadata", () => {
            const totalDuration = endTime
                ? parseFloat(endTime) - (startTime ? parseFloat(startTime) : 0)
                : audio.duration;
            setDuration(totalDuration);
        });

        audio.addEventListener("ended", () => {
            setIsPlaying(false);
            setCurrentTime(0);
        });
    };

    const handlePlayAudio = () => {
        if (!audioRef.current || currentUrl !== mediaUrl) {
            // Create new audio element if it doesn't exist or if it's a different track
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const audio = new Audio(mediaUrl);
            audioRef.current = audio;
            setCurrentUrl(mediaUrl);
            setupAudioListeners(audio);

            // Set start time if specified
            if (startTime) {
                audio.currentTime = parseFloat(startTime);
            }

            audio.play();
            setIsPlaying(true);
        } else {
            // Toggle play/pause for existing audio
            if (audioRef.current.paused) {
                // Reset to start time if specified
                if (startTime) {
                    audioRef.current.currentTime = parseFloat(startTime);
                }
                audioRef.current.play();
                setIsPlaying(true);
            } else {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const handleStopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            if (startTime) {
                audioRef.current.currentTime = parseFloat(startTime);
            } else {
                audioRef.current.currentTime = 0;
            }
            setIsPlaying(false);
            setCurrentTime(0);
        }
    };

    const displayFileName =
        fileName || mediaUrl?.split("/").pop() || "Audio File";

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton size={size} onClick={handlePlayAudio} color={color}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </IconButton>

            {showStopButton && (
                <IconButton
                    size={size}
                    onClick={handleStopAudio}
                    color={color}
                    disabled={!isPlaying}
                >
                    <StopIcon />
                </IconButton>
            )}

            {(showFileName || showTime) && (
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        minWidth: 0
                    }}
                >
                    {showFileName && (
                        <Typography
                            variant="body2"
                            sx={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap"
                            }}
                        >
                            {displayFileName}
                        </Typography>
                    )}
                    {showTime && isPlaying && (
                        <Typography variant="caption" color="text.secondary">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </Typography>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default AudioPlayer;
