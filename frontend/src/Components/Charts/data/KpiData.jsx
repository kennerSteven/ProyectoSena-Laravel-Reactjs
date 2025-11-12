// data/kpiData.js
export const kpiData = {
  labels: [
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
  ],
  datasets: [
    {
      label: "Ventas mensuales",
      data: [
        3200, 2800, 3000, 3500, 4900, 3100, 1800, 2700, 3600, 4800, 3300, 4700,
      ],
      backgroundColor: "rgba(102, 185, 138, 0.59)",
      borderRadius: 4,
    },
  ],
};

export const kpiOptions = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `${value / 1000}k`,
      },
    },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => `Ventas: ${ctx.raw.toLocaleString()}`,
      },
    },
  },
};
