import * as dataFnc from "./getdata"

export const todaysWeather = {
    setTodayWeather: (weatherData) => {
      const todaysTemp = document.getElementById("todays-weather-temp");
      const todaysIcon = document.getElementById("todays-weather-icon");
      const todaysLocation = document.getElementById("todays-weather-location");
      const todaysWind = document.getElementById("todays-weather-wind");
      const todaysHumidity = document.getElementById("todays-weather-humidity");
      const todaysFeels = document.getElementById("todays-weather-feels");
      todaysTemp.textContent = `${weatherData.current.temp.toFixed()}`;
      todaysIcon.src = `https://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@4x.png`;
      todaysLocation.textContent = `${dataFnc.currentCity}, ${dataFnc.currentCountry}`;
      todaysWind.textContent = `${weatherData.current.wind_speed.toFixed()}m/s`;
      todaysHumidity.textContent = weatherData.current.humidity;
      todaysFeels.textContent = `${weatherData.current.feels_like.toFixed()}°`;
    },
  };