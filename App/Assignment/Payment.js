import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, MenuItem, FormControl } from "@mui/material/";

const paymentCost = [
    {
        id: 1,
        label: "Speech assessment $50"
    }
];

const Payment = ({ data, setData }) => {
    const dispatch = useDispatch();

    const { assignments, typesList } = useSelector((state) => state);

    return (
        <Box sx={{ width: "50%" }}>
            <FormControl fullWidth>
                <TextField
                    id="outlined-payment-method"
                    select
                    label="Fees"
                    value={assignments.item.paymentFees}
                    onChange={setData("paymentFees")}
                >
                    <MenuItem key={0} value={0}>
                        None
                    </MenuItem>
                    {paymentCost.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
            <FormControl margin="normal" fullWidth>
                <TextField
                    id="outlined-payment-method"
                    select
                    label="Method"
                    value={assignments.item.paymentMethod}
                    onChange={setData("paymentMethod")}
                >
                    <MenuItem key={0} value={0}>
                        None
                    </MenuItem>
                    {typesList.paymentMethods.data.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </FormControl>
        </Box>
    );
};

export default Payment;
