import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

const AreaChart = ({ val, heading }) => {
  const data = {
    labels: val?.map((ele) => ele?.date),
    datasets: [
      {
        label: "Sales-Last 30 Days",
        data: val?.map((ele) => ele?.count),
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 8,
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        ticks: {
          color: "#374151",
        },
      },
      y: {
        ticks: {
          color: "#374151",
          beginAtZero: true,
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
            color: "black"
          }
        },
      },
    },
  };
  return (
    <div className="p-2 md:p-5 md:col-10">
      <div className="chart-heading text-2xl font-semibold underline underline-offset-4">
        {heading}
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default AreaChart;
