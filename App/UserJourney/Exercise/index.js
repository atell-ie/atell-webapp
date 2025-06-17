import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Sentry from "@sentry/react";
import actions from "../../Store/actions";
import { useTranslation } from "react-i18next";
import { Grid, Box, Paper, CircularProgress, Typography } from "@mui/material/";
import AppContainer from "../../common/components/AppContainer";
import AppHeader from "../../common/components/AppHeader";
import Targets from "./Targets";
import Preview from "./Preview";
import styles from "./styles.js";

const exerciseType = {
    1: "Isolation",
    2: "Syllables",
    3: "Single word",
    4: "Phrase",
    5: "Single sentence",
    6: "Sentences"
};

const TaskItems = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true);

    const { tasks, targets } = useSelector((state) => state);
    const [entry, setEntry] = useState(tasks.item ? tasks.item : {});

    const { dayNo, weekNo } = tasks.item;

    const hdlItemSwitch = (step) => {
        let nextIndex = entry.index + step;
        if (tasks.item.entries.length <= nextIndex) nextIndex = 0;
        if (nextIndex < 0) nextIndex = tasks.item.entries.length - 1;

        setSelectedIndex(nextIndex);
    };

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading)
        return (
            <Box sx={{ display: "flex" }}>
                <CircularProgress />
            </Box>
        );

    if (!targets.item) return <div>Error loading data</div>;

    return (
        <>
            <AppHeader>
                <Typography>{/* {type} for {name} */}</Typography>
            </AppHeader>
            <AppContainer>
                <Paper>
                    <Grid container sx={{ padding: "1rem" }}>
                        <Grid item xs={12}>
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontSize: "1.5rem",
                                    margin: ".5rem 0"
                                }}
                            >
                                {`${weekNo}/${dayNo}, Exercise #${
                                    targets.item.exerciseNo
                                } for ${exerciseType[targets.item.type]}`}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Preview
                                entry={entry}
                                hdlItemSwitch={hdlItemSwitch}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Targets />
                        </Grid>
                    </Grid>
                </Paper>
            </AppContainer>
        </>
    );
};

export default TaskItems;
