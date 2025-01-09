import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { selectTransactionsByDate } from "../../../redux/transaction/selectors";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartWithCenterText = () => {
  const filteredTransactions = useSelector(selectTransactionsByDate);

  const data = {
    labels: filteredTransactions?.categoriesSummary?.map((item) => item.name),
    datasets: [
      {
        label: "value",
        data:
          Array.isArray(filteredTransactions.categoriesSummary) &&
          (filteredTransactions?.categoriesSummary).length > 0
            ? filteredTransactions?.categoriesSummary.map((item) => item.total)
            : [1],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        enabled: true,
      },
      centerText: {
        display: true,
        text: filteredTransactions.periodTotal,
      },
    },
  };
  
  const centerTextPlugin = {  
    id: "centerText", 
    beforeDraw: (chart) => {
      if (
        chart.config.options.plugins.centerText.display !== null &&
        typeof chart.config.options.plugins.centerText.display !==
          "undefined" &&
        chart.config.options.plugins.centerText.display
      ) {
        const ctx = chart.ctx;
        const centerText = chart.config.options.plugins.centerText.text;
        const color = chart.config.options.plugins.centerText.color || "white";

        ctx.save();
        const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
        const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;
        ctx.textAlign = "center";
        ctx.fillStyle = color;
        ctx.textBaseline = "middle";
        ctx.font = "bold 24px sans-serif";
        ctx.fillText(centerText, centerX, centerY);
        ctx.restore();
      }
    },
  };

  ChartJS.register(centerTextPlugin);

  return (
    <Doughnut data={data} options={options} style={{ margin: "40px 0" }} />
  );
};

export default ChartWithCenterText;
