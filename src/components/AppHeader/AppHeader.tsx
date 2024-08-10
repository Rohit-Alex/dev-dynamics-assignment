import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Skeleton from "@mui/material/Skeleton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useAppHeader } from "./useAppHeader";

const AppHeader = () => {
  const {
    anchorEl,
    appBarRef,
    open,
    selectedUser,
    userActivityData,
    isloaded,
    handleClick,
    handleClose,
  } = useAppHeader();

  return (
    <AppBar
      ref={appBarRef}
      position="sticky"
      sx={{
        background: "white",
        color: "unset",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <div>
          <Typography variant="body2" noWrap component="div">
            User
          </Typography>
          <Box display="flex" alignItems="center" onClick={handleClick}>
            {!isloaded ? (
              <Skeleton
                width="100px"
                variant="text"
                sx={{ fontSize: "1.5rem" }}
              />
            ) : (
              <Typography variant="subtitle1" noWrap component="div">
                {selectedUser ?? "All"}
              </Typography>
            )}
            <KeyboardArrowDownIcon />
          </Box>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={() => handleClose()}
          >
            {userActivityData?.users?.map((user, idx) => (
              <MenuItem
                selected={user === selectedUser}
                key={idx}
                onClick={() => handleClose(user)}
              >
                {user}
              </MenuItem>
            ))}
          </Menu>
        </div>
        <div className="flex flex-align-center">
          <Avatar sx={{ bgcolor: "#ffd07a" }}>JD</Avatar>
          <Typography variant="body2" ml={1}>
            John Doe
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppHeader;
