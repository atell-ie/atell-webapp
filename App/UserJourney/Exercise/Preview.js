import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Popover } from "@mui/material/";

import video from "../../Store/tasks/TestData/TestVideo.mp4";
import styles from "./styles.js";

const Preview = ({ entry }) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);

    const hdlPopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const hdlPopoverClose = () => {
        setAnchorEl(null);
    };

    const openPopover = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    return (
        <Grid container sx={{ padding: "1rem" }}>
            <Grid item xs={12} sx={styles.mediaWrp}>
                {/* <img src={entry.media} sx={styles.media} />

                <Typography sx={styles.mediaText}>
                    tap an image to hear the original sound
                </Typography> */}
            </Grid>
            <Grid item xs={12}>
                <Box>
                    <div>{`Media content for:`}</div>
                    <div
                        onClick={hdlPopoverOpen}
                        style={{ color: "#333", fontWeight: "bold" }}
                    >
                        {entry.text}
                    </div>
                </Box>
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
                    <img src={entry.media} sx={styles.media} />
                </Popover>
            </Grid>
            <Grid item xs={12} sx={styles.dataWrp}>
                <video
                    width="700"
                    height="400"
                    controls
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: ".3rem"
                    }}
                >
                    <source src={video} type="video/mp4" />
                    Sorry, your browser doesn't support videos.
                </video>
            </Grid>
        </Grid>
    );
};

export default Preview;
