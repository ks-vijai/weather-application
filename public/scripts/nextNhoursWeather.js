const WeatherForTimeZones = require("./timeZone.js");
var WeatherIns = new WeatherForTimeZones();

const nextNhoursWeather = (cityTDN, hours, lastForecast) => {
  return WeatherIns.nextNhoursWeather(cityTDN, hours, lastForecast);
};

process.on("message", (cityDetails) => {
  if (cityDetails) {
    let nextHoursWeather = nextNhoursWeather(
      cityDetails.cityCDN,
      cityDetails.hours,
      cityDetails.weatherData
    );
    process.send(nextHoursWeather);
  }
});
