import React, { useRef, useState, useEffect } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const useColumns = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [playingId, setPlayingId] = useState(null);
    const [currentUrl, setCurrentUrl] = useState(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            if (audioRef.current) {
                audioRef.current.pause();
            }
        };
    }, []);

    const setupAudioListeners = (audio) => {
        audio.addEventListener('timeupdate', () => {
            setCurrentTime(audio.currentTime);
        });
        
        audio.addEventListener('loadedmetadata', () => {
            setDuration(audio.duration);
        });

        audio.addEventListener('ended', () => {
            setPlayingId(null);
            setCurrentTime(0);
        });
    };

    const handlePlayAudio = (mediaUrl, sessionId) => () => {
        if (!audioRef.current || currentUrl !== mediaUrl) {
            // Create new audio element if it doesn't exist or if it's a different track
            if (audioRef.current) {
                audioRef.current.pause();
            }
            const audio = new Audio(mediaUrl);
            audioRef.current = audio;
            setCurrentUrl(mediaUrl);
            setupAudioListeners(audio);
            audio.play();
            setPlayingId(sessionId);
        } else {
            // Toggle play/pause for existing audio
            if (audioRef.current.paused) {
                audioRef.current.play();
                setPlayingId(sessionId);
            } else {
                audioRef.current.pause();
                setPlayingId(null);
            }
        }
    };

    const handleStopAudio = (sessionId) => () => {
        if (audioRef.current && playingId === sessionId) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setPlayingId(null);
            setCurrentTime(0);
        }
    };

    const columns = [
        {
            field: "sessionDate",
            headerName: "Date",
            minWidth: 180,
            renderCell: (params) => {
                return dayjs(params.value).format("MMM D, YYYY HH:mm");
            }
        },
        {
            field: "mediaFile",
            headerName: "Recording",
            minWidth: 300,
            flex: 1,
            renderCell: (params) => {
                const mediaFile = params.value;
                const isPlaying = playingId === params.row.id;
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <IconButton 
                            size="small" 
                            onClick={handlePlayAudio(mediaFile.mediaFile, params.row.id)}
                            color="primary"
                        >
                            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                        </IconButton>
                        <IconButton
                            size="small"
                            onClick={handleStopAudio(params.row.id)}
                            color="primary"
                            disabled={!isPlaying}
                        >
                            <StopIcon />
                        </IconButton>
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography variant="body2">
                                {mediaFile.friendlyName || mediaFile.mediaFile.split('/').pop()}
                            </Typography>
                            {isPlaying && (
                                <Typography variant="caption" color="text.secondary">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                );
            }
        },
        {
            field: "length",
            headerName: "Duration",
            minWidth: 120,
            renderCell: (params) => {
                return params.row.mediaFile.length;
            }
        },
        {
            field: "actions",
            headerName: "Actions",
            minWidth: 140,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => {
                return (
                    <Button
                        variant="text"
                        size="small"
                        startIcon={<AnalyticsIcon />}
                        onClick={() => navigate(`/auth/results/${params.row.id}/mapping`)}
                    >
                        View Analysis
                    </Button>
                );
            }
        }
    ];

    return columns;
};

export default useColumns;

