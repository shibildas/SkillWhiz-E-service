import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

const Donut = ({ val ,heading}) => {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: val?.map((ele) => ele?._id?.toUpperCase()),
    datasets: [
      {
        label: "Experts",
        data: val?.map((ele) => ele?.expert_count),
        backgroundColor: [
          "rgba(255, 99, 132,1)",
          "rgba(54, 162, 235,1)",
          "rgba(255, 206, 86,1 )",
          "rgba(75, 192, 192,1 )",
          "rgba(153, 102, 255,2 )",
          "rgba(255, 159, 64, 2)",
          "rgba(255, 0, 0, 2)",
          "rgba(0, 0, 255, 2)",
          "rgba(255, 0, 255, 1)",
          "rgba(0, 255, 255, 1)",
          "rgba(128, 0, 0, 2)",
          "rgba(0, 128, 0, 2)",
          "rgba(0, 0, 128, 2)",
          "rgba(128, 128, 0, 2)",
          "rgba(128, 0, 128, 2)",
          "rgba(0, 128, 128, 2)",
          "rgba(128, 128, 128, 2)",
          "rgba(255, 255, 255, 2)",
          "rgba(255, 255, 0, 2)",
          "rgba(0, 255, 0,2 )",
        ],
        borderWidth: 2,
      },
    ],
  };

  // Define the chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            weight: "bold",
            color: "black"
          }
        }
      },
    },
  };

  return (
    <div className="p-2 md:p-5 md:col-2">
      <div className="chart-heading text-2xl font-semibold underline underline-offset-4">{heading}</div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default Donut;
