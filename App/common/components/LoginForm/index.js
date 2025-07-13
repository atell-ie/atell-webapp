import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Box,
    Button,
    Container,
    Grid,
    IconButton,
    Link,
    Stack,
    TextField,
    Typography
} from "@mui/material";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import actions from "../../../Store/actions";
import styles from "./styles";
import config from "../../../config";

type Props = {
    inputProps: any,
    onChange: Function,
    onSuccess: Function
};

/**
 * Login Form Component
 * @param {Props} props
 */
const LoginForm = ({ onChange, onSuccess }: Props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const { auth } = useSelector((state) => state);
    const [loading, setLoading] = React.useState(false);
    const [credentials, setCredentials] = React.useState({
        username: "",
        password: ""
    });
    const [passwordObfuscated, setPasswordObfuscated] = React.useState(true);

    const { password, username } = credentials;
    const disableSubmit = loading || !(password && username);

    const handleChange = (name: string) => (event: Event) => {
        const next = { ...credentials, [name]: event.target.value };
        setCredentials(next);
        onChange && onChange(next);
    };

    const onPasswordObfuscate = () =>
        setPasswordObfuscated(!passwordObfuscated);

    const resetPasswordUrl = React.useMemo(() => {
        const { username } = credentials;
        return [
            config.passwordReset.url,
            `?${config.passwordReset.params.join("&")}`,
            `&client_id=${config.passwordReset.clientId}`,
            `&redirect_uri=${encodeURIComponent(
                config.passwordReset.redirectUri
            )}`
        ].join("");
    }, [credentials]);

    const onForgotPasswordClick = () => {
        window.open(resetPasswordUrl, "_blank", "noopener,noreferrer");
    };

    const onSubmit = async (event: Event) => {
        event.preventDefault();
        if (!disableSubmit) {
            try {
                setLoading(true);
                await dispatch(
                    actions.auth.create.getRequest(username, password)
                );
                setLoading(false);
                onSuccess && onSuccess();
            } catch (error) {
                console.error(error);
                // dispatch(actions.toast.create.error(t("errors.loginFailure")));
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        const next = { ...credentials, username: auth.username };
        setCredentials(next);
        onChange && onChange(next);
    }, []);

    return (
        <>
            <Container component="main" maxWidth="xs">
                <Stack
                    direction="row"
                    alignItems="center"
                    gap={1}
                    justifyContent="center"
                >
                    <LockOutlinedIcon size="large" color="primary" />
                    <Typography component="h1" variant="h5">
                        {t("signIn")}{" "}
                    </Typography>
                </Stack>
                <Box sx={styles.loginContainer}>
                    <Box component="form" onSubmit={onSubmit} noValidate>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            name="email"
                            label={t("username")}
                            onChange={handleChange("username")}
                            placeholder={t("username")}
                            autoComplete="email"
                            autoFocus
                            value={username}
                            inputProps={{
                                "data-testid": "user-email"
                            }}
                        />
                        <TextField
                            margin="normal"
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={onPasswordObfuscate}
                                        size="large"
                                        color="primary"
                                    >
                                        {passwordObfuscated ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                )
                            }}
                            required
                            fullWidth
                            name="password"
                            label={t("password")}
                            id="password"
                            color={"primary"}
                            onChange={handleChange("password")}
                            placeholder={t("password")}
                            type={passwordObfuscated ? "password" : "text"}
                            value={password}
                            autoComplete="current-password"
                            inputProps={{
                                "data-testid": "user-password"
                            }}
                        />
                        <Button
                            type="submit"
                            loading={loading}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ my: 3 }}
                            onClick={onSubmit}
                            disabled={disableSubmit}
                            data-testid="login-submit"
                        >
                            {t("login")}
                        </Button>
                        <Grid container>
                            <Grid size="grow">
                                {/* <Link href="#" variant="body2">
                                    {t("needHelp")}
                                </Link> */}
                            </Grid>
                            <Grid>
                                <Link
                                    onClick={onForgotPasswordClick}
                                    variant="body2"
                                >
                                    {t("forgotYourPassword")}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </>
    );
};

export default LoginForm;
