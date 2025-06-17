import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Box, Button } from "@mui/material/";

const Confirmation = () => {
    const { assignments } = useSelector((state) => state);

    const hdlIssue = () => {};

    const hasErrors = useMemo(() => {
        if (
            assignments.item.paymentFees &&
            assignments.item.paymentMethod &&
            assignments.item.assignmentSource
        )
            return false;

        return true;
    }, [assignments.item]);

    return (
        <Box>
            <Button variant="contained" onClick={hdlIssue} disabled={hasErrors}>
                Issue assignment
            </Button>
        </Box>
    );
};

export default Confirmation;
