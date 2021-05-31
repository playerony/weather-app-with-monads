const { Either } = require("./types");
const { OpenWeather } = require("./open-weather");

const Weather = (date, temperature) => ({
  date,
  temperature,
});

const toCelcius = (kelvin) =>
  Either.of(300)
    .map((maxKelvin) => maxKelvin - kelvin)
    .map((celcius) => celcius.toFixed(2))
    .chain((celcius) => celcius.concat("&deg;C"));

const getHoursFromLocaleDate = (date) =>
  Either.of(date)
    .map((newDate) => newDate.split(","))
    .map((splitedDate) => splitedDate[1])
    .chain((hours) => hours.trim());

const formatDate = (date) =>
  Either.of(new Date(date))
    .map((newDate) => newDate.toLocaleString())
    .chain(getHoursFromLocaleDate);

const toWeather = (date, temperature) =>
  Weather(formatDate(date), toCelcius(temperature));

const prepareItems = (weather) => toWeather(weather.dt, weather.main.temp);

const getWeatherItems = (zip) =>
  OpenWeather.fetch(zip).map((json) => json.list.map(prepareItems));

module.exports = { getWeatherItems };
