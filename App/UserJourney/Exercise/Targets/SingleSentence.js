import React from "react";
import reactStringReplace from "react-string-replace";
import { ButtonGroup, Button } from "@mui/material/";
import styles from "./styles.js";

const SingleSentence = ({ entry, hdlPopoverOpen }) => {
    const Row = () => {
        return (
            <ButtonGroup
                variant="text"
                aria-label="text button group"
                sx={{ padding: "0 0.5rem" }}
            >
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

    return (
        <>
            {reactStringReplace(entry.sentence, "{?}", (match, i) => (
                <Row />
            ))}
        </>
    );
};

export default SingleSentence;
