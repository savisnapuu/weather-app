import _ from "lodash";
import "./style.css";
import Icon from "./waves.svg";
import "@splidejs/splide/css";
import Splide from "@splidejs/splide";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import i01d from "./01d.svg";
import i02d from "./02d.svg";
import i03d from "./03d.svg";
import i04d from "./04d.svg";
import i09d from "./09d.svg";
import i10d from "./10d.svg";
import i11d from "./11d.svg";
import i13d from "./13d.svg";
import i50d from "./50d.svg";
import i01n from "./01n.svg";

const APIKEY = "f4b9cb96b45e07e5787dbae9d0d6f6db";
let splideActive = false;
const CURRENT_TIME = new Date().toLocaleTimeString("en-US", {
  hour12: false,
  hour: "numeric",
});

let currentCountry = "";
let currentCity = "";

const getWeatherData = {
  getData: async () => {
    const data = await getWeatherData.geoCoding();
    currentCountry = data[0].country;
    currentCity = data[0].name;
    if (data === "Error") return;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${data[0].lat}&lon=${data[0].lon}&units=metric&exclude=minutely&appid=${APIKEY}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
    return response;
  },
  geoCoding: async () => {
    const city = getWeatherData.submitQuery();
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=f4b9cb96b45e07e5787dbae9d0d6f6db`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data.length === 0 ? "Error" : data;
      });
    return response;
  },
  submitQuery: () => {
    const input = document.getElementById("search-location");
    const location = input.value;
    return location;
  },
};

const hourlyWeather = {
  getTime: () => {
    let time = Number(CURRENT_TIME);
    let arr = [];
    for (let i = 0; i < 48; i++) {
      time === 23 ? (time = 0) : (time += 1);
      let a = String(time);
      a.length === 1 ? arr.push(`0${a}:00`) : arr.push(`${a}:00`);
    }
    return arr;
  },
  displayHourly: (weatherData) => {
    const splide = document.getElementById("hourly-cards");
    const time = hourlyWeather.getTime();
    for (let i = 0; i < time.length; i++) {
      const div = document.createElement("div");
      div.classList.add("splide__slide");
      div.innerHTML = hourlyWeather.hourlyHtml(
        time[i],
        weatherData.hourly[i].weather[0].icon,
        Number(weatherData.hourly[i].temp).toFixed(1)
      );
      splide.appendChild(div);
    }
  },
  hourlyHtml: (time, icon, temp) => {
    const divHtml = `
    <div>
      <h2 class="hourly-time">${time}</h>
    </div>
      <img class="hourly-card-icon" src="https://openweathermap.org/img/wn/${icon}@2x.png">
      <h2 class="hourly-temp">${temp}°</h2>
    </div>
    `;
    return divHtml;
  },
};

const weeklyWeather = {
  weekdays: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
    "Monday",
  ],
  month: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  getDay: () => {
    const d = new Date();
    let day = d.getDay();
    let arr = [];
    for (let i = 0; i < 7; i++) {
      arr.push(weeklyWeather.weekdays[day + i].slice(0, 3));
    }
    return arr;
  },
  getDate: (inc) => {
    const today = new Date();
    const date = today.getDate();
    const m = new Date();
    const month = weeklyWeather.month[m.getMonth()];
    return `${date + inc} ${month}`;
  },
  getDayTemp: (i, weatherData) => weatherData.daily[i].temp.max.toFixed(),
  getNightTemp: (i, weatherData) => weatherData.daily[i].temp.min.toFixed(),
  getWindSpeed: (i, weatherData) => weatherData.daily[i].wind_speed.toFixed(1),
  getIcon: (i, weatherData) => weatherData.daily[i].weather[0].icon,
  populateWeekly: (weatherData) => {
    const container = document.getElementById("weekly-weather-container");
    const days = weeklyWeather.getDay();
    for (let i = 0; i < 7; i++) {
      const div = document.createElement("div");
      div.classList.add("weekly-weather");
      const day = days[i];
      const date = weeklyWeather.getDate(i);
      const dayTemp = weeklyWeather.getDayTemp(i, weatherData);
      const nightTemp = weeklyWeather.getNightTemp(i, weatherData);
      const icon = weeklyWeather.getIcon(i, weatherData);
      div.innerHTML = weeklyWeather.weeklyHtml(
        day,
        date,
        dayTemp,
        nightTemp,
        icon
      );
      container.appendChild(div);
    }
  },
  weeklyHtml: (day, date, dayTemp, nightTemp, icon) => {
    const divHtml = `
          <div class="weekly-weather-row">
            <div class="weekly-weather-date">
              <div>
                <h2>${day}</h2>
                <p>${date}</p>
              </div>
            </div>
            <div class="weekly-weather-day-night">
              <div class="weekly-weather-day">
                <h2>${dayTemp}°</h2>
              </div>
              <div class="weekly-weather-night">
                <h2>${nightTemp}°</h2>
              </div>
            </div>
            <div class="weekly-weather-icon">
              <img
                id="weekly-weather-icon"
                src="https://openweathermap.org/img/wn/${icon}@2x.png"
              />
            </div>
          </div>
    `;
    return divHtml;
  },
};

const todaysWeather = {
  setTodayWeather: (weatherData) => {
    const todaysTemp = document.getElementById("todays-weather-temp");
    const todaysIcon = document.getElementById("todays-weather-icon");
    const todaysLocation = document.getElementById("todays-weather-location");
    const todaysWind = document.getElementById("todays-weather-wind");
    const todaysHumidity = document.getElementById("todays-weather-humidity");
    const todaysFeels = document.getElementById("todays-weather-feels");
    todaysTemp.textContent = `${weatherData.current.temp.toFixed()}`;
    todaysIcon.src = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`;
    todaysLocation.textContent = `${currentCity}, ${currentCountry}`;
    todaysWind.textContent = `${weatherData.current.wind_speed.toFixed()}m/s`;
    todaysHumidity.textContent = weatherData.current.humidity;
    todaysFeels.textContent = `${weatherData.current.feels_like.toFixed()}°`;
  },
};

