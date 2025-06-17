import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import actions from "../../Store/actions";
import { Grid, TextField } from "@mui/material";

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
        <Grid item xs={12} key={index} sx={{ padding: "1rem 0" }}>
            <TextField
                fullWidth
                required
                margin="dense"
                id="title"
                label="Title"
                onChange={(e) => hdlDebounce(e.target.value, index)}
                defaultValue={titleValue}
            />
        </Grid>
    );
};
