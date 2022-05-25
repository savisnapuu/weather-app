const APIKEY = "f4b9cb96b45e07e5787dbae9d0d6f6db";

export let weatherData = "";

export const getWeatherData = {
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
    weatherData = response;
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

export let currentCountry = "";
export let currentCity = "";
