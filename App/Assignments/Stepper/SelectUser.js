import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import actions from "../../Store/actions";

const options = [
    { id: 1, name: "Alex" },
    { id: 2, name: "Garrett" }
];

const SelectUser = ({ setAssignment }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState("None");

    const onValueChange = (newValue) => {
        setValue(newValue.name);
        setAssignment({ userId: newValue.id });
    };

    return (
        <Autocomplete
            id="select-user-autocomplete"
            freeSolo
            value={value.name}
            onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                    setValue(newValue);
                } else if (newValue && newValue.name) {
                    onValueChange(newValue);
                } else {
                    onValueChange(newValue);
                }
            }}
            getOptionLabel={(option) => {
                if (typeof option === "string") {
                    return option;
                }
                // Regular option
                return option.name;
            }}
            options={options}
            sx={{ width: "100%" }}
            renderInput={(params) => (
                <TextField {...params} label="Assign user" />
            )}
        />
    );
};

export default SelectUser;
