export const weeklyWeather = {
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