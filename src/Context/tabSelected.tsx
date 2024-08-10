import React, { useState } from "react";
import { TABS_OPTION } from "types";

export type DashboardTabContextType = {
  selectedTab: TABS_OPTION;
  selectedUser: string;
  handleTabChange: (tabIndex: number) => void;
  handleUserChange: (newUser: string) => void;
};

export const DashboardTabContext =
  React.createContext<DashboardTabContextType | null>(null);

const DashboardTabProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedUser, setSelectedUser] = useState("All");

  const [selectedTab, setSelectedTab] = useState(TABS_OPTION.OVERVIEW);

  const handleTabChange = (tabIndex: number) => {
    setSelectedTab(tabIndex);
  };

  const handleUserChange = (newUser: string) => {
    setSelectedUser(newUser);
  };

  return (
    <DashboardTabContext.Provider
      value={{
        selectedTab,
        selectedUser,
        handleTabChange,
        handleUserChange,
      }}
    >
      {children}
    </DashboardTabContext.Provider>
  );
};

export default DashboardTabProvider;
