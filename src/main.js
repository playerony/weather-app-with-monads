const { getWeatherItems } = require("./weather");

const toLi = (weather) =>
  `<li>Hour: ${weather.date}<br/>Temperature: ${weather.temperature}</li>`;

const populateUI = (zip) =>
  getWeatherItems(zip).map((weathers) => weathers.map(toLi));

function app() {
  const input = document.getElementById("zip");
  const goButton = document.getElementById("go");
  const results = document.getElementById("results");

  goButton.addEventListener("click", () => {
    const zip = input.value.trim();

    populateUI(zip).fork(console.error, (html) => {
      results.innerHTML = html.join("");
    });
  });
}

app();
