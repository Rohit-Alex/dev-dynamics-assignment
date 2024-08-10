import React from "react";
import { useDayWiseActivity } from "./useDayWiseActivity";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { Box } from "@mui/material";

const DayWiseActivityChart: React.FC = () => {
  const { chartOptions, isloaded, comparisonChartOption } =
    useDayWiseActivity();

  return (
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
      <Card
        sx={{ borderRadius: "8px" }}
        className={`shimmer-inactive-ctn ${!isloaded ? "" : "visible"}`}
      >
        <CardContent>
          <HighchartsReact highcharts={Highcharts} options={chartOptions()} />
        </CardContent>
      </Card>
      <Card
        sx={{ borderRadius: "8px" }}
        className={`shimmer-inactive-ctn ${!isloaded ? "" : "visible"}`}
      >
        <CardContent>
          <HighchartsReact
            highcharts={Highcharts}
            options={comparisonChartOption}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default DayWiseActivityChart;
