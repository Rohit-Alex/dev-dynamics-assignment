import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { computeTotals } from "utils";
import { PropsType } from "./types";
import { useContext, useMemo } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";

import Shimmer from "components/Shimmer";
import { useUserActivityData } from "Hooks/useUserActivityData";
import { initialUserActivityResponseType } from "Slices/FetchUserGithubActivity";

const EventHistory: React.FC<PropsType> = () => {
  const { selectedUser } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const { data = {} as initialUserActivityResponseType, isLoading } =
    useUserActivityData();

  const computePercentagesForActivities = () => {
    const totals = computeTotals(
      data?.userActivityCount,
      isLoading,
      selectedUser
    );

    const totalActivities = Object.values(totals ?? {}).reduce(
      (sum, value) => sum + value,
      0
    );

    const percentages = Object.entries(totals ?? {}).map(([key, value]) => ({
      name: key,
      y: (value / totalActivities) * 100,
    }));

    const highestPercentageActivity = percentages.reduce(
      (max, activity) => (activity.y > max.y ? activity : max),
      { name: "", y: 0 }
    );

    return {
      percentages,
      highestPercentageActivity,
    };
  };

  const { percentages, highestPercentageActivity } =
    computePercentagesForActivities();

  const chartOptions = useMemo(
    () => ({
      chart: {
        type: "pie",
      },
      title: {
        text: "User Activity Summary",
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
      },
      plotOptions: {
        series: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: [
            {
              enabled: true,
              distance: 20,
            },
            {
              enabled: true,
              distance: -40,
              format: "{point.percentage:.1f}%",
              style: {
                fontSize: "1.2em",
                textOutline: "none",
                opacity: 0.7,
              },
              filter: {
                operator: ">",
                property: "percentage",
                value: 10,
              },
            },
          ],
        },
      },
      series: [
        {
          name: "Percentage",
          colorByPoint: true,
          data: percentages
            ? percentages.map((data) => ({
                name: data.name,
                y: data.y,
                sliced: highestPercentageActivity.name === data.name,
                selected: highestPercentageActivity.name === data.name,
              }))
            : [],
        },
      ],
    }),
    [percentages]
  );

  return isLoading ? (
    <Shimmer height={515} />
  ) : (
    <Card
      sx={{ borderRadius: "8px" }}
      className={`shimmer-inactive-ctn ${isLoading ? "" : "visible"}`}
    >
      <CardContent>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </CardContent>
    </Card>
  );
};

export default EventHistory;
