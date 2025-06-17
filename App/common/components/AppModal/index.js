import React, { forwardRef } from "react";
import {
    Fade,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

type Props = {
    children: React.ReactNode,
    isVisible: boolean,
    onClose: Function,
    title: string
};

const Transition = forwardRef(function Transition(props, ref) {
    return <Fade in={true} ref={ref} {...props} />;
});

/**
 * App Modal Component
 * @param {Props} props
 */
const AppModal = ({
    children = null,
    isVisible,
    size = "md",
    onClose,
    title = "",
    controls = ""
}: Props) => {
    return (
        <Dialog
            open={isVisible}
            fullWidth
            maxWidth={size}
            onClose={onClose}
            TransitionComponent={Transition}
        >
            <DialogTitle sx={{ padding: 0 }}>
                <AppBar
                    sx={{ position: "relative" }}
                    elevation={0}
                    color="inherit"
                >
                    <Toolbar
                        sx={{
                            padding: "1rem 1rem !important"
                        }}
                    >
                        <Typography
                            sx={{ flex: 1 }}
                            variant="h6"
                            component="div"
                        >
                            {title}
                        </Typography>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={onClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
            </DialogTitle>
            <DialogContent sx={{ padding: "1rem" }}>{children}</DialogContent>
            <DialogActions sx={{ padding: "1rem" }}>{controls}</DialogActions>
        </Dialog>
    );
};

export default AppModal;
