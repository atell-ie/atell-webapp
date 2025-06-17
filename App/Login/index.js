import React from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { LoginForm, LoginLogo } from "../common/components";
import styles from "./styles";

const resetPasswordUrl = [
    config.auth.authorize,
    config.auth.passwordReset,
    `&client_id=${config.auth.clientId}`,
    `&redirect_uri=${config.auth.redirectUri}`
].join("");

/**
 * Login Component
 */
export default () => {
    let navigate = useNavigate();

    const onSuccess = () => navigate(`/${config.paths.auth}`);

    return (
        <Box sx={styles.loginContainer}>
            <Box sx={styles.loginWrapper}>
                <LoginLogo height={96} light />
                <LoginForm onSuccess={onSuccess} />
            </Box>
        </Box>
    );
};
