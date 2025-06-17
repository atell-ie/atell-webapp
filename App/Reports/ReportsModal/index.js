import React from "react";
import AppDialog from "../../common/components/AppDialog";

import NewReport from "./NewReport";
import Templates from "./Templates";

const ReportsModal = ({ dialogOpen, hdlCloseDialog, dialogWindow }) => {
    return (
        <AppDialog
            size="sm"
            open={dialogOpen}
            title={
                dialogWindow === "report"
                    ? "Create a report"
                    : "Report templates"
            }
            handleClose={hdlCloseDialog}
            dialogActions={null}
        >
            {dialogWindow === "report" ? (
                <NewReport hdlCloseDialog={hdlCloseDialog} />
            ) : (
                <Templates />
            )}
        </AppDialog>
    );
};

export default ReportsModal;
