import React from "react";
import { useSelector } from "react-redux";

import { Box, MenuItem, TextField } from "@mui/material/";

const BookingDetails = () => {
    const { typesList } = useSelector((state) => state);

    return (
        <Box sx={{ padding: "1rem 5rem" }}>
            <TextField
                id="outlined-select-appointment"
                margin="normal"
                required
                select
                fullWidth
                label="Appointment"
                defaultValue={0}
            >
                <MenuItem key={0} value={0}>
                    None
                </MenuItem>
                {typesList.appointmentType.data.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                id="outlined-name"
                defaultValue="Hello World"
            />
            <TextField
                margin="normal"
                required
                fullWidth
                label="Email"
                id="outlined-email"
                defaultValue="Hello World"
            />
        </Box>
    );
};

export default BookingDetails;
