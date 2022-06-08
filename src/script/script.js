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
  console.log(data.getDay());
}
showData();

let apiKey = "b008b611bf4075eb12ea48ff1a84b599";

function showDegree(response) {
  console.log(response);
  let showDegree = Math.round(response.data.main.temp);
  let showWind = Math.round(response.data.wind.speed);
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let getDegree = document.querySelector("#show-degree");

  getDegree.innerHTML = `${showDegree}`;
  humidity.innerHTML = `${response.data.main.humidity}`;
  wind.innerHTML = `${showWind}`;
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
  degree.innerHTML = `${Math.round((degree.innerHTML * 9) / 5 + 32)}`;
}
let fahrenheit = document.querySelector("#show-fahrenheit");
fahrenheit.addEventListener("click", snowFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let degree = document.querySelector("#show-degree");
  degree.innerHTML = "15";
}
let celsius = document.querySelector("#show-celsius");
celsius.addEventListener("click", showCelsius);

// Geolocation

function showGeolocation(response) {
  let showDegreeGeolocation = Math.round(response.data.main.temp);
  let showCityGeolocation = response.data.name;
  let showCity = document.querySelector("#show-city");
  let getWindRound = Math.round(response.data.wind.speed);
  let getHumidity = document.querySelector("#humidity");
  let getWind = document.querySelector("#wind");
  let showDegree = document.querySelector("#show-degree");

  showCity.innerHTML = `${showCityGeolocation}`;
  showDegree.innerHTML = `${showDegreeGeolocation}`;
  getHumidity.innerHTML = `${response.data.main.humidity}`;
  getWind.innerHTML = `${getWindRound}`;
}

let getLocation = document.querySelector("#get-location");
getLocation.addEventListener("click", (event) => {
  event.preventDefault();
  if ("geolocation in naviganor") {
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      let positionCity = `lat=${lat}&lon=${lon}`;
      let apiUrlPosition = `https://api.openweathermap.org/data/2.5/weather?${positionCity}&units=metric&appid=${apiKey}`;

      axios.get(`${apiUrlPosition}`).then(showGeolocation);
    });
  } else {
    console.log("error");
  }
});
