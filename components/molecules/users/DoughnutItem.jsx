import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
Chart.register(ArcElement);

const DoughnutItem = (props) => {
  const { skilChartDisplay } = props;
  return <Doughnut width="120px" height="120px" data={skilChartDisplay} />;
};

export default DoughnutItem;
