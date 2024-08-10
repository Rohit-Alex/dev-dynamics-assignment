import React, { Suspense, useContext } from "react";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import Shimmer from "components/Shimmer";
import DayWiseActivityChart from "components/DayWiseActivityChart";

const ProjectTabs = React.lazy(() => import("components/ProjectTabs"));
const OverviewTabCtn = React.lazy(() => import("Container/OverviewTabCtn"));
const NotDataCard = React.lazy(() => import("components/NotDataCard"));

const Dashboard = () => {
  const { selectedTab } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const COMPONENT_MAP = {
    1: (
      <Suspense>
        <OverviewTabCtn />
      </Suspense>
    ),
    2: (
      <Suspense fallback={<Shimmer height={400} />}>
        <DayWiseActivityChart />
      </Suspense>
    ),
    3: (
      <Suspense fallback={<Shimmer height={300} />}>
        <NotDataCard />
      </Suspense>
    ),
  };

  return (
    <>
      <Suspense fallback={<Shimmer height={20} />}>
        <ProjectTabs selectedTab={selectedTab} />
      </Suspense>
      {COMPONENT_MAP[selectedTab]}
    </>
  );
};

export default Dashboard;
