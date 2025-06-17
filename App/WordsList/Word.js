import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./styles";

const Word = ({ word, ipa }) => {
    return (
        <Box sx={styles.wordContainer}>
            <Typography 
                variant="subtitle1" 
                sx={styles.wordText}
            >
                {word}
            </Typography>
            <Typography 
                variant="body2" 
                sx={styles.ipaText}
            >
                /{ipa}/
            </Typography>
        </Box>
    );
};

export default Word;
