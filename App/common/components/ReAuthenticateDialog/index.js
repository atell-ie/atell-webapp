import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
    Divider
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import actions from "../../../Store/actions";
import { useAuthenticated } from "../../hooks";
import { useTranslation } from "react-i18next";
import config from "../../../config";
import styles from "./styles";

/**
 * Re-authenticate Dialog Component
 */
export default () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { user, hasAccessToken, isExpired } = useAuthenticated();
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [password, setPassword] = useState("");

    useEffect(() => {
        hasAccessToken && isExpired && setDialogOpen(true);
    }, [hasAccessToken, isExpired, location]);

    const onDialogClose = (event, reason) => {
        // do not allow to close dialog on background click
        if (reason && reason == "backdropClick") return;
        setDialogOpen(false);
        navigate(`/${config.paths.login}`);
    };

    const onPasswordChange = (event: Event) => setPassword(event.target.value);

    const onSubmit = async () => {
        try {
            setLoading(true);
            await dispatch(
                actions.auth.create.getRequest(user.username, password)
            );
            // return back to the page where user was at
            window.location.reload();
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    return (
        <Dialog open={dialogOpen} onClose={onDialogClose}>
            <DialogTitle>{t("messages.sessionExpired")}</DialogTitle>
            <DialogContent>
                <Box sx={{ p: 2 }}>
                    <Typography variant="subtitle1">{user.username}</Typography>
                </Box>
                <Box component="form" noValidate>
                    <TextField
                        autoFocus
                        fullWidth
                        label={t("password")}
                        onChange={onPasswordChange}
                        type="password"
                        value={password}
                    />
                </Box>
            </DialogContent>
            <Divider />
            <DialogActions sx={styles.dialogActions}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={onDialogClose}
                    sx={styles.actionButton}
                >
                    {t("cancel")}
                </Button>

                <LoadingButton
                    loading={loading}
                    variant="contained"
                    color="primary"
                    sx={styles.actionButton}
                    onClick={onSubmit}
                >
                    {t("submit")}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};
