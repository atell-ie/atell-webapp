import React from "react";
import { Grid, TextField, Typography, MenuItem } from "@mui/material";

const clientTypes = [
    { id: 1, name: "Below 18" },
    { id: 2, name: "Above 18" }
];

const medicalTemplate = [{ id: 1, name: "Default" }];

export default () => {
    return (
        <Grid container columnSpacing={2}>
            <Grid item xs={12}>
                <TextField
                    // error={error.name}
                    id="name"
                    margin="dense"
                    label="Name"
                    type="text"
                    fullWidth
                    // defaultValue={patient.name}
                    // helperText={error.name ? "Mandatory field" : ""}
                    variant="outlined"
                    // onChange={hdlChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    // error={error.name}
                    id="email"
                    margin="dense"
                    label="Email"
                    type="email"
                    fullWidth
                    // defaultValue={patient.name}
                    // helperText={error.name ? "Mandatory field" : ""}
                    variant="outlined"
                    // onChange={hdlChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="client-type"
                    margin="dense"
                    select
                    fullWidth
                    label="Client type"
                    defaultValue={0}
                >
                    <MenuItem key={0} value={0}>
                        None
                    </MenuItem>
                    {clientTypes.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="template"
                    margin="dense"
                    select
                    fullWidth
                    label="Medical template"
                    defaultValue={0}
                >
                    <MenuItem key={0} value={0}>
                        None
                    </MenuItem>
                    {medicalTemplate.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </Grid>
        </Grid>
    );
};
