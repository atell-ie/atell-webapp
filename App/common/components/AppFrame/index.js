import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
    Box,
    CssBaseline,
    Dialog,
    DialogContent,
    DialogContentText
} from "@mui/material";
import actions from "../../../Store/actions";
import { useAuthenticated } from "../../hooks";
import { useTranslation } from "react-i18next";
import LoginForm from "../LoginForm";
import { DrawerHeader } from "../NavigationMenu";

import NavigationMenu from "../NavigationMenu";
//import Logo from "../../common/images/logo-light.png";
import styles from "../../../User/UserMenu/old_menuStyles";
import menuUtils from "../../../User/UserMenu/menuUtils";
import mainMenu from "../../../User/UserMenu/mainMenu";

type Props = {
    children: React.ReactNode
};

/**
 * App Screen Component
 * @param {Props} props
 */

export default ({ children }: Props) => {
    const { t } = useTranslation();
    const location = useLocation();
    //const title = menuUtils.screenTitle(location.pathname);
    const [open, setOpen] = useState(false);

    const { appSettings } = useSelector((state) => state);
    const dispatch = useDispatch();
    const { hasAccessToken } = useAuthenticated();
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    const { drawerOpen } = appSettings;

    const onDrawerClose = () =>
        dispatch(
            actions.appSettings.create.set({
                drawerOpen: false
            })
        );

    const onLoginDialogClose = () => setLoginDialogOpen(false);
    const onLoginDialogOpen = () => setLoginDialogOpen(true);

    const onLoginFormSuccess = () => {
        setLoginDialogOpen(false);
        window.location.reload();
    };

    const toggleDrawer = () => {
        setOpen(!open);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Dialog onClose={onLoginDialogClose} open={loginDialogOpen}>
                <DialogContent>
                    <DialogContentText>
                        {t("messages.enterCredentials")}
                    </DialogContentText>
                    <LoginForm onSuccess={onLoginFormSuccess} />
                </DialogContent>
            </Dialog>

            {hasAccessToken && (
                <Box sx={{ display: "flex", height: "100%" }}>
                    <CssBaseline />
                    <NavigationMenu
                        disabled={true}
                        items={mainMenu}
                        onClose={handleDrawerClose}
                        toggleDrawer={toggleDrawer}
                        open={open}
                    />
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, height: "100%" }}
                    >
                        <DrawerHeader />
                        {children}
                    </Box>
                </Box>
            )}
        </>
    );
};
