import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import Box from "@mui/material/Box";

import Shimmer from "components/Shimmer";

import { useUserActivitySummary } from "./useUserActivitySummary";

const UserActivitySummary = () => {
  const { isLoading, chartOptions } = useUserActivitySummary();

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
