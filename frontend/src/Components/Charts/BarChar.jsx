// KPIDashboard.jsx (o BarChar.jsx)

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
// 🟢 Importación del componente Doughnut. Asegúrate de que esta ruta sea correcta.
import VehicleDoughnut from "./Donutchart";

import "../../styles/MainChart.css";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend
);

// El componente recibe urlBar y urlDoughnut
export default function KPIDashboard({ urlBar, urlDoughnut }) {
  const [labels, setLabels] = useState([]);
  const [totales, setTotales] = useState([]);
  const [loadingBar, setLoadingBar] = useState(true);

  // LÓGICA PARA LA GRÁFICA DE BARRAS
  useEffect(() => {
    if (!urlBar) {
      setLoadingBar(false);
      return;
    }

    fetch(urlBar)
      .then((res) => {
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        return res.json();
      })
      .then((data) => {
        const mesesBase = [
          "Ene",
          "Feb",
          "Mar",
          "Abr",
          "May",
          "Jun",
          "Jul",
          "Ago",
          "Sep",
          "Oct",
          "Nov",
          "Dic",
        ];

        const dataLabels = data.labels || [];
        const dataTotales = data.totales || [];

        // Asegura que todos los meses tengan un valor (0 si no hay datos)
        const totalesCompletos = mesesBase.map((mes) => {
          const index = dataLabels.indexOf(mes);
          return index !== -1 ? dataTotales[index] : 0;
        });

        setLabels(mesesBase);
        setTotales(totalesCompletos);
        setLoadingBar(false);
      })
      .catch((err) => {
        console.error("Error al cargar datos KPI (Bar Chart):", err);
        setLoadingBar(false);
      });
  }, [urlBar]);

  const kpiData = {
    labels,
    datasets: [
      {
        label: "Entradas por mes",
        data: totales,
        backgroundColor: "rgba(102, 185, 138, 0.59)",
        borderRadius: 4,
      },
    ],
  };

  const kpiOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => (value >= 1000 ? `${value / 1000}k` : value),
        },
      },
    },
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `Entradas: ${ctx.raw.toLocaleString()}`,
        },
      },
    },
  };

  const barContent = loadingBar ? (
    <div className="text-center">Cargando gráfica de entradas por mes...</div>
  ) : (
    <Bar data={kpiData} options={kpiOptions} />
  );

  return (
    <div className="row gy-4 align-items-center">
      {/* GRÁFICA DE BARRAS */}
      <div className="col-12 col-lg-8">
        <div className="bgBarChar shadow h-100 p-4">
          <h5 className="text-center mb-3">Entradas por mes</h5>
          {barContent}
        </div>
      </div>

      {/* GRÁFICA DOUGHNUT */}
      <div className="col-12 col-lg-4 h-100">
        <div className="bgBarDoug shadow py-4 d-flex align-items-center justify-content-center">
          {/* 🟢 Propagación de urlDoughnut al componente de la dona */}
          <VehicleDoughnut urlDoughnut={urlDoughnut} />
        </div>
      </div>
    </div>
  );
}
