import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import computerIcon from "assets/tv.svg";
import triangleIcon from "assets/Triangle.svg";
import historyClock from "assets/History.svg";

import { grey } from "@mui/material/colors";
import { PropsType } from "./types";
import { useContext } from "react";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";

const TABS = [
  {
    icon: computerIcon,
    text: "Overview",
  },
  {
    icon: historyClock,
    text: "Daily Activity",
  },
  {
    icon: triangleIcon,
    text: "Alerts",
  },
];

const ProjectTabs: React.FC<PropsType> = ({ selectedTab }) => {
  const { handleTabChange } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const tabClicked = (index: number) => {
    handleTabChange(index + 1);
  };

  return (
    <Box my={2} display="flex" alignItems="center" gap={4}>
      {TABS.map((tab, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          onClick={() => tabClicked(index)}
          sx={{ cursor: "pointer" }}
        >
          <img src={tab.icon} alt="tab-icon-alt" />
          <Typography
            ml={1}
            variant="body2"
            fontWeight={selectedTab === index + 1 ? 700 : "unset"}
            color={selectedTab === index + 1 ? "unset" : grey[500]}
          >
            {tab.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};

export default ProjectTabs;
