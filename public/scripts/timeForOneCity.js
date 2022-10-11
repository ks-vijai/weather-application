const WeatherForTimeZones = require("./timeZone.js");
var WeatherIns = new WeatherForTimeZones();

const timeForOneCity = (cityName) => {
  return WeatherIns.getTimeForOneCity(cityName);
};

process.on("message", (cityName) => {
  if (cityName) {
    let timeForCity = timeForOneCity(cityName);
    process.send(timeForCity);
  }
});
