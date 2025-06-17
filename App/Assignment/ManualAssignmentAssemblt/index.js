import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import actions from "../../Store/actions";
import { Button, Grid, Typography } from "@mui/material/";
import PhonemesConstructor from "./PhonemesConstructor";
import AppDialog from "../../common/components/AppDialog";

const ManualAssignmentAssembly = ({ open, hdlDialogClose }) => {
    const dispatch = useDispatch();
    const { typesList } = useSelector((state) => state);

    const hdlConfirm = () => {
        dispatch(
            actions.assignments.create.itemSet({
                assignmentSource: typesList.treatmentType.data[0].id
            })
        );
        hdlDialogClose();
    };

    const getDialogActions = () => {
        return (
            <>
                <Button variant="outlined" onClick={hdlDialogClose}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={hdlConfirm}>
                    Confirm
                </Button>
            </>
        );
    };

    return (
        <AppDialog
            open={open}
            title="Manual treatment creation"
            handleClose={hdlDialogClose}
            size="md"
            dialogActions={getDialogActions}
        >
            <PhonemesConstructor />
        </AppDialog>
    );
};

export default ManualAssignmentAssembly;
