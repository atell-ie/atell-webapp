import React from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";
import Typography from "@mui/material/Typography";
import { Box, Grid } from "@mui/material/";

import Payment from "./Payment";
import AssignmentExercise from "./AssignmentExercise";
import Confirmation from "./Confirmation";

export default function Assignment() {
    const dispatch = useDispatch();
    const { assignments, typesList } = useSelector((state) => state);

    const hdlPayment = (name) => (e) => {
        const { value } = e.target;
        dispatch(actions.assignments.create.itemSet({ [name]: value }));
    };

    const assignmentIdx =
        typesList.assignmentTypes.byId[assignments.item.assignmentType];
    const assignmentName = typesList.assignmentTypes.data[assignmentIdx].name;

    const impairmentIdx =
        typesList.impairmentTypes.byId[assignments.item.impairmentType];
    const impairmentName = typesList.impairmentTypes.data[impairmentIdx].name;

    return (
        <Box
            sx={{ padding: "2rem", background: "#fff", borderRadius: "0.3rem" }}
        >
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Typography align="right">Summary</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography>{assignments.item.name}</Typography>
                    <Typography>{assignments.item.age}</Typography>
                    <Typography>{assignmentName}</Typography>
                    <Typography>{impairmentName}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography align="right">Select payment method</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Payment setData={hdlPayment} />
                </Grid>
                <Grid item xs={6} sx={{ alignSelf: "center" }}>
                    <Typography align="right">
                        Selected assignment source
                    </Typography>
                </Grid>
                <Grid item xs={6}>
                    <AssignmentExercise />
                </Grid>
                <Grid item xs={6} sx={{ alignSelf: "center" }}>
                    <Typography align="right">Confirm</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Confirmation />
                </Grid>
            </Grid>
        </Box>
    );
}
