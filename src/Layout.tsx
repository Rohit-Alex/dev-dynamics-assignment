import { PropsWithChildren } from "react";
import Box from "@mui/material/Box";

import AppDrawer from "components/AppDrawer";
import AppHeader from "components/AppHeader";
import { useUserActivityData } from "Hooks/useUserActivityData";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  useUserActivityData(false);

  return (
    <Box sx={{ display: "flex" }}>
      <AppDrawer />
      <Box flex={1} sx={{ height: "100vh", overflowY: "scroll" }}>
        <AppHeader />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 2,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
