const { Task } = require("./types");
const { compose } = require("ramda");
const { apiKey, apiUrl } = require("../env");

const makeWeatherUrl = (zip) =>
  `${apiUrl}/data/2.5/forecast?zip=${zip},us&APPID=${apiKey}`;

const fetchIt = (url) =>
  Task((rej, res) =>
    fetch(url)
      .then((x) => x.json())
      .then(res)
      .catch(rej)
  );

const OpenWeather = {
  fetch: compose(fetchIt, makeWeatherUrl),
};

module.exports = { OpenWeather };
