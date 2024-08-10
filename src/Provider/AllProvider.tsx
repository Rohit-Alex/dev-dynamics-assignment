import React, { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { StyledEngineProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Provider } from "react-redux";
import { store } from "store";
import DashboardTabProvider from "Context/tabSelected";
declare module "@mui/material/styles" {
  interface Palette {
    white: string;
  }
  interface PaletteOptions {
    white?: string;
  }
  interface TypographyVariants {
    headerText: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    headerText?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    headerText: true;
  }
}

const theme = createTheme({
  palette: {
    white: "#fff ",
  },
  typography: {
    headerText: {
      color: "#595959",
      fontWeight: 700,
      fontSize: 18,
    },
  },
});

const AllProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <Provider store={store}>
          <BrowserRouter>
            <DashboardTabProvider>
              <CssBaseline />
              {children}
            </DashboardTabProvider>
          </BrowserRouter>
        </Provider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
};

export default AllProvider;
