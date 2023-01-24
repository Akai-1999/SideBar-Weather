const api = {
  key: "8bff8093b05d95b677165e8587bc41d2",
  base: "https://api.openweathermap.org/data/2.5/",
};

const classes = (classes) => document.querySelector(classes);

const dateBuild = (d) => {
  let months = [
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
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
};

const displyResult = (weather) => {
  let city = classes(".city");
  city.innerHTML = `${weather.name},${weather.sys.country}`;

  let now = new Date();
  let date = classes(".date");
  date.innerHTML = dateBuild(now);

  let temp = classes(".temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let status = classes(".status");
  status.innerHTML = weather.weather[0].main;

  let hiLow = classes(".hi-low");
  hiLow.innerHTML = `${Math.round(weather.main.temp_min)}°c/${Math.round(
    weather.main.temp_max
  )}°c`;
};

const getCity = (cityName) => {
  fetch(`${api.base}weather?units=metric&q=${cityName}&appid=${api.key}`)
    .then((resp) => {
      return resp.json();
    })
    .then(displyResult)

    .catch((err) => {
      console.log(err);
    });
};

const setQuery = (event) => {
  if (event.keyCode === 13) {
    getCity(searchbox.value);
  }
};

const searchbox = classes(".search-box");
searchbox.addEventListener("keypress", setQuery);

document.addEventListener("DOMContentLoaded", () => {
  getCity("london");
});
