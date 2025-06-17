import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../../Store/actions";
import { List, ListItem, Popover } from "@mui/material/";

import IPA from "../IPA";
import Isolation from "./Isolation";
import Syllables from "./Syllables";
import SingleWord from "./SingleWord";
import Phrase from "./Phrase";
import SingleSentence from "./SingleSentence";
import Sentences from "./Sentences";

import styles from "./styles.js";

const Targets = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const [IPASelected, setIPASelected] = useState({ index: 0, ipa: "" });

    const { targets } = useSelector((state) => state);

    const hdlPopoverOpen = (index, ipaId) => (event) => {
        setIPASelected({ index, ipa: ipaId });
        setAnchorEl(event.currentTarget);
    };

    const hdlPopoverClose = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const hdlSymbolClick = (symbol) => () => {
        const currentMapped = targets.item.block[IPASelected.index].mapped;
        currentMapped[IPASelected.ipa] = symbol;

        dispatch(
            actions.targets.create.itemUpdateEntry(
                IPASelected.index,
                currentMapped
            )
        );
        setAnchorEl(null);
    };

    const getTargetsList = (entry) => {
        if (Object.keys(targets.item).length > 0) {
            const { type } = targets.item;

            const exercise = {
                1: <Isolation entry={entry} hdlPopoverOpen={hdlPopoverOpen} />,
                2: <Syllables entry={entry} hdlPopoverOpen={hdlPopoverOpen} />,
                3: <SingleWord entry={entry} hdlPopoverOpen={hdlPopoverOpen} />,
                4: <Phrase entry={entry} hdlPopoverOpen={hdlPopoverOpen} />,
                5: (
                    <SingleSentence
                        entry={entry}
                        hdlPopoverOpen={hdlPopoverOpen}
                    />
                ),
                6: <Sentences entry={entry} hdlPopoverOpen={hdlPopoverOpen} />
            };
            return exercise[type];
        }
    };

    return (
        <List sx={{ padding: "2rem 1rem" }}>
            {Object.keys(targets.item).length > 0 &&
                targets.item.block.map((entry, index) => {
                    return (
                        <ListItem
                            key={index}
                            disablePadding
                            sx={{
                                borderRadius: ".3rem",
                                border: "1px solid #ccc",
                                padding: ".5rem 1rem",
                                margin: ".4rem 0 ",
                                fontSize: "1.5rem",
                                color: "#999"
                            }}
                        >
                            {getTargetsList(entry)}
                        </ListItem>
                    );
                })}

            <Popover
                id={id}
                open={openPopover}
                anchorEl={anchorEl}
                onClose={hdlPopoverClose}
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
                sx={styles.ipaWrp}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left"
                }}
            >
                <IPA hdlSymbolClick={hdlSymbolClick} />
            </Popover>
        </List>
    );
};

export default Targets;
