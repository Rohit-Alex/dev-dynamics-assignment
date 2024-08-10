import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { useContext } from "react";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";

import Shimmer from "components/Shimmer";
import { useUserActivityData } from "Hooks/useUserActivityData";
import { initialUserActivityResponseType } from "Slices/FetchUserGithubActivity";
import { computeTotals } from "utils";

const ActivityCard = () => {
  const { selectedUser } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const { data = {} as initialUserActivityResponseType, isLoading } =
    useUserActivityData();

  const totals = computeTotals(
    data?.userActivityCount,
    isLoading,
    selectedUser
  );

  return isLoading ? (
    <Shimmer height={180} />
  ) : (
    <Card
      sx={{ borderRadius: "8px" }}
      className={`shimmer-inactive-ctn ${isLoading ? "" : "visible"}`}
    >
      <CardContent>
        <Typography variant="headerText">Activities Count</Typography>
        <Box display="flex" my={2} gap={8}>
          {data?.data?.AuthorWorklog?.activityMeta?.map((e, idx) => (
            <Box key={idx}>
              <Typography variant="body2" color="text.secondary">
                {`Total ${e.label}`}
              </Typography>
              <Typography variant="body1">{totals?.[e.label]}</Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
