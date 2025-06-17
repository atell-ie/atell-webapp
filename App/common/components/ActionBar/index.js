import React from "react";
import { AppBar, Toolbar } from "@mui/material";
import styles from "./styles";

const ActionBar = ({ children }) => {
    return (
        <AppBar position="sticky" sx={styles.appBar} elevation={0}>
            <Toolbar>{children}</Toolbar>
        </AppBar>
    );
};

export default ActionBar;
