// Donutchart.jsx (Ahora soporta 'totales' y 'porcentajes' con mejor estilo y asegura la visualización del Doughnut)

import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DEFAULT_COLORS = [
  "#36A2EB", // Azul
  "rgba(51, 153, 92, 0.68)", // Verde Oscuro
  "rgba(255, 159, 64, 0.63)", // Naranja
  "#FF6384", // Rojo-Rosado
  "rgba(102, 185, 138, 0.59)", // Verde Medio
  "#FFCE56", // Amarillo
  "rgba(153, 217, 184, 0.63)", // Verde Claro
];

// Opciones del Doughnut con Tooltip dinámico y estilo mejorado
const getDoughnutOptions = (isPercentage) => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: "10%", // 📐 Ajustado para un agujero más visible
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#495057", // Color de texto más neutral
        font: { size: 14, family: "sans-serif" },
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const value = ctx.raw; // Ajusta el tooltip basado en si son porcentajes o totales
          return isPercentage
            ? `${ctx.label}: ${value.toFixed(2)}%`
            : `${ctx.label}: ${value.toLocaleString()} entradas`; // Usar toLocaleString para totales grandes
        },
      },
    },
  },
});

const DEFAULT_CHART_DATA = {
  labels: ["Sin datos disponibles"],
  datasets: [
    {
      label: "Datos no disponibles",
      data: [1],
      backgroundColor: ["#E9ECEF"], // Color gris claro para sin datos
      borderWidth: 0,
    },
  ],
};

// Componente de Spinner para una mejor experiencia de carga
const LoadingSpinner = () => (
  <div
    className="d-flex justify-content-center align-items-center h-100"
    style={{ minHeight: "200px" }}
  >
    <div className="spinner-border text-success" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  </div>
);

// Componente de Mensaje de Error/Sin Datos (Solo para errores críticos de conexión)
const DataMessage = ({ title, message }) => (
  <div
    className="d-flex justify-content-center align-items-center h-100 text-center text-muted"
    style={{ minHeight: "200px" }}
  >
    <div>
      <h6 className="mb-2">{title}</h6>
      <p className="small text-danger">{message}</p>
    </div>
  </div>
);

export default function VehicleDoughnut({ urlDoughnut }) {
  const [chartData, setChartData] = useState(DEFAULT_CHART_DATA);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("Cargando Distribución...");
  const [isPercentage, setIsPercentage] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setHasError(false); // Resetear el estado de error
    setErrorMessage(""); // 1. Manejo de URL no proporcionada/inválida

    if (!urlDoughnut || urlDoughnut === "undefined") {
      setLoading(false);
      setTitle("Datos no configurados");
      setChartData(DEFAULT_CHART_DATA); // ⬅️ CORRECCIÓN: Establece datos por defecto
      return;
    }

    fetch(urlDoughnut)
      .then((res) => {
        if (!res.ok)
          throw new Error("Error en la respuesta de la API: " + res.statusText);
        return res.json();
      })
      .then((data) => {
        let currentIsPercentage = false;
        let chartTitle = "";
        let dataSetData = [];
        let validData = false; // Flag para determinar si los datos son usables // 🟢 Lógica de Detección: 1. PORCENTAJES (Perfiles)

        if (data.porcentajes && data.labels && data.labels.length > 0) {
          currentIsPercentage = true;
          chartTitle = "Distribución por Perfil (%)";
          dataSetData = data.porcentajes;
          validData = true;
        } // 🟢 Lógica de Detección: 2. TOTALES (Vehículos)
        else if (data.totales && data.labels && data.labels.length > 0) {
          currentIsPercentage = false;
          chartTitle = "Entradas por Tipo de Vehículo";
          dataSetData = data.totales;
          validData = true;
        } // ❌ Caso de respuesta vacía o sin el formato esperado (Conexión OK, Datos NO OK)

        if (!validData) {
          setTitle("Sin Datos Válidos");
          setChartData(DEFAULT_CHART_DATA); // ⬅️ CORRECCIÓN: Establece datos por defecto
          setLoading(false);
          return;
        } // Si hay datos válidos, configura el gráfico

        const chartConfig = {
          labels: data.labels,
          datasets: [
            {
              label: chartTitle,
              data: dataSetData,
              backgroundColor: DEFAULT_COLORS.slice(0, data.labels.length),
              borderWidth: 2,
            },
          ],
        };

        setIsPercentage(currentIsPercentage);
        setTitle(chartTitle);
        setChartData(chartConfig);
        setLoading(false);
      })
      .catch((err) => {
        // 🛑 Manejo de ERROR CRÍTICO de Conexión (Este SÍ activa el hasError)
        console.error("❌ ERROR CRÍTICO de Fetch en DonutChart:", err);
        setTitle("Error de Conexión");
        setErrorMessage(
          `Fallo al cargar la API: ${err.message.slice(0, 50)}...`
        );
        setHasError(true);
        setLoading(false);
      });
  }, [urlDoughnut]);

  if (loading) {
    return <LoadingSpinner />;
  } // Solo se muestra el error crítico de DataMessage si hasError es TRUE (falla de fetch/conexión).

  if (hasError) {
    return (
      <div style={{ maxWidth: "400px", margin: "auto", height: "100%" }}>
        <h5 className="text-center mb-3">{title}</h5>
        <DataMessage title={title} message={errorMessage} />
      </div>
    );
  } // Renderiza el gráfico (será el DEFAULT_CHART_DATA si los datos no eran válidos).

  return (
    <div style={{ maxWidth: "400px", margin: "auto", height: "100%" }}>
      <h5 className="text-center mb-3">{title}</h5>
      <div style={{ height: "300px" }}>
        <Doughnut data={chartData} options={getDoughnutOptions(isPercentage)} />
      </div>
    </div>
  );
}