let splide = new Splide(".splide", {
  type: "slide",
  perPage: 6,
  gap: "1em",
  trimSpace: true,
  breakpoints: {
    640: {
      perPage: 4,
    },
    1024: {
      perPage: 6,
    },
    1366: {
      perPage: 8,
    },
    1920: {
      perPage: 8,
    },
    2560: {
      perPage: 10,
    },
  },
  perMove: 1,
  start: 0,
  pagination: false,
});

function clearFields() {
  const myNode = document.getElementById("hourly-cards");
  const myNode2 = document.getElementById("weekly-weather-container");
  while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  }
  while (myNode2.firstChild) {
    myNode2.removeChild(myNode2.lastChild);
  }
  splide.destroy();
}

async function test1() {
  const weatherData = await getWeatherData.getData();
  if (weatherData === undefined) {
    removeLocationError();
    locationError();
    return;
  }
  removeLocationError();
  splideActive === true ? clearFields() : (splideActive = true);
  data = getGraphData(weatherData);
  removeData(myChart);
  addData(myChart, weeklyWeather.getDay(), data);
  hourlyWeather.displayHourly(weatherData);
  weeklyWeather.populateWeekly(weatherData);
  todaysWeather.setTodayWeather(weatherData);
  splide.mount();
}

function locationError() {
  const searchError = document.getElementById("search-section");
  const h2 = document.createElement("h2");
  h2.id = "error-message";
  h2.textContent = "No results found";
  searchError.appendChild(h2);
}

function removeLocationError() {
  const el = document.getElementById("error-message");
  if (el === null) return;
  el.remove();
}

function getGraphData(weatherData) {
  let arr = [];
  for (let i = 0; i < 7; i++) {
    arr.push(weatherData.daily[i].temp.max);
  }
  return arr;
}

const button = document.getElementById("search-location-button");
button.addEventListener("click", () => {
  test1();
});

function addData(chart, label, data) {
  chart.data.labels = label;
  chart.data.datasets.forEach((dataset) => {
    dataset.data = data;
  });
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => {
    dataset.data.pop();
  });
  chart.update();
}

Chart.register(ChartDataLabels);

let data = [];
let labels = [];

const ctx = document.getElementById("myChart");

Chart.defaults.font.size = 10;
const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
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
