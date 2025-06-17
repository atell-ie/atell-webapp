import React from "react";
import { Grid, TextField, Typography, Divider } from "@mui/material";

export default () => {
    return (
        <Grid
            container
            columnSpacing={10}
            style={{ width: "100%%" }}
            alignItems="flex-start"
        >
            <Grid container columnSpacing={2} item xs={6}>
                <Grid item xs={12}>
                    <Typography>Guardian details</Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        // error={error.name}
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        // defaultValue={patient.name}
                        // helperText={error.name ? "Mandatory field" : ""}
                        variant="outlined"
                        // onChange={hdlChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        // error={error.name}
                        margin="dense"
                        id="name"
                        label="Surname"
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
                        margin="dense"
                        id="name"
                        label="Email"
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
                        margin="dense"
                        id="name"
                        label="Contact number"
                        type="text"
                        fullWidth
                        // defaultValue={patient.name}
                        // helperText={error.name ? "Mandatory field" : ""}
                        variant="outlined"
                        // onChange={hdlChange}
                    />
                </Grid>
            </Grid>
            <Grid container columnSpacing={2} item xs={6}>
                <Grid item xs={12}>
                    <Typography>Client details</Typography>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        // error={error.name}
                        margin="dense"
                        id="name"
                        label="Name"
                        type="text"
                        fullWidth
                        // defaultValue={patient.name}
                        // helperText={error.name ? "Mandatory field" : ""}
                        variant="outlined"
                        // onChange={hdlChange}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        // error={error.name}
                        margin="dense"
                        id="name"
                        label="Surname"
                        type="text"
                        fullWidth
                        // defaultValue={patient.name}
                        // helperText={error.name ? "Mandatory field" : ""}
                        variant="outlined"
                        // onChange={hdlChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        // error={error.name}
                        margin="dense"
                        id="name"
                        label="Age"
                        type="text"
                        fullWidth
                        // defaultValue={patient.name}
                        // helperText={error.name ? "Mandatory field" : ""}
                        variant="outlined"
                        // onChange={hdlChange}
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};
