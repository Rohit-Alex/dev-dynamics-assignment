import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import { useContext, useRef, useState } from "react";
import { useUserActivitySelector } from "Slices/FetchUserGithubActivity";

export const useAppHeader = () => {
  const { status: userActivityStatus, data: userActivityData } =
    useUserActivitySelector();

  const { selectedUser, handleUserChange } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const appBarRef = useRef<HTMLDivElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (newUser?: string) => {
    if (newUser) {
      handleUserChange(newUser);
    }
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const isloaded = ["fetched", "error"].includes(userActivityStatus);

  return {
    appBarRef,
    open,
    anchorEl,
    selectedUser,
    userActivityData,
    isloaded,
    handleClick,
    handleClose,
  };
};
