import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import { useUserActivityData } from "Hooks/useUserActivityData";
import { useContext, useMemo } from "react";
import { initialUserActivityResponseType } from "Slices/FetchUserGithubActivity";
import { computeTotals } from "utils";

export const useUserActivitySummary = () => {
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

  return { isLoading, chartOptions };
};
