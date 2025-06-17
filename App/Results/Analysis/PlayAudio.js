import React, { useState, useEffect, useMemo, useRef } from "react";

import { Chip } from "@mui/material";

import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PauseCircleOutlineIcon from "@mui/icons-material/PauseCircleOutline";
import styles from "./styles";

// mp3 to base64
//https://base64.guru/converter/encode/audio/mp3

const PlayAudio = ({ label, audioSource, score, start, end }) => {
    const [duration, setDuration] = useState(0);
    const [isReady, setIsReady] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    const audioRef = useRef(null);
    let stopTimeout;

    useEffect(() => {
        audioRef.current = new Audio(audioSource);

        const handleEnded = () => {
            // Reset the currentTime to 0 when the audio ends
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
        };

        audioRef.current.addEventListener("ended", handleEnded);

        return () => {
            clearTimeout(stopTimeout);
            audioRef.current.removeEventListener("ended", handleEnded);
        };
    }, []);

    const endTimeout = useMemo(() => {
        return (parseFloat(end) - parseFloat(start)) * 1000;
    }, []);

    const togglePlayPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            if (start !== undefined && end !== undefined) {
                audioRef.current.currentTime = start;

                // Use setTimeout to stop the audio at the specified stop time
                stopTimeout = setTimeout(() => {
                    audioRef.current.pause();
                    setIsPlaying(false);
                }, endTimeout);
            }

            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    let background = "#edf9f2"; // default
    if (parseInt(score) > 50 && parseInt(score) < 76) background = "#ffe2b4";
    if (parseInt(score) < 50) background = " #ffb4b4";

    return (
        <>
            <Chip
                label={label}
                onDelete={togglePlayPause}
                deleteIcon={
                    isPlaying ? (
                        <PauseCircleOutlineIcon fontSize="inherit" />
                    ) : (
                        <PlayCircleOutlineIcon fontSize="inherit" />
                    )
                }
                sx={{ ...styles.audioChip, background }}
            />

            <audio
                ref={audioRef}
                preload="metadata"
                onDurationChange={(e) => setDuration(e.currentTarget.duration)}
                onCanPlay={(e) => {
                    setIsReady(true);
                }}
                onPlaying={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            >
                <source type="audio/mp3" src={audioSource} />
            </audio>
        </>
    );
};

export default PlayAudio;
