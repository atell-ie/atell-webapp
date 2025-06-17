import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../Store/actions";
import { Box, Chip, Button } from "@mui/material/";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import ManualAssignmentAssembly from "./ManualAssignmentAssemblt";

const AssignmentExercise = () => {
    const dispatch = useDispatch();
    const { typesList, assignments } = useSelector((state) => state);

    const [dialogOpen, setDialogOpen] = useState(false);

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        dispatch(actions.assignments.create.itemSet({ assignmentSource: 0 }));
    };

    const hdlMenuSelect = (sourceId) => (e) => {
        if (assignments.item.assignmentType === 2 && sourceId === 1) {
            setDialogOpen(true);
        } else {
            dispatch(
                actions.assignments.create.itemSet({
                    assignmentSource: sourceId
                })
            );
        }

        handleClose();
    };

    const hdlDialogOpen = () => {
        setDialogOpen(true);
    };

    const hdlDialogClose = () => {
        setDialogOpen(false);
    };

    const sourceData =
        assignments.item.assignmentType === 1
            ? typesList.assessmentType
            : typesList.treatmentType;

    let selectedSource = "";

    if (assignments.item.assignmentSource) {
        const sourceIdx = sourceData.byId[assignments.item.assignmentSource];
        selectedSource = sourceData.data[sourceIdx].name;
    }

    return (
        <Box>
            {assignments.item.assignmentSource !== 0 ? (
                <Chip
                    label={selectedSource}
                    onDelete={handleDelete}
                    onClick={hdlDialogOpen}
                    sx={{ padding: "1.5rem 0.5rem" }}
                />
            ) : (
                <>
                    <Button
                        id="fade-button"
                        aria-controls={open ? "fade-menu" : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? "true" : undefined}
                        onClick={handleClick}
                        endIcon={<AddIcon fontSize="large" />}
                    >
                        Add source
                    </Button>
                    <Menu
                        id="fade-menu"
                        MenuListProps={{
                            "aria-labelledby": "fade-button"
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        {sourceData.data.map((item) => {
                            return (
                                <MenuItem
                                    key={item.id}
                                    onClick={hdlMenuSelect(item.id)}
                                >
                                    {item.name}
                                </MenuItem>
                            );
                        })}
                    </Menu>
                </>
            )}

            <ManualAssignmentAssembly
                open={dialogOpen}
                hdlDialogClose={hdlDialogClose}
            />
        </Box>
    );
};

export default AssignmentExercise;
