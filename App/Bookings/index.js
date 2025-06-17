import React, { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import * as Sentry from "@sentry/react";
import actions from "../Store/actions";
import { useNavigate } from "react-router-dom";
import {
    IconButton,
    ListItem,
    ListItemText,
    Button,
    Paper,
    Box,
    Grid,
    Typography
} from "@mui/material/";
import makeStyles from "@mui/styles/makeStyles";
import { useTranslation } from "react-i18next";
import styles from "./styles.js";

import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import SettingsIcon from "@mui/icons-material/Settings";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import isBetweenPlugin from "dayjs/plugin/isBetween";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";

import dayjs from "dayjs";
dayjs.extend(isBetweenPlugin);

import AppDialog from "../common/components/AppDialog";
import NewBooking from "./NewBooking";

const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const visibleDays = 5;

const CustomPickersDay = styled(PickersDay, {
    shouldForwardProp: (prop) => prop !== "booked" && prop !== "selected"
})(({ theme, booked, selected }) => ({
    ...(booked && {
        borderRadius: "50%",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        "&:hover, &:focus": {
            backgroundColor: theme.palette.primary.dark
        }
    }),
    ...(selected && {
        borderRadius: "50%",
        backgroundColor: "#ccc",
        color: theme.palette.common.white
    })
}));

const Bookings = () => {
    let navigate = useNavigate();
    const { t } = useTranslation();
    const classes = makeStyles(styles)();
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const { bookings } = useSelector((state) => state);
    // const toast = useToaster();
    const dispatch = useDispatch();
    // const classes = makeStyles(styles)();
    const [value, setValue] = useState(dayjs("2022-04-07")); //.format("DD/MM/YYYY")
    const [values, setValues] = useState([
        dayjs("2022-04-22"),
        dayjs("2022-04-24"),
        dayjs("2022-04-28")
    ]);
    const [showCalendar, setShowCalendar] = useState(false);

    const [dates, setDates] = useState([
        "2022-06-01",
        "2022-06-02",
        "2022-06-03",
        "2022-06-04",
        "2022-06-05"
    ]);

    const findDate = (date) => {
        return values.find((item) => item.isSame(date, "day"));
    };

    const renderPickerDay = (date, selectedDates, pickersDayProps) => {
        if (!values) {
            return <PickersDay {...pickersDayProps} />;
        }

        let dt = dayjs(date);

        const booked = findDate(dt);
        const selected = value.isSame(dt, "day");

        return (
            <CustomPickersDay
                {...pickersDayProps}
                booked={booked}
                selected={selected}
            />
        );
    };

    const handlePrevClick = () => {
        const prevDates = dates
            .map((date) => new Date(date))
            .map((date) => {
                date.setDate(date.getDate() - visibleDays);
                return date.toISOString().split("T")[0];
            });
        setDates(prevDates);
    };

    const handleNextClick = () => {
        const nextDates = dates
            .map((date) => new Date(date))
            .map((date) => {
                date.setDate(date.getDate() + visibleDays);
                return date.toISOString().split("T")[0];
            });
        setDates(nextDates);
    };

    const handleToggleVisibilityClick = () => {
        setShowCalendar(!showCalendar);
    };

    const hdlDialogClose = () => {
        setDialogOpen(false);
    };

    const hdlCreateAppointment = () => {
        setDialogOpen(true);
    };

    const hdlSettingClick = () => {
        navigate(`settings`);
    };

    useEffect(() => {
        dispatch(actions.bookings.create.getRequest());
    }, []);

    const appointments = useMemo(() => {
        const setOfAppointments = {};
        dates.forEach((date) => {
            if (bookings.byId[date]) {
                const idx = bookings.byId[date];
                const dateAppointments = bookings.data[idx].appointments;
                setOfAppointments[date] = dateAppointments;
            }
        });

        return setOfAppointments;
    }, [dates]);

    return (
        <>
            <Grid container sx={{ height: "400px" }}>
                {showCalendar && (
                    <Grid item xs={4}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            openTo="day"
                            views={["day"]}
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderDay={renderPickerDay}
                            renderInput={(params) => <TextField {...params} />}
                            inputFormat="'Week of' MMM d"
                        />
                    </Grid>
                )}

                <Grid
                    item
                    xs={showCalendar ? 8 : 12}
                    sx={{ display: "flex", flexFlow: "column" }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            margin: "0 32px"
                        }}
                    >
                        <Box>
                            <Button
                                onClick={handleToggleVisibilityClick}
                                startIcon={
                                    showCalendar ? (
                                        <VisibilityOffIcon />
                                    ) : (
                                        <CalendarMonthIcon />
                                    )
                                }
                            />
                            <Button
                                onClick={hdlSettingClick}
                                startIcon={<SettingsIcon />}
                            />
                        </Box>
                        <Button
                            variant="contained"
                            onClick={hdlCreateAppointment}
                        >
                            Create appointment
                        </Button>
                    </Box>
                    <div className={classes.root}>
                        {dates.map((date, index) => {
                            const day = new Date(date);
                            const dayNum = day.toLocaleDateString("en-US", {
                                day: "numeric"
                            });

                            return (
                                <div
                                    key={date}
                                    className={classes.dateContainer}
                                >
                                    <Box className={classes.dateBox}>
                                        {index === 0 && (
                                            <IconButton
                                                onClick={handlePrevClick}
                                                variant="outlined"
                                                sx={{
                                                    position: "absolute",
                                                    marginTop: "1rem",
                                                    left: 0
                                                }}
                                            >
                                                <ChevronLeftIcon />
                                            </IconButton>
                                        )}
                                        <Box sx={{ width: "100%" }}>
                                            <Typography variant="caption">
                                                {DAYS_OF_WEEK[day.getDay()]}
                                            </Typography>
                                            <Typography
                                                className={classes.date}
                                                variant="h5"
                                            >
                                                {dayNum < 10
                                                    ? `0${dayNum}`
                                                    : dayNum}
                                            </Typography>
                                        </Box>

                                        {index === visibleDays - 1 && (
                                            <IconButton
                                                onClick={handleNextClick}
                                                variant="outlined"
                                                sx={{
                                                    position: "absolute",
                                                    marginTop: "1rem",
                                                    right: 0
                                                }}
                                            >
                                                <ChevronRightIcon />
                                            </IconButton>
                                        )}
                                    </Box>
                                    <Grid
                                        className={classes.appointments}
                                        container
                                    >
                                        {appointments[date]?.map(
                                            (appointment) => (
                                                <Grid
                                                    key={appointment}
                                                    item
                                                    xs={12}
                                                >
                                                    <Paper
                                                        className={
                                                            classes.paper
                                                        }
                                                    >
                                                        <Typography variant="body2">
                                                            {appointment.time}
                                                        </Typography>
                                                        <Typography variant="subtitle2">
                                                            {appointment.name}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            )
                                        )}
                                        {!appointments[date] && (
                                            <Grid item xs={12}>
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{
                                                        textAlign: "center",
                                                        paddingTop: "1rem",
                                                        color: "#999"
                                                    }}
                                                >
                                                    No appointments
                                                </Typography>
                                            </Grid>
                                        )}
                                    </Grid>
                                </div>
                            );
                        })}
                    </div>
                </Grid>
            </Grid>
            <AppDialog
                size="md"
                open={dialogOpen}
                title="Create new appointment"
                handleClose={hdlDialogClose}
            >
                <NewBooking />
            </AppDialog>
        </>
    );
};

export default Bookings;
