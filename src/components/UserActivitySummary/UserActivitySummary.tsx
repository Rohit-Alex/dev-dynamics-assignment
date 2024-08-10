import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { useContext, useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Box from "@mui/material/Box";

import Shimmer from "components/Shimmer";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import { initialUserActivityResponseType } from "Slices/FetchUserGithubActivity";
import { useUserActivityData } from "Hooks/useUserActivityData";
import { computeTotals } from "utils";

const UserActivitySummary = () => {
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

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "bar",
      },
      title: {
        text: "User Activity Summary",
      },
      xAxis: {
        categories: Object.keys(totals ?? {}),
        title: {
          text: "Activity",
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Count",
        },
      },
      series: [
        {
          name: "Count",
          data: Object.values(totals ?? {}),
        },
      ],
    }),
    [totals]
  );

  return isLoading ? (
    <Shimmer height={515} />
  ) : (
    <Card
      sx={{ borderRadius: "8px" }}
      className={`shimmer-inactive-ctn ${isLoading ? "" : "visible"}`}
    >
      <CardContent>
        <Box mt={2}>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserActivitySummary;
