import * as dataFnc from "./getdata";

export const todaysWeather = {
  setTodayWeather: (weatherData) => {
    const todaysTemp = document.getElementById("todays-weather-temp");
    const todaysIcon = document.getElementById("todays-weather-icon");
    const todaysLocation = document.getElementById("todays-weather-location");
    const todaysWind = document.getElementById("todays-weather-wind");
    const todaysHumidity = document.getElementById("todays-weather-humidity");
    const todaysFeels = document.getElementById("todays-weather-feels");
    const uviSlider = document.getElementById("uvi-slider");
    const weatherDescription = document.getElementById("weather-description");
    const chanceOfRain = document.getElementById(
      "weather-extra-chance-of-rain"
    );
    const windDegree = document.getElementById("weather-extra-wind-degree");
    todaysTemp.textContent = `${weatherData.current.temp.toFixed()}`;
    todaysIcon.src = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`;
    todaysLocation.textContent = `${dataFnc.currentCity}, ${dataFnc.currentCountry}`;
    todaysWind.textContent = `${weatherData.current.wind_speed.toFixed()}m/s`;
    todaysHumidity.textContent = weatherData.current.humidity;
    todaysFeels.textContent = `${weatherData.current.feels_like.toFixed()}°`;
    weatherDescription.textContent = weatherData.current.weather[0].main;
    uviSlider.value = weatherData.current.uvi.toFixed();
    uviRange(Number(weatherData.current.uvi.toFixed()));
    chanceOfRain.textContent = `${(
      weatherData.hourly[0].pop * 100
    ).toFixed()}%`;
    windDegree.style.rotate = `${weatherData.current.wind_deg}deg`;
  },
};

export function uviRange(num) {
  const indicator = document.getElementById("uvi-indicator");
  if (num <= 2) {
    indicator.textContent = "Low";
    indicator.style.backgroundColor = "#9fddba";
  } else if (num <= 5) {
    indicator.textContent = "Moderate";
    indicator.style.backgroundColor = "#f2dba5";
  } else if (num <= 7) {
    indicator.textContent = "High";
    indicator.style.backgroundColor = "#ff9191";
  } else {
    indicator.textContent = "Very high";
    indicator.style.backgroundColor = "#b92e2c";
    indicator.style.color = "white";
  }
}
