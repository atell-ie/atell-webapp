import React, { useState } from "react";

import { Grid, Box, TextField, Typography } from "@mui/material/";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

import dayjs from "dayjs";

const asspointments = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "15:00",
    "16:00",
    "17:00"
];

const AppointmentDetails = () => {
    const [value, setValue] = useState(dayjs("2022-04-07"));

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography sx={{ padding: "1rem" }}>
                    Select date and time
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <StaticDatePicker
                    displayStaticWrapperAs="desktop"
                    openTo="day"
                    views={["day"]}
                    value={value}
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Grid>
            <Grid item xs={6}>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                    {asspointments.map((item) => {
                        return (
                            <Box
                                sx={{
                                    background: "#eee",
                                    padding: ".5rem 1rem",
                                    margin: ".5rem",
                                    borderRadius: ".3rem"
                                }}
                            >
                                {item}
                            </Box>
                        );
                    })}
                </Box>
            </Grid>
        </Grid>
    );
};

export default AppointmentDetails;
