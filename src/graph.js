import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);
Chart.defaults.font.size = 10;
const ctx = document.getElementById("myChart");

let data = [];
let labels = [];

export function addData(chart, label, data) {
    chart.data.labels = label;
    chart.data.datasets.forEach((dataset) => {
      dataset.data = data;
    });
    chart.update();
  }
  
  export function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }

  export const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Weather",
          data: data,
          fill: false,
          borderColor: "#14213d",
          tension: 0.1,
        },
      ],
    },
    options: {
      layout: {
        padding: 20,
      },
      plugins: {
        datalabels: {
          anchor: "start",
          align: "top",
          formatter: Math.round,
          font: {
            weight: "lighter",
            size: 12,
          },
        },
        legend: {
          display: false,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          ticks: {
            autoSkip: false,
            maxRotation: 0,
            minRotation: 0,
          },
          grid: {
            display: false,
          },
        },
        y: {
          y: {
            type: "linear",
            grace: "5%",
          },
          display: false,
          grid: {
            display: false,
          },
        },
      },
    },
  });