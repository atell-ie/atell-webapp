import * as React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Typography, Box, Paper } from "@mui/material";

import ClientForm from "./ClientForm";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
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
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`
    };
}

export default function UserDetails() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Details" {...a11yProps(0)} />
                    <Tab label="Medical history" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <Paper>
                <TabPanel value={value} index={0}>
                    <ClientForm />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Typography>User medical history</Typography>
                </TabPanel>
            </Paper>
        </Box>
    );
}
