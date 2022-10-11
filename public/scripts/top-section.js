var timeout;
var cityNames = [];
const month_values = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

class Constructor {
  constructor() {
    this.setCityName = function (cityName) {
      this.cityName = cityName;
    };
    this.getCityName = function () {
      return this.cityName;
    };
    this.setDateAndTime = function (dateAndTime) {
      this.dateAndTime = dateAndTime;
    };
    this.getDateAndTime = function () {
      return this.dateAndTime;
    };
    this.setTimeZone = function (timeZone) {
      this.timeZone = timeZone;
    };
    this.getTimeZone = function () {
      return this.timeZone;
    };
    this.setTemperature = function (temperature) {
      this.temperature = temperature;
    };
    this.getTemperature = function () {
      return this.temperature;
    };
    this.setHumidity = function (humidity) {
      this.humidity = humidity;
    };
    this.getHumidity = function () {
      return this.humidity;
    };
    this.setPrecipitation = function (precipitation) {
      this.precipitation = precipitation;
    };
    this.getPrecipitation = function () {
      return this.precipitation;
    };
    this.setNextFiveHrs = function (nextFiveHrs) {
      this.nextFiveHrs = nextFiveHrs;
    };
    this.getNextFiveHrs = function () {
      return this.nextFiveHrs;
    };
  }
  /**
   *This function updates the date and time according to city
   *It also calls livetime() to update live date and time
   * @param {*} selectedCityIndex - This value is the Index of selected city in the data Object
   * @param {*} value - It carries the value of valid ~ 'Yes' and invalid ~ 'Nill'
   * @return {void}
   */
  citySection(obj, value) {
    let cityNameId = document.getElementById("city-img");
    let timeId = document.getElementById("city-time");
    let dateId = document.getElementById("city-date");
    let sessionId = document.getElementById("session-img");
    if (value == "null") {
      cityNameId.src = "assets/warning.svg";
      sessionId.src = "assets/warning.svg";
      timeId.innerHTML = "NIL";
      dateId.innerHTML = "NIL";
      obj.weatherCalculation(obj, "null", "null", value);
      return;
    }
    cityNameId.src = `assets/${this.getCityName().toLowerCase()}.svg`;

    /**
     *This function changes the hourState icon according to live time
     * @param {*} sessionValue - It has the hourState of selected city
     */
    let sessionSet = (sessionValue) => {
      let sessionId = document.getElementById("session-img");
      if (sessionValue === "AM") {
        sessionId.src = "assets/amState.svg";
      } else {
        sessionId.src = "assets/pmState.svg";
      }
    };

    /**
     *This function fetches and prints the live date and time
     *It also calls weatherForNxtFiveHrs()
     * @param {*} value - It carries the value of valid ~ 'Yes' and invalid ~ 'Nill'
     * @return {void}
     */
    Constructor.prototype.LiveTime = function (value) {
      return function update() {
        if (value == "null") {
          clearTimeout(timeout);
          obj.weatherCalculation(obj, "null", "null", value);
          return;
        }
        let date_time = calculateLiveTime(obj.getTimeZone());
        date_time = date_time.split(",");
        let currentDate = date_time[0].split("/");
        let currentTime = date_time[1].split(" ");
        let timeNow = currentTime[1];
        sessionSet(currentTime[2]);
        let [monthValue, dateValue, yearValue] = currentDate;
        let [hour, minute, second] = timeNow.split(":");
        if (hour < 10) {
          hour = "0" + hour;
        }
        if (dateValue < 10) {
          dateValue = "0" + dateValue;
        }
        timeId.innerHTML = `${hour}:${minute}:<small>${second}</small>`;
        dateId.innerHTML =
          dateValue + "-" + month_values[monthValue - 1] + "-" + yearValue;
        weatherForNxtFiveHrs(obj, currentTime[2], hour);
        timeout = setTimeout(update, 400, this);
      };
    };
    const live = obj.LiveTime(value);
    live();
  }
  /**
   *This function changes the temperature,humidity,precipitation values according to the city
   * @param {*} selectedCityIndex - This value is the Index of selected city in the data Object
   * @param {*} value - It carries the value of valid ~ 'Yes' and invalid ~ 'Nill'
   * @return {void}
   */
  temperatureSection(obj, value) {
    let temperatureId = document.getElementById("temperature");
    let humidityId = document.getElementById("humidity");
    let precipitationId = document.getElementById("precipitation");
    let farenheitId = document.getElementById("farenheit");
    let farenheit = parseInt(this.getTemperature()) * 1.8 + 32;

    if (value == "null") {
      temperatureId.innerHTML = "NIL";
      humidityId.innerHTML = "NIL";
      precipitationId.innerHTML = "NIL";
      farenheitId.innerHTML = "NIL";
      return;
    }

    temperatureId.innerHTML = this.getTemperature();
    humidityId.innerHTML = this.getHumidity();
    precipitationId.innerHTML = this.getPrecipitation();
    farenheit = farenheit.toFixed(1) + " °F";
    farenheitId.innerHTML = farenheit;
  }
  /**
   *This function updates the weather for next Five hours
   * @param {*} selectedCityIndex - This value is the Index of selected city in the data Object
   * @param {*} sessionTime - It has the current hourState
   * @param {*} alterTime - It has the alter of the hourState
   * @param {*} value - It carries the value of valid ~ 'Yes' and invalid ~ 'Nill'
   * @return {void}
   */
  weatherCalculation(obj, sessionTime, alterTime, value) {
    let count = 0;
    let currentTime = value;
    let tempFiveHrs = obj.getNextFiveHrs();
    let weatherTime = document.getElementsByClassName("time-hours");
    let tempSection = document.getElementsByClassName("temp-value");
    let weatherId = document.getElementById("weather-image");
    let firstTemp = document.getElementById("temp-number");
    let imageClass = document.getElementsByClassName("weather-icons");

    if (value == "null") {
      weatherId.src = "assets/warning.svg";
      firstTemp.innerHTML = "NIL";
      let nilImg = document.getElementsByClassName("time-line-img");
      for (let i = 0; i < 5; i++) {
        tempSection[i].innerHTML = "NIL";
        imageClass[i].src = "assets/warning.svg";
        weatherTime[i].innerHTML = "NIL";
        nilImg[i].style.width = "40px";
        nilImg[i].style.height = "20px";
      }
      nilImg[5].style.width = "40px";
      nilImg[5].style.height = "20px";
      return;
    }

    weatherId.src = weatherImage(parseInt(this.getTemperature()));
    firstTemp.innerHTML = parseInt(this.getTemperature());
    while (count < 5) {
      let currentTemp = parseInt(tempFiveHrs[count]);
      tempSection[count].innerHTML = currentTemp;
      imageClass[count].src = weatherImage(currentTemp);
      currentTime++;
      if (currentTime == 12) sessionTime = alterTime;
      else if (currentTime > 12) currentTime -= 12;
      weatherTime[count].innerHTML = `${currentTime} ${sessionTime}`;
      count++;
    }
  }
}

