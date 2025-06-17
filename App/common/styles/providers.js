import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { createTheme, ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { blue, green, red, yellow , white} from '@mui/material/colors';
import theme from './theme';

const DISABLED_OPACITY = 0.7;
const DISABLED_PRIMARY_INDEX = 300;

const makeButton = createTheme({
  ...theme,
  overrides: {
    MuiButton: {
      containedPrimary: {
        color: 'white',
        '&$disabled': {
          backgroundColor: `${primary[DISABLED_PRIMARY_INDEX]} !important`,
          color: 'white',
          opacity: DISABLED_OPACITY,
        },
      },
      outlined: {
        backgroundColor: 'white',
      },
      root: {
        '&$disabled': {
          borderColor: `${primary[DISABLED_PRIMARY_INDEX]} !important`,
          color: primary[DISABLED_PRIMARY_INDEX],
          opacity: DISABLED_OPACITY,
        },
      },
    },
  },
  palette: {
    primary,
  },
});

type Props = {
  children: React.ReactChildren,
};

export const ErrorThemeProvider = ({ children }: Props) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={makeButton(red)}>{children}</ThemeProvider>
  </StyledEngineProvider>
);

export const InfoThemeProvider = ({ children }: Props) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={makeButton(blue)}>{children}</ThemeProvider>
  </StyledEngineProvider>
);

export const SuccessThemeProvider = ({ children }: Props) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={makeButton(green)}>{children}</ThemeProvider>
  </StyledEngineProvider>
);

export const WarningThemeProvider = ({ children }: Props) => (
  <StyledEngineProvider injectFirst>
    <ThemeProvider theme={makeButton(yellow)}>{children}</ThemeProvider>
  </StyledEngineProvider>
);
