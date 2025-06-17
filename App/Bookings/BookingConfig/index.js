import React, { useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import styles from "./styles";

import {
    Box,
    Grid,
    Divider,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    FormHelperText,
    TextField
} from "@mui/material/";

const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];

const initWeekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

const times = [15, 30, 45];

export default function BookingConfig() {
    const classes = makeStyles(styles)();
    const [selectedDays, setSelectedDays] = useState([]);
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");
    const [appointmentDuration, setAppointmentDuration] = useState(30);
    const [alignment, setAlignment] = useState(initWeekDays);

    const handleChange = (event, newAlignment) => {
        console.log("newAlignment", newAlignment);
        setAlignment(newAlignment);
    };

    const handleStartTimeChange = (event) => {
        setStartTime(event.target.value);
    };

    const handleEndTimeChange = (event) => {
        setEndTime(event.target.value);
    };

    const handleAppointmentDurationChange = (event) => {
        setAppointmentDuration(event.target.value);
    };

    return (
        <div>
            <Typography variant="h6">Apointments duration</Typography>
            <Typography variant="subtitle">
                How long should each appointment last
            </Typography>
            <Box sx={{ margin: "1rem .5rem" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "baseline",
                        margin: ".4rem 0"
                    }}
                >
                    <Typography variant="h6" sx={{ width: "10rem" }}>
                        Consultation
                    </Typography>
                    <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue={15}
                        variant="standard"
                    >
                        {times.map((option) => (
                            <MenuItem key={option} value={option}>
                                {`${option}min`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "baseline",
                        margin: ".4rem 0"
                    }}
                >
                    <Typography variant="h6" sx={{ width: "10rem" }}>
                        Assessment
                    </Typography>
                    <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue={15}
                        variant="standard"
                    >
                        {times.map((option) => (
                            <MenuItem key={option} value={option}>
                                {`${option}min`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "baseline",
                        margin: ".4rem 0"
                    }}
                >
                    <Typography variant="h6" sx={{ width: "10rem" }}>
                        Therapy
                    </Typography>
                    <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue={15}
                        variant="standard"
                    >
                        {times.map((option) => (
                            <MenuItem key={option} value={option}>
                                {`${option}min`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "baseline",
                        margin: ".4rem 0"
                    }}
                >
                    <Typography variant="h6" sx={{ width: "10rem" }}>
                        Buffer/Break
                    </Typography>
                    <TextField
                        id="outlined-select-currency"
                        select
                        defaultValue={15}
                        variant="standard"
                    >
                        {times.map((option) => (
                            <MenuItem key={option} value={option}>
                                {`${option}min`}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Box>
            <Divider sx={{ marginBottom: "1rem" }} />
            <Typography variant="h6">Availability</Typography>
            <Typography variant="subtitle">
                Set your weekly working hours
            </Typography>
            <Box sx={{ margin: "1rem 0.5rem" }}>
                <ToggleButtonGroup
                    color="primary"
                    value={alignment}
                    onChange={handleChange}
                    aria-label="weekdays"
                    sx={{ marginBottom: "1.5rem" }}
                >
                    <ToggleButton value="MON" className={classes.toggleButton}>
                        M
                    </ToggleButton>
                    <ToggleButton value="TUE" className={classes.toggleButton}>
                        T
                    </ToggleButton>
                    <ToggleButton value="WED" className={classes.toggleButton}>
                        W
                    </ToggleButton>
                    <ToggleButton value="THU" className={classes.toggleButton}>
                        T
                    </ToggleButton>
                    <ToggleButton value="FRI" className={classes.toggleButton}>
                        F
                    </ToggleButton>
                    <ToggleButton value="SAT" className={classes.toggleButton}>
                        S
                    </ToggleButton>
                    <ToggleButton value="SUN" className={classes.toggleButton}>
                        S
                    </ToggleButton>
                </ToggleButtonGroup>

                <Grid container>
                    {weekdays.map((weekday) => {
                        return (
                            <>
                                <Grid item xs={2} sx={{ alignSelf: "center" }}>
                                    <Typography variant="h6">
                                        {weekday}
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={4}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        margin: "0.2rem 0"
                                    }}
                                >
                                    <TextField
                                        id={`${weekday}-start-time`}
                                        type="time"
                                        value={startTime}
                                        onChange={handleStartTimeChange}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        size="small"
                                    />
                                    <Typography
                                        variant="h6"
                                        component="span"
                                        sx={{ margin: "0 1rem" }}
                                    >
                                        to
                                    </Typography>
                                    <TextField
                                        id={`${weekday}-end-time`}
                                        type="time"
                                        value={endTime}
                                        onChange={handleEndTimeChange}
                                        InputLabelProps={{
                                            shrink: true
                                        }}
                                        size="small"
                                    />
                                </Grid>
                                <Grid item xs={6} />
                            </>
                        );
                    })}
                </Grid>
            </Box>
        </div>
    );
}
