// data/categoryData.js
export const categoryData = {
  labels: ['Fashion and styles', 'Sports', 'Games'],
  datasets: [{
    data: [120, 88, 65],
    backgroundColor: ['#33995C', '#66B98A', '#99D9B8'],
    borderWidth: 2
  }]
};

export const categoryOptions = {
  responsive: true,
  cutout: '0%', // grosor del centro
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: '#202020ff',
        font: { size: 14 }
      }
    },
    tooltip: {
      callbacks: {
        label: ctx => `${ctx.label}: ${ctx.raw} productos`
      }
    }
  }
};