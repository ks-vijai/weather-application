const express = require("express");
const { fork } = require("child_process");
const app = express();
const timeZone = require("./scripts/timeZone.js");
var weatherResult = [];
const bodyParser = require("body-parser");
var startTime = new Date();
var dayCheck = 14400000;
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use("/index.html", express.static(__dirname));
app.get("/", function (req, res) {
  let city = req.query.city;
  let child = fork("./scripts/timeForOneCity.js");
  if (city) {
    child.send(city);
    child.on("message", (timeForOneCity) => {
      res.send(JSON.stringify(timeForOneCity));
    });
  } else {
    res.status(404).json({
      Error: "Not a valid endpoint",
    });
  }
});

app.get("/all-timezone-cities", function (req, res) {
  let currentTime = new Date();
  let child = fork("./scripts/allTimeZones.js");
  if (currentTime - startTime > dayCheck) {
    child.send("start");
    child.on("message", (allTimeZones) => {
      weatherResult = allTimeZones;
      res.json(weatherResult);
    });
  } else {
    if (weatherResult.length === 0) {
      child.send("start");
      child.on("message", (allTimeZones) => {
        weatherResult = allTimeZones;
        res.json(weatherResult);
      });
    } else {
      res.json(weatherResult);
    }
  }
});

app.post("/hourly-forecast", function (req, res) {
  let child = fork("./scripts/nextNhoursWeather.js");
  let cityCDN = req.body.city_Date_Time_Name;
  let hours = req.body.hours;
  if (cityCDN && hours) {
    let cityDetails = {
      cityCDN: req.body.city_Date_Time_Name,
      hours: req.body.hours,
      weatherData: weatherResult,
    };
    child.send(cityDetails);
    child.on("message", (nextNhoursWeather) => {
      res.json(nextNhoursWeather);
    });
  } else {
    res.status(404).json({
      Error: "Not a valid endpoint",
    });
  }
});

app.listen(3000);
