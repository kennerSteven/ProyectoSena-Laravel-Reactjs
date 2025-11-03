// components/Charts/CategoryDonutChart.jsx
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { categoryData, categoryOptions } from "./data/DonutData";

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryDonutChart = () => {
  return (
    <div>
      <Doughnut data={categoryData} options={categoryOptions} />
    </div>
  );
};

export default CategoryDonutChart;
