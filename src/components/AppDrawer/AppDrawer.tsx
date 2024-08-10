import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import { useTheme } from "@mui/material";
import Devdynamics from "assets/logo.svg";
import dashboardLogo from "assets/dashboard-logo.svg";
import link from "assets/Link.svg";
import money from "assets/Money.svg";
import shield from "assets/Intersect.svg";
import userIcon from "assets/User.svg";
import docIcon from "assets/Docs.svg";
import expandIcon from "assets/Left.svg";

const sideBarMenus = [
  {
    title: "Applications",
    icon: dashboardLogo,
    showDivider: true,
  },
  {
    title: "Connections",
    icon: link,
  },
  {
    title: "Cost",
    icon: money,
    beta: false,
  },
  {
    title: "Security",
    icon: shield,
    showDivider: true,
    beta: true,
  },
];

const sideBarBottomMenus = [
  {
    title: "Admin",
    icon: userIcon,
    showDivider: false,
  },
  {
    title: "Docs",
    icon: docIcon,
    showDivider: true,
  },
];

const AppDrawer: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const theme = useTheme();

  const handleExpansion = () => {
    setIsExpanded((prev) => !prev);
  };

  const drawer = (
    <div>
      <List>
        <ListItem disablePadding>
          <ListItemButton sx={{ justifyContent: "center" }}>
            <img src={Devdynamics} alt="Dev-dynamics-logo" />
            {isExpanded && (
              <ListItemText
                primary="Dev-dynamics"
                sx={{ color: "white", ml: 2 }}
              />
            )}
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ background: "#4d1b95" }} />
      <List>
        {sideBarMenus.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem key={index} disablePadding sx={{ p: 1 }}>
              <ListItemButton
                sx={{
                  background: index === 0 ? "#4D1B95" : "unset",
                  justifyContent: "center",
                }}
              >
                <img src={item.icon} alt="icon-lag-4" />
                {isExpanded && (
                  <ListItemText sx={{ color: "white", ml: 2 }}>
                    {item.title}
                    {item.beta && (
                      <Typography
                        component="span"
                        ml={2}
                        px={1}
                        py={0.25}
                        sx={{
                          background: "#6E27D5",
                        }}
                      >
                        Beta
                      </Typography>
                    )}
                  </ListItemText>
                )}
              </ListItemButton>
            </ListItem>
            {item.showDivider && <Divider sx={{ background: "#4d1b95" }} />}
          </React.Fragment>
        ))}
      </List>
      <Box position="absolute" bottom={0} width={isExpanded ? 240 : 90}>
        <List>
          {sideBarBottomMenus.map((menu, idx) => (
            <ListItem disablePadding sx={{ p: 1 }} key={idx}>
              <ListItemButton>
                <img src={menu.icon} alt="admin-logo" />
                {isExpanded && (
                  <ListItemText
                    primary={menu.title}
                    sx={{ color: "white", ml: 2 }}
                  />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ background: "#4d1b95" }} />
        <List>
          <ListItem disablePadding sx={{ p: 1 }} onClick={handleExpansion}>
            <ListItemButton sx={{ justifyContent: "flex-start" }}>
              <ListItemIcon>
                <img
                  src={expandIcon}
                  alt="expand-logo"
                  style={{
                    transform: isExpanded ? "rotate(0deg)" : "rotate(180deg)",
                  }}
                />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </div>
  );

  return (
    <Box component="nav" aria-label="mailbox folders">
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            position: "static",
            height: "100vh",
            background: "#37146b",
            transition: theme.transitions.create("width", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            width: isExpanded ? 240 : 90,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default AppDrawer;
