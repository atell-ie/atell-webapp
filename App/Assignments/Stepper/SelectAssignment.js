import React from "react";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const SelectAssignment = ({ assignment, setAssignment }) => {
    const { typesList } = useSelector((state) => state);

    const onValueChange = (name) => (event) => {
        const { value } = event.target;

        if (name === "assignmentType")
            setAssignment({
                [name]: value,
                impairmentType: 0,
                assignmentSource: 0
            });
        else
            setAssignment({
                [name]: value
            });
    };

    return (
        <>
            <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">
                    Assignment
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={assignment.assignmentType}
                    label="Assigment"
                    onChange={onValueChange("assignmentType")}
                >
                    <MenuItem value={0}>None</MenuItem>;
                    {typesList.assignmentTypes.data.map((item) => {
                        return (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
                <InputLabel id="demo-simple-select-label">
                    Impairment
                </InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={assignment.impairmentType}
                    label="Impairment"
                    disabled={assignment.assignmentType === 0}
                    onChange={onValueChange("impairmentType")}
                >
                    <MenuItem value={0}>None</MenuItem>;
                    {typesList.impairmentTypes.data.map((item) => {
                        return (
                            <MenuItem key={item.id} value={item.id}>
                                {item.name}
                            </MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </>
    );
};

export default SelectAssignment;
