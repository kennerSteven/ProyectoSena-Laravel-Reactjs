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
import "../../styles/MainChart.css";
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
    <div className="row  gy-4 align-items-center">
      <div className="col-12 col-lg-8">
        <div className="bgBarChar shadow h-100">
          <Bar data={kpiData} options={kpiOptions} />
        </div>
      </div>

      <div className="col-12 col-lg-4  h-100">
        <div className="bgBarDoug shadow py-4  d-flex align-items-center justify-content-center">
          <Doughnut data={categoryData} options={categoryOptions} />
        </div>
      </div>
    </div>
  );
};

export default KPIDashboard;
