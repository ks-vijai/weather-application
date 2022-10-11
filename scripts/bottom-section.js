var dataValue;
var continentArrow = document.getElementById("continent-arrow");
var temperatureArrow = document.getElementById("temperature-arrow");
let timeIntervalColletions = [];

class LiveTimeCalculator extends CardConstructor {
  constructor() {
    super();
  }
}

var timeObject = new LiveTimeCalculator();

function allContinentSection() {
  dataValue = Object.values(data);

  /**
   *This function sort the Tiles according to the Continent Ascending or descending order
   *It also changed the arrow icons
   *It also calls sortContinentAsc() or sortContinentDesc() to needs
   *It calls createContinentCards() to produce cards
   */
  function sortByContinent() {
    if (continentArrow.name == "continent-arrrow-down") {
      sortContinentAsc();
      continentArrow.name = "continent-arrrow-up";
      continentArrow.src = "assets/arrowUp.svg";
    } else {
      sortContinentDesc();
      continentArrow.name = "continent-arrrow-down";
      continentArrow.src = "assets/arrowDown.svg";
    }
    createContinentCards();
  }

  /**
   *This function sorts the Continent in Ascending Order
   */
  function sortContinentAsc() {
    dataValue.sort(function (a, b) {
      a = a.timeZone.split("/")[0];
      b = b.timeZone.split("/")[0];
      if (a < b) return -1;
      else if (a > b) return 1;
      return 0;
    });
  }

  /**
   *This function sorts the Continent in Descending Order
   */
  function sortContinentDesc() {
    dataValue.sort(function (a, b) {
      a = a.timeZone.split("/")[0];
      b = b.timeZone.split("/")[0];
      if (a < b) return 1;
      else if (a > b) return -1;
      return 0;
    });
  }

  /**
   *This function sorts the Temperature in Ascending Order
   */
  function sortTemperatureAsc() {
    dataValue.sort(function (a, b) {
      if (a.timeZone.split("/")[0] == b.timeZone.split("/")[0]) {
        let c = parseInt(a.temperature);
        let d = parseInt(b.temperature);
        if (c < d) return -1;
        else if (c > d) return 1;
        return 0;
      }
    });
  }

  /**
   *This function sort the Tiles according to the Temperature Ascending or descending order
   *It also changed the arrow icons
   *It also calls sortTemperatureAsc() or sortTemperatureDsc() to needs
   *It calls createContinentCards() to produce cards
   */
  function sortByTemperature() {
    if (temperatureArrow.name == "temperature-arrrow-down") {
      sortTemperatureAsc();
      temperatureArrow.name = "temperature-arrrow-up";
      temperatureArrow.src = "assets/arrowUp.svg";
    } else {
      sortTemperatureDsc();
      temperatureArrow.name = "temperature-arrrow-down";
      temperatureArrow.src = "assets/arrowDown.svg";
    }
    createContinentCards();
  }

  /**
   *This function sorts the Temperature in Descending Order
   */
  function sortTemperatureDsc() {
    dataValue.sort(function (a, b) {
      if (a.timeZone.split("/")[0] == b.timeZone.split("/")[0]) {
        let c = parseInt(a.temperature);
        let d = parseInt(b.temperature);
        if (c < d) return 1;
        else if (c > d) return -1;
        return 0;
      }
    });
  }
  /**
   *This function listens to the arrow icon of temperature and continent
   */
  Constructor.prototype.defaultSortedValues = (function () {
    continentArrow.addEventListener("click", sortByContinent);
    temperatureArrow.addEventListener("click", sortByTemperature);
    sortContinentDesc();
    sortTemperatureAsc();
    createContinentCards();
  })();
}

/**
 *This function creates the card and append the valuese
 */
function createContinentCards() {
  let continentContainer = document.getElementById("continent-grid-section");
  continentContainer.replaceChildren();
  clearIntervalAll(timeIntervalColletions);
  for (let i = 0; i < 12; i++) {
    timeObject.setCityName(dataValue[i].cityName),
      timeObject.setDateAndTime(dataValue[i].dateAndTime),
      timeObject.setTimeZone(dataValue[i].timeZone),
      timeObject.setTemperature(dataValue[i].temperature),
      timeObject.setHumidity(dataValue[i].humidity),
      timeObject.setPrecipitation(dataValue[i].precipitation),
      timeObject.setNextFiveHrs(dataValue[i].nextFiveHrs);

    let cardDiv = document.createElement("div");
    let countryName = document.createElement("div");
    let temperature = document.createElement("div");
    let cityName = document.createElement("div");
    let tempIcons = document.createElement("div");
    let humidityIcon = document.createElement("img");
    let humidityValue = document.createElement("div");

    cardDiv.setAttribute("class", "continent-container");
    countryName.setAttribute("class", "country-name");
    temperature.setAttribute("class", "temperature");
    cityName.setAttribute("class", "city-section");
    tempIcons.setAttribute("class", "temp-icons");
    humidityIcon.setAttribute("alt", "Humidity Icon");
    humidityValue.setAttribute("class", "humidity-value");

    countryName.innerText = timeObject.getTimeZone().split("/")[0];
    temperature.innerText = timeObject.getTemperature();
    let t = `${temperatureArrow.name} ${timeObject.getCityName()}`;
    let timeout = setInterval(
      timeObject.liveTime,
      1,
      timeObject.getTimeZone(),
      cityName,
      0,
      timeObject.getCityName(),
      t
    );
    timeIntervalColletions.push(timeout);
    humidityIcon.setAttribute("src", "assets/humidityIcon.svg");
    humidityValue.innerText = timeObject.getHumidity();

    continentContainer.appendChild(cardDiv);
    cardDiv.appendChild(countryName);
    cardDiv.appendChild(temperature);
    cardDiv.appendChild(cityName);
    cardDiv.appendChild(tempIcons);
    tempIcons.appendChild(humidityIcon);
    tempIcons.appendChild(humidityValue);
  }
}
