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

function showDegree(response) {
  let showDegree = Math.round(response.data.main.temp);
  let getDegree = document.querySelector("#show-degree");
  getDegree.innerHTML = `${showDegree}`;
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

function showGeolocation(response) {
  let showDegreeGeolocation = Math.round(response.data.main.temp);
  let showCityGeolocation = response.data.name;
  let showCity = document.querySelector("#show-city");
  showCity.innerHTML = `${showCityGeolocation}`;
  let showDegree = document.querySelector("#show-degree");
  showDegree.innerHTML = `${showDegreeGeolocation}`;
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
