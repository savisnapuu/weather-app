import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import * as dataw from "./getdata";

Chart.register(ChartDataLabels);
Chart.defaults.font.size = 12;
const ctx = document.getElementById("myChart");

export let data = [];
export let labels = [];

export let dataForGraph = {
  day: [],
  night: [],
  wind: [],
};

export function pushGraphData() {
  for (let i = 0; i < 7; i++) {
    dataForGraph.day.push(dataw.weatherData.daily[i].temp.day.toFixed());
    dataForGraph.night.push(dataw.weatherData.daily[i].temp.night.toFixed());
    dataForGraph.wind.push(dataw.weatherData.daily[i].wind_speed.toFixed());
  }
}

export function clearGraphData() {
  dataForGraph.day = [];
  dataForGraph.night = [];
  dataForGraph.wind = [];
}

const graphButtons = document.querySelectorAll(".graph-header-item");
graphButtons.forEach((item) =>
  item.addEventListener("click", () => {
    if (item.dataset.value === "day") {
      removeData(myChart);
      addData(myChart, labels, dataForGraph.day);
    } else if (item.dataset.value === "night") {
      removeData(myChart);
      addData(myChart, labels, dataForGraph.night);
    } else if (item.dataset.value === "wind") {
      removeData(myChart);
      addData(myChart, labels, dataForGraph.wind);
    }
  })
);

export function addData(chart, label, data) {
  chart.data.labels = label;
  chart.data.datasets.forEach((dataset) => {
    dataset.data = data;
  });
  chart.update();
}

export function removeData(chart) {
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
        borderColor: "#f2dba5",
        tension: 0.2,
      },
    ],
  },
  options: {
    elements: {
      line: {
        borderWidth: 2,
      },
      point: {
        pointStyle: "circle",
        backgroundColor: "#f2dba5",
      },
    },
    layout: {
      padding: 10,
    },
    plugins: {
      tooltip: {
        enabled: false,
      },
      datalabels: {
        color: "white",
        anchor: "start",
        align: "top",
        formatter: Math.round,
        font: {
          family: "'Poppins', sans-serif",
          weight: "normal",
          size: 14,
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
          color: "#c5c5c5ba",
          font: {
            weight: "normal",
            family: "'Poppins', sans-serif",
          },
          autoSkip: false,
          maxRotation: 0,
          minRotation: 0,
        },
        grid: {
          borderColor: "#b2b2b24a",
          display: false,
        },
      },
      y: {
        type: "linear",
        grace: 3,
        display: false,
        grid: {
          display: false,
        },
      },
    },
  },
});
