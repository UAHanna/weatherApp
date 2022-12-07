let now = new Date();
let h3 = document.querySelector("h3");
let date = now.getDate();
let year = now.getFullYear();
let months = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
h3.innerHTML = `${day}, ${date} ${month} ${year}, <br>${hours}:${minutes}`;

function showWeather(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;
  let outside = document.querySelector("#now-outside");
  outside.innerHTML = response.data.weather[0].main;
  let temperature = document.querySelector("#now-temp");
  celsiusTemperature = response.data.main.temp;
  temperature.innerHTML = Math.round(celsiusTemperature);
  let wind = document.querySelector("#now-wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#now-humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#now-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrenheitTemperature);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperature = document.querySelector("#now-temp");
  temperature.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

function searchCity(city) {
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  searchCity(city);
}

function showPosition(position) {
  let apiKey = "f09d3949047ab6c9e3bcaf79cf61f619";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handSubmit);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", currentLocation);
searchCity("Kyiv");
