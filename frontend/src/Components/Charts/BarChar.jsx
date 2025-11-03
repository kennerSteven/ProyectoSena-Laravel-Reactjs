// components/Charts/KPIDashboard.jsx
import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { kpiData, kpiOptions } from "./data/KpiData";
import { categoryData, categoryOptions } from "./data/DonutData";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const KPIDashboard = () => {
  return (
    <div className="d-flex justify-content-center gap-5 mt-4">
      <div style={{ width: "500px" }}>
        <Bar data={kpiData} options={kpiOptions} />
      </div>

      <div style={{ width: "250px" }}>
        <Doughnut data={categoryData} options={categoryOptions} />
      </div>
    </div>
  );
};

export default KPIDashboard;
