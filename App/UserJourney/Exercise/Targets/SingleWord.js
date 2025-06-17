import React from "react";
import { ButtonGroup, Button } from "@mui/material/";
import styles from "./styles.js";

const SingleWord = ({ entry, hdlPopoverOpen }) => {
    return (
        <ButtonGroup variant="text" aria-label="text button group">
            {Object.keys(entry.target).map((sound, index) => {
                return (
                    <Button
                        key={index}
                        onClick={hdlPopoverOpen(entry.index, sound)}
                        sx={{
                            ...styles.soundLetter,
                            color: entry.mapped[sound] ? "#de7f0b" : "#000"
                        }}
                    >
                        {entry.mapped[sound] ? entry.mapped[sound] : sound}
                    </Button>
                );
            })}
        </ButtonGroup>
    );
};

export default SingleWord;
