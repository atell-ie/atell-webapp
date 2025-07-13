import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import actions from "../../Store/actions";
import { Grid, TextField, Box } from "@mui/material";

export default ({ isTemplate, section, index, updateSection }) => {
    const dispatch = useDispatch();
    const { reports, reportTemplates } = useSelector((state) => state);

    const data = isTemplate ? reportTemplates.item : reports.item;
    const titleValue = data[section][index].value;

    const hdlDataChange = (value, index) => {
        const newData = [...data[section]];
        newData[index].value = value;

        updateSection(newData);
        // dispatch(actions.reports.create.itemUpdate(section, newData));
    };

    const hdlDebounce = useDebouncedCallback((value, index) => {
        hdlDataChange(value, index);
    }, 500);

    return (
        <Box sx={{ mb: 3 }}>
            <TextField
                fullWidth
                required
                margin="dense"
                id="title"
                label="Section Title"
                onChange={(e) => hdlDebounce(e.target.value, index)}
                defaultValue={titleValue}
                placeholder="Enter a descriptive title for this section"
                sx={{
                    "& .MuiOutlinedInput-root": {
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1976d2"
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#1976d2"
                        }
                    },
                    "& .MuiInputLabel-root": {
                        fontWeight: 500,
                        color: "#555"
                    },
                    "& .MuiInputBase-input": {
                        fontSize: "1.1rem",
                        fontWeight: 600
                    }
                }}
            />
        </Box>
    );
};
