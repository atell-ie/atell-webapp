import * as React from "react";
import PropTypes from "prop-types";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";

import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./styles";

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle
            sx={{ m: 0, p: 2, borderBottom: "1px solid #eee" }}
            {...other}
        >
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500]
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired
};

export default function AppDialog({
    title = "",
    size = "md",
    open,
    handleClose,
    children,
    dialogActions = () => ""
}) {
    return (
        <div>
            <Dialog 
                fullWidth 
                maxWidth="lg"
                open={open} 
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        height: '90vh',
                        maxHeight: '1000px',
                        display: 'flex',
                        flexDirection: 'column',
                        minWidth: '1000px'
                    }
                }}
            >
                <BootstrapDialogTitle onClose={handleClose}>
                    {title}
                </BootstrapDialogTitle>
                <DialogContent 
                    sx={{ 
                        paddingTop: "1rem !important",
                        flex: 1,
                        overflowY: 'auto'
                    }}
                >
                    {children}
                </DialogContent>
                {dialogActions && (
                    <DialogActions sx={styles.actions}>
                        {dialogActions()}
                    </DialogActions>
                )}
            </Dialog>
        </div>
    );
}
