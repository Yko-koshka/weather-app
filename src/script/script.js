function showData() {
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let showData = document.querySelector("#show-data");
  let data = new Date();
  showData.innerHTML = `${days[data.getDay()]} ${data.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  })}`;
}
showData();

let apiKey = "b008b611bf4075eb12ea48ff1a84b599";

function convertDays(item) {
  let date = new Date(item * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let getData = response.data.daily;
  console.log(response);
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  getData.forEach(function (day, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col d-flex justify-content-center">
        <div class="card">
          <h6 class="card-title">${convertDays(day.dt)}</h6>
          <img
            src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png"
            class="card-img-top"
            alt="image"
          />
          <div class="card-body">
            <p class="card-text">${Math.round(day.temp.max)}°C</p>
            <p class="card-text">${Math.round(day.temp.min)}°C</p>
          </div>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getСoordinates(coord) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(displayForecast);
}

function showDegree(response) {
  celsiusTemperature = response.data.main.temp;
  let showDegree = Math.round(celsiusTemperature);
  let showWind = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let getDegree = document.querySelector("#show-degree");
  let showIcon = document.querySelector("#icon");

  showIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getDegree.innerHTML = `${showDegree}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${showWind}`;

  getСoordinates(response.data.coord);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  let getCity = document.querySelector("#show-city");
  getCity.innerHTML = `${city}`;

  axios.get(`${apiUrl}`).then(showDegree);
}
let submit = document.querySelector(".weather-form");
submit.addEventListener("submit", showCity);

// Fahrenheit and celsius

function snowFahrenheit(event) {
  event.preventDefault();
  let degree = document.querySelector("#show-degree");
  degree.innerHTML = `${Math.round((celsiusTemperature * 9) / 5 + 32)}`;

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}
let fahrenheit = document.querySelector("#show-fahrenheit");
fahrenheit.addEventListener("click", snowFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let degree = document.querySelector("#show-degree");
  degree.innerHTML = Math.round(celsiusTemperature);

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsiusTemperature = null;

let celsius = document.querySelector("#show-celsius");
celsius.addEventListener("click", showCelsius);
