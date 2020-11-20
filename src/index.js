function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

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
    "December"
  ];
  let month = months[date.getMonth()];

  let currentdate = date.getDate();

  let year = date.getFullYear();

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hour}:${minutes}`;
}
let currentTime = new Date();
let dateElement = document.querySelector("#current-time");
dateElement.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  let currentCityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector("#temperature");
  let descriptionElement = document.querySelector("#weather-description");
  let precipitationElement = document.querySelector("#precipitation");
  let windElement = document.querySelector("#wind-speed");
  let currentCity = response.data.name;
  let temperature = Math.round(response.data.main.temp);
  let description = response.data.weather[0].description;
  let precipitation = Math.round(response.data.rain);
  let humidity = Math.round(response.data.main.humidity);
  let windSpeed = response.data.wind.speed;
  currentCityElement.innerHTML = `${currentCity}`;
  temperatureElement.innerHTML = `${temperature}`;
  descriptionElement.innerHTML = `${description}`.toUpperCase();
  precipitationElement.innerHTML = `${precipitation}`;
  windElement.innerHTML = `${windSpeed}`;
}

function searchCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${cityInput.value}`;

  let apiKey = "e4b479c82c1bb09d985d3c924b5dcbf3";
  let cityName = cityInput.value;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", searchCity);


function currentLocation(position) {
  let apiKey = "e4b479c82c1bb09d985d3c924b5dcbf3";
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function showCurrentLocation(event) {
  navigator.geolocation.getCurrentPosition(currentLocation);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", showCurrentLocation)


function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature - 32) * 5 / 9);
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit)
