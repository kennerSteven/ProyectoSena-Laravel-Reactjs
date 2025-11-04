// data/categoryData.js
export const categoryData = {
  labels: ["Fashion and styles", "Sports", "Games"],
  datasets: [
    {
      data: [120, 88, 65],
      backgroundColor: [
        "rgba(51, 153, 92, 1)", // Verde oscuro
        "rgba(102, 185, 138, 1)", // Verde medio
        "rgba(153, 217, 184, 1)", // Verde claro
      ],
      borderWidth: 2,
    },
  ],
};

export const categoryOptions = {
  responsive: true,
  cutout: "0%", // grosor del centro
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#202020ff",
        font: { size: 14 },
      },
    },
    tooltip: {
      callbacks: {
        label: (ctx) => `${ctx.label}: ${ctx.raw} productos`,
      },
    },
  },
};
