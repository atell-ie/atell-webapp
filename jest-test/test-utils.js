import React from "react";

import { render as rtlRender } from "@testing-library/react";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import MomentUtils from "@date-io/moment";
import { theme } from "../App/common/styles";
import { I18nextProvider } from "react-i18next";
import i18n from "../App/common/i18n";

import { createStore } from "redux";
import { Provider } from "react-redux";

import rootReducer from "../App/Store/root-reducer";

const customRender = (ui, { initialState, ...renderOptions } = {}) => {
    const store = createStore(rootReducer);

    const Wrapper = ({ children }) => {
        return (
            <LocalizationProvider
                utils={MomentUtils}
                dateAdapter={AdapterDateFns}
            >
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={theme}>
                        <I18nextProvider i18n={i18n}>
                            <Provider store={store}>{children}</Provider>
                        </I18nextProvider>
                    </ThemeProvider>
                </StyledEngineProvider>
            </LocalizationProvider>
        );
    };

    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender };
