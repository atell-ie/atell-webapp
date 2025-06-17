import React from "react";

import { Box } from "@mui/material";

import PlayAudio from "./PlayAudio";
import styles from "./styles";

const Phonemes = ({ transcriptions, audio }) => {
    const phonemes = transcriptions.map((phoneme, index) => {
        return (
            <Box key={index} sx={styles.playAudioWrapper}>
                <PlayAudio
                    key={index}
                    label={phoneme.predictedPhone}
                    score={phoneme.qualityScore}
                    audioSource={audio}
                    start={phoneme.start}
                    end={phoneme.end}
                />
            </Box>
        );
    });

    return phonemes;
};

export default Phonemes;
