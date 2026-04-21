const apiKey = "f937e33fb572c454ec82f6e9283c72a4";

async function getWeather() {
  const city = document.getElementById("cityInput").value;

  if (!city) {
    alert("Please enter a city name");
    return;
  }
document.getElementById("weatherResult").innerHTML = "Loading...";


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404") {
      document.getElementById("weatherResult").innerHTML =
        "<p>City not found</p>";
      return;
    }

    displayWeather(data);

  } catch (error) {
    console.error(error);
  }
}

function displayWeather(data) {
  const icon = data.weather[0].icon;

  const html = `
    <h2>${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p>${data.weather[0].description}</p>
    <h3>${data.main.temp}°C</h3>
  `;

  document.getElementById("weatherResult").innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("cityInput").addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      getWeather();
    }
  });
});


