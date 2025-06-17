import React from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./common/i18n";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"; // <-- USE DAYJS
import { BrowserRouter } from "react-router-dom";
import { theme } from "./common/styles";
import MainRoutes from "./MainRoutes";
import Store from "./Store";
import { OnlineStatusProvider } from "./OnlineStatusProvider";
import { SnackbarProvider } from "notistack";

export default () => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={theme}>
                    <I18nextProvider i18n={i18n}>
                        <Store>
                            <OnlineStatusProvider>
                                <BrowserRouter>
                                    <SnackbarProvider
                                        anchorOrigin={{
                                            vertical: "bottom",
                                            horizontal: "right"
                                        }}
                                    >
                                        <MainRoutes />
                                    </SnackbarProvider>
                                </BrowserRouter>
                            </OnlineStatusProvider>
                        </Store>
                    </I18nextProvider>
                </ThemeProvider>
            </StyledEngineProvider>
        </LocalizationProvider>
    );
};
