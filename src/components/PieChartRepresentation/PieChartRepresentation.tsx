import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { PropsType } from "./types";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

import Shimmer from "components/Shimmer";

import { usePieChartRepresentation } from "./usePieChartRepresentation";

const PieChartRepresentation: React.FC<PropsType> = () => {
  const { isLoading, chartOptions } = usePieChartRepresentation();
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

export default PieChartRepresentation;
