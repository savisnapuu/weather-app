import _ from "lodash";
import "./style.css";
import Icon from "./waves.svg";
import "@splidejs/splide/css";
import Splide from "@splidejs/splide";
import * as dataw from "./getdata";
import * as hourly from "./hourlyweather";
import * as weekly from "./weeklyweather";
import * as todays from "./todaysweather";
import * as graph from "./graph";

let splideActive = false;
const CURRENT_TIME = new Date().toLocaleTimeString("en-US", {
  hour12: false,
  hour: "numeric",
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
  hourly.splide.destroy();
}

async function handleAll() {
  const weatherData = await dataw.getWeatherData.getData();
  if (weatherData === undefined) {
    removeLocationError();
    locationError();
    return;
  }
  removeLocationError();
  splideActive === true ? clearFields() : (splideActive = true);
  graph.clearGraphData();
  graph.pushGraphData();
  graph.data = getGraphData(weatherData);
  graph.labels = weekly.weeklyWeather.getWeekDays();
  graph.removeData(graph.myChart);
  graph.addData(graph.myChart, graph.labels, graph.data);
  hourly.hourlyWeather.displayHourly(weatherData);
  weekly.weeklyWeather.populateWeekly(weatherData);
  todays.todaysWeather.setTodayWeather(weatherData);
  hourly.splide.mount();
  console.log(graph.dataForGraph);
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
  handleAll();
});
