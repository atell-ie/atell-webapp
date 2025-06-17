import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import actions from "../../Store/actions";
import {
    Box,
    Grid,
    Button,
    IconButton,
    TextField,
    List,
    ListItem,
    ListItemIcon,
    Menu,
    MenuItem
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

import CardElement from "./CardElement";

export default ({ isTemplate, section, index, updateSection }) => {
    const dispatch = useDispatch();

    const { reports, reportTemplates } = useSelector((state) => state);

    const data = isTemplate ? reportTemplates.item : reports.item;
    const values = data[section][index].value;

    const hdlDataChange = (value, itemIndx) => {
        const newData = [...data[section]];
        newData[index].value[itemIndx] = value;

        updateSection(newData);
        // dispatch(actions.reports.create.itemUpdate(section, newData));
    };

    const hdlDebounce = useDebouncedCallback((value, index) => {
        hdlDataChange(value, index);
    }, 500);

    const hdlAddItem = () => {
        const newData = [...data[section]];
        newData[index].value.push("");

        dispatch(actions.reports.create.itemUpdate(section, newData));
    };

    return (
        <Grid item xs={12} key={index}>
            <CardElement name="List" section={section} index={index}>
                <List>
                    {values.map((value, itemIndex) => {
                        return (
                            <ListItem key={itemIndex} disablePadding>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "0 1rem",
                                        width: "100%"
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: "40px" }}>
                                        <CircleIcon fontSize="small" />
                                    </ListItemIcon>
                                    <TextField
                                        margin="dense"
                                        id={`item=${itemIndex}`}
                                        onChange={(e) =>
                                            hdlDebounce(
                                                e.target.value,
                                                itemIndex
                                            )
                                        }
                                        defaultValue={value}
                                        sx={{ width: "50%" }}
                                    />
                                </Box>
                            </ListItem>
                        );
                    })}

                    <ListItem key="add" disablePadding sx={{ height: "56px" }}>
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                padding: "0 1rem"
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: "40px" }}>
                                <CircleIcon fontSize="small" />
                            </ListItemIcon>
                            <Button variant="outlined" onClick={hdlAddItem}>
                                Add item
                            </Button>
                        </Box>
                    </ListItem>
                </List>
            </CardElement>
        </Grid>
    );
};
