const { OpenWeather } = require("./open-weather");

const Weather = (date, temperature) => ({
  date,
  temperature,
});

const toCelcius = (kelvin) => (300 - kelvin).toFixed(2);

const formatDate = (date) => new Date(date).toLocaleString();

const toWeather = (date, temperature) =>
  Weather(formatDate(date), toCelcius(temperature));

const prepareItems = (weather) => toWeather(weather.dt, weather.main.temp);

const getWeatherItems = (zip) =>
  OpenWeather.fetch(zip).map((json) => json.list.map(prepareItems));

module.exports = { getWeatherItems };
