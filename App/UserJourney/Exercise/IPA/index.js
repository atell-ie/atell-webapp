import React, { useState } from "react";
import PropTypes from "prop-types";
import { Box, Tabs, Tab } from "@mui/material/";

import Consonants from "./Consonants";
import Vowels from "./Vowels";
import Other from "./Other";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`
    };
}

export default ({ hdlSymbolClick }) => {
    const [value, setValue] = useState(0);

    const hdlTabsChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "background.paper"
            }}
        >
            <Tabs
                value={value}
                onChange={hdlTabsChange}
                indicatorColor="secondary"
                textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
            >
                <Tab label="Consonants" />
                <Tab label="Vowels" />
                <Tab label="Other" />
            </Tabs>
            <TabPanel
                value={value}
                index={0}
                style={{
                    background: "#eee",
                    minWidth: "1050px",
                    minHeight: "550px"
                }}
            >
                <Consonants hdlSymbolClick={hdlSymbolClick} />
            </TabPanel>
            <TabPanel
                value={value}
                index={1}
                style={{
                    background: "#eee",
                    minWidth: "1050px",
                    minHeight: "550px"
                }}
            >
                <Vowels hdlSymbolClick={hdlSymbolClick} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Other />
            </TabPanel>
        </Box>
    );
};
