import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import actions from "../../Store/actions";
import { Grid, TextField } from "@mui/material";

import CardElement from "./CardElement";

export default ({ isTemplate, section, index, updateSection }) => {
    const dispatch = useDispatch();

    const { reports, reportTemplates } = useSelector((state) => state);

    const data = isTemplate ? reportTemplates.item : reports.item;

    const paragraphValue = data[section][index].value;

    const hdlDataChange = (value, index) => {
        const newData = [...data[section]];
        newData[index].value = value;

        updateSection(newData);
    };

    const hdlDebounce = useDebouncedCallback((value, index) => {
        hdlDataChange(value, index);
    }, 500);

    return (
        <Grid item xs={12} key={index}>
            <CardElement name="Paragraph" section={section} index={index}>
                <TextField
                    fullWidth
                    required
                    margin="dense"
                    id={`paragraph-${index}`}
                    label="Text"
                    onChange={(e) => hdlDebounce(e.target.value, index)}
                    defaultValue={paragraphValue}
                    multiline
                    rows={4}
                />
            </CardElement>
        </Grid>
    );
};