/**
 *This function invokes when there is a change in city.
 *It finds whether the city name is valid.
 *For valid city it calls citySection() and temperatureSection() to update respective city details.
 *For invalid values it shows null values.
 * @return {void}
 */
var obj;
async function cityChange() {
  let selectedCity = document.getElementById("city-dropdown").value;
  let selectedCityIndex = 0;
  for (let i in cityNames) {
    if (selectedCity == cityNames[i]) break;
    selectedCityIndex++;
  }
  if (selectedCityIndex < cityNames.length) {
    await check(selectedCity);
    selectedCity = selectedCity.toLowerCase();
    obj = new Constructor();
    obj.setCityName(data[selectedCity].cityName);
    obj.setDateAndTime(data[selectedCity].dateAndTime);
    obj.setTimeZone(data[selectedCity].timeZone);
    obj.setTemperature(data[selectedCity].temperature);
    obj.setHumidity(data[selectedCity].humidity);
    obj.setPrecipitation(data[selectedCity].precipitation);
    obj.setNextFiveHrs(data[selectedCity].nextFiveHrs);
    clearTimeout(timeout);
    obj.citySection(obj, "yes");
    obj.temperatureSection(obj, "yes");
  } else {
    obj.citySection(obj, "null");
    clearTimeout(timeout);
    obj.temperatureSection(obj, "null");
  }
}

/**
 *This function checks the hourState and calls weatherCalculation() with hourState
 * @param {*} selectedCityIndex - This value is the Index of selected city in the data Object
 * @param {*} value - It carries the value of valid ~ 'Yes' and invalid ~ 'Nill'
 * @param {*} hour - It has the current hour value of livetime
 * @return {*} Returns the findSession()
 */
function weatherForNxtFiveHrs(obj, value, hour) {
  let amSession = "AM";
  let pmSession = "PM";
  let sessionTime = value;

  /**
   *This function checks the hourState and calls weatherCalculation() with hourState
   * @return {void}
   */
  function findSession() {
    if (sessionTime == amSession) {
      obj.weatherCalculation(obj, "AM", pmSession, hour);
    } else {
      obj.weatherCalculation(obj, "PM", amSession, hour);
    }
  }
  return findSession();
}

/**
 *This function compares the temperature and assigns the icon path
 * @param {*} temp_value - It was the current temp value
 * @return {*} iconPath - Returns the path of the cloud icons
 */
let weatherImage = (temp_value) => {
  let iconPath;
  if (temp_value < 18) iconPath = "assets/rainyIcon.svg";
  else if (temp_value >= 18 && temp_value <= 22)
    iconPath = "assets/windyIcon.svg";
  else if (temp_value >= 23 && temp_value < 29)
    iconPath = "assets/cloudyIcon.svg";
  else iconPath = "assets/sunnyIcon.svg";
  return iconPath;
};

/**
 *This function fetches the live time of selected city
 * @param {*} cityValue - Currently selected city
 * @return {*} Returns the live date time of selected city
 */
function calculateLiveTime(timeZone) {
  let date_time = new Date().toLocaleString("en-US", {
    timeZone: timeZone,
  });
  return date_time;
}

function allCitySection() {
  /**
   *This function fetches the data and seperated into arrays
   *It also appends the option in datalist
   *It also invokes cityChange() when there is a change in city
   * @return {void}
   */
  Constructor.prototype.defaultValues = (function () {
    let element = document.getElementById("cities");
    for (let keys in data) {
      cityNames.push(data[keys].cityName);
    }
    for (let values in cityNames) {
      let option = document.createElement("option");
      option.value = cityNames[values];
      element.appendChild(option);
    }
    //CitySection calls for default value to display live data
    cityChange();
    document
      .getElementById("city-dropdown")
      .addEventListener("change", cityChange);
  })();
}

// export { calculateLiveTime, month_values, weatherImage };
