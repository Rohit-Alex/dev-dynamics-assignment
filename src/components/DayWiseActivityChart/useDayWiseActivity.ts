import {
  DashboardTabContext,
  DashboardTabContextType,
} from "Context/tabSelected";
import { useContext, useMemo, useRef } from "react";
import { useUserActivitySelector } from "Slices/FetchUserGithubActivity";
import { AuthorWorkRowData } from "types";

interface AggregatedData {
  date: string;
  items: {
    children: {
      count: number;
      label: string;
      fillColor: string;
    }[];
  };
}

export const useDayWiseActivity = () => {
  const { status: userActivityStatus, data: userActivityData } =
    useUserActivitySelector();

  const { selectedUser } = useContext(
    DashboardTabContext
  ) as DashboardTabContextType;

  const allUsersCache = useRef<AggregatedData[] | null>(null);
  const userCache = useRef<{ [key: string]: AggregatedData[] }>({});

  const rowData = userActivityData?.data?.AuthorWorklog
    ?.rows as AuthorWorkRowData[];

  const aggregateAllUsers = (
    rowData: AuthorWorkRowData[]
  ): AggregatedData[] => {
    const aggregatedMap: {
      [date: string]: {
        [label: string]: AggregatedData["items"]["children"][0];
      };
    } = {};

    rowData.forEach((userActivity) => {
      userActivity.dayWiseActivity.forEach((dailyActivity: any) => {
        const { date, items } = dailyActivity;
        if (!aggregatedMap[date]) {
          aggregatedMap[date] = {};
        }

        items.children.forEach((activity: any) => {
          const { label, count, fillColor } = activity;
          if (!aggregatedMap[date][label]) {
            aggregatedMap[date][label] = {
              count: 0,
              label,
              fillColor,
            };
          }
          aggregatedMap[date][label].count += parseInt(count, 10);
        });
      });
    });

    return Object.keys(aggregatedMap).map((date) => ({
      date,
      items: {
        children: Object.values(aggregatedMap[date]),
      },
    }));
  };

  const aggregateSingleUser = (
    user: string,
    rowData: AuthorWorkRowData[]
  ): AggregatedData[] => {
    const userActivity = rowData.find((activity) => activity.name === user);
    if (userActivity) {
      return userActivity.dayWiseActivity.map((dailyActivity: any) => ({
        date: dailyActivity.date,
        items: {
          children: dailyActivity.items.children.map((activity: any) => ({
            count: parseInt(activity.count, 10),
            label: activity.label,
            fillColor: activity.fillColor,
          })),
        },
      }));
    }
    return [];
  };

  const aggregatedData = useMemo(() => {
    if (selectedUser === "All") {
      if (!allUsersCache.current) {
        const aggregated = aggregateAllUsers(rowData);
        allUsersCache.current = aggregated;
        return aggregated;
      }
      return allUsersCache.current;
    } else {
      if (!userCache.current[selectedUser]) {
        const aggregated = aggregateSingleUser(selectedUser, rowData);
        userCache.current[selectedUser] = aggregated;
        return aggregated;
      }
      return userCache.current[selectedUser];
    }
  }, [selectedUser]);

  const chartOptions = () => {
    const seriesData = aggregatedData.reduce((acc, userData) => {
      userData.items.children.forEach((item: any, index: number) => {
        if (!acc[index]) {
          acc[index] = {
            name: item.label,
            data: [],
            color: item.fillColor,
          };
        }
        acc[index].data.push(+item.count);
      });
      return acc;
    }, [] as { name: string; data: number[]; color: string }[]);

    return {
      chart: {
        type: "column",
      },
      title: {
        text: "Daily Activity Overview",
      },
      xAxis: {
        categories: aggregatedData?.map((data) => data.date) ?? [],
        title: {
          text: "Date",
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Activity Count",
        },
        stackLabels: {
          enabled: true,
        },
      },
      legend: {
        reversed: true,
      },
      plotOptions: {
        series: {
          stacking: "normal",
        },
      },
      series: seriesData,
    };
  };

  const comparisonChartOption = useMemo(() => {
    const activityNames = Array.from(
      new Set(
        rowData.flatMap((user) =>
          user.totalActivity.map((activity) => activity.name)
        )
      )
    );

    const seriesData = rowData.map((user) => {
      return {
        name: user.name,
        data: activityNames.map((activityName) => {
          const activity = user.totalActivity.find(
            (a) => a.name === activityName
          );
          return activity ? parseInt(activity.value, 10) : 0;
        }),
        type: "line",
      };
    });

    return {
      chart: {
        type: "line",
      },
      title: {
        text: "Activity Comparison Across Users",
      },
      xAxis: {
        categories: activityNames,
        title: {
          text: "Activity Type",
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: "Total Activity Count",
        },
        lineWidth: 2,
      },
      legend: {
        layout: "vertical",
        align: "right",
        verticalAlign: "top",
        x: -10,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        shadow: true,
      },
      plotOptions: {
        line: {
          dataLabels: {
            enabled: true,
          },
          enableMouseTracking: true,
        },
      },
      series: seriesData,
    };
  }, [selectedUser]);

  const isloaded = ["fetched", "error"].includes(userActivityStatus);

  return {
    isloaded,
    chartOptions,
    comparisonChartOption,
  };
};
