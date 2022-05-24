import "@splidejs/splide/css";
import Splide from "@splidejs/splide";

const CURRENT_TIME = new Date().toLocaleTimeString("en-US", {
  hour12: false,
  hour: "numeric",
});

export let splide = new Splide(".splide", {
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

export const hourlyWeather = {
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