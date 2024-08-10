import React, { Suspense } from "react";
import Box from "@mui/material/Box";
import Shimmer from "components/Shimmer";
import UserActivityTable from "components/UserActivityTable";

const ActivityCard = React.lazy(() => import("components/ActivityCard"));
const UserActivitySummary = React.lazy(
  () => import("components/UserActivitySummary")
);
const EventHistory = React.lazy(() => import("components/EventHistory"));

const OverviewTabCtn = () => {
  return (
    <>
      <Suspense fallback={<Shimmer height={180} />}>
        <ActivityCard />
      </Suspense>
      <Box
        display="flex"
        my={4}
        gap={2}
        sx={{
          "& > *": {
            flex: 1,
          },
        }}
      >
        <Suspense fallback={<Shimmer height={515} />}>
          <UserActivitySummary />
        </Suspense>
        <Suspense fallback={<Shimmer height={515} />}>
          <EventHistory />
        </Suspense>
      </Box>
      <UserActivityTable />
    </>
  );
};

export default OverviewTabCtn;
