function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayIndex];

  return `${day} ${hours}:${minutes}`;
}

function displayWeatherCondition(response) {
  document.querySelector("#h1").innerHTML = response.data.name;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector(
    ".humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity} %`;
  document.querySelector(".wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} km/s`;
  document.querySelector(".precipitation").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".form_input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "5ef4de8cd6b7fefcd7c42f98cf464ce8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp-F");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".temp-C");
  temperatureElement.innerHTML = 19;
}

let dateElement = document.querySelector(".h2");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector(".form-search");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector(".btn2");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Brussels");
