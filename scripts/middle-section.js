var sunny = [];
var snow = [];
var wind = [];
var selectedIcon = "sunny";
var weatherObject;
let timeIntervalColletion = [];
class CardConstructor extends Constructor {
  constructor() {
    super();
  }
  /**
   *This function process the live time and date
   *It also writes the values in the card
   *It also calls calculateLiveTime()
   * @param {*} cityName - Selected city name
   * @param {*} time - Time Id of Card
   * @param {*} date - Date Id of Card
   */
  liveTime(timeZone, time, date, cityName, c) {
    let date_time = calculateLiveTime(timeZone);
    date_time = date_time.split(",");
    let currentDate = date_time[0].split("/");
    let currentTime = date_time[1].split(" ");
    let timeNow = currentTime[1];
    let [monthValue, dateValue, yearValue] = currentDate;
    let [hour, minute, second] = timeNow.split(":");
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (dateValue < 10) {
      dateValue = "0" + dateValue;
    }
    time.innerHTML = `${hour}:${minute} ${currentTime[2]}`;
    if (date)
      date.innerHTML = `${dateValue}-${
        month_values[monthValue - 1]
      }-${yearValue}`;
    else {
      time.innerHTML = `${cityName}, ${hour}:${minute} ${currentTime[2]}`;
    }
  }
  /**
   *This function creates elements for cards and writes the values in it
   *It also appends to the container of card
   * @param {*} selectedImg - Weather Icon selected
   * @param {*} i - Iterator
   * @param {*} weatherIcon - Icon corresponding to the temperature value
   * @param {*} cardContainer - Container of card section
   */
  createCard(selectedImg, i, weatherObject, weatherIcon, cardContainer) {
    let cardDiv = document.createElement("div");
    let cardCity = document.createElement("div");
    let cityName = document.createElement("h2");
    let temp = document.createElement("div");
    let temperature = document.createElement("div");
    let icon = document.createElement("img");
    let degree = document.createElement("h2");
    let cardDetail = document.createElement("div");
    let time = document.createElement("h3");
    let date = document.createElement("h3");
    let temperatureHumidity = document.createElement("div");
    let humidity = document.createElement("p");
    let humidityIcon = document.createElement("img");
    let temperaturePrecipitation = document.createElement("div");
    let prep = document.createElement("p");
    let prepIcon = document.createElement("img");

    cardDiv.setAttribute("class", "cards");
    cardDiv.setAttribute("id", "cards");
    cardDiv.setAttribute(
      "style",
      `background-image:url('assets/${selectedImg[i][0]}.svg')`
    );
    cardCity.setAttribute("class", "card-city");
    cityName.setAttribute("class", "city-name");
    temp.setAttribute("class", "card-right");
    temperature.setAttribute("class", "heading-icon");
    icon.setAttribute("class", "sunny-icon");
    icon.setAttribute("alt", "Sunny Icon");
    icon.setAttribute("src", `${weatherIcon}`);
    degree.setAttribute("class", "degree-temperature");
    cardDetail.setAttribute("class", "card-bottom");
    date.setAttribute("class", "card-date");
    temperatureHumidity.setAttribute("class", "temp-icons");
    humidity.setAttribute("class", "temperature-icons");
    humidityIcon.setAttribute("alt", "Humidity-Icon");
    humidityIcon.setAttribute("src", "assets/humidityIcon.svg");
    temperaturePrecipitation.setAttribute("class", "temp-icons");
    prep.setAttribute("class", "temperature-icons");
    prepIcon.setAttribute("alt", "Precipitation-Icon");
    prepIcon.setAttribute("Src", "assets/precipitationIcon.svg");

    cardDiv.appendChild(cardCity);
    cardCity.appendChild(cityName);
    cardCity.appendChild(temp);
    temp.appendChild(temperature);
    temperature.appendChild(icon);
    temperature.appendChild(degree);
    cardDiv.appendChild(cardDetail);
    cardDetail.appendChild(time);
    cardDetail.appendChild(date);
    cardDetail.appendChild(temperatureHumidity);
    temperatureHumidity.appendChild(humidityIcon);
    temperatureHumidity.appendChild(humidity);
    cardDetail.appendChild(temperaturePrecipitation);
    temperaturePrecipitation.appendChild(prepIcon);
    temperaturePrecipitation.appendChild(prep);

    cityName.innerText = weatherObject.getCityName();
    degree.innerText = weatherObject.getTemperature();
    timeout = setInterval(
      weatherObject.liveTime,
      1,
      weatherObject.getTimeZone(),
      time,
      date,
      0,
      weatherObject.getCityName()
    );
    timeIntervalColletion.push(timeout);
    humidity.innerHTML = weatherObject.getHumidity();
    prep.innerHTML = weatherObject.getPrecipitation();
    cardContainer.appendChild(cardDiv);
  }
}
function allCardsSection() {
  var objectData = Object.entries(data);
  (() => {
    let sunnyData = objectData.filter(
      ([key, value]) =>
        parseInt(value.temperature) > 29 &&
        parseInt(value.humidity) < 50 &&
        parseInt(value.precipitation) >= 50
    );
    let snowData = objectData.filter(
      ([key, value]) =>
        parseInt(value.temperature) > 20 &&
        parseInt(value.temperature) < 29 &&
        parseInt(value.humidity) > 50 &&
        parseInt(value.precipitation) < 50
    );
    let windData = objectData.filter(
      ([key, value]) =>
        parseInt(value.temperature) < 20 && parseInt(value.humidity) >= 50
    );

    /**
     *This function sorts the Object data respect to temperature
     */
    function sorting() {
      sunny = sunnyData.sort(function (a, b) {
        return parseInt(b[1].temperature) - parseInt(a[1].temperature);
      });
      snow = snowData.sort(function (a, b) {
        return parseInt(b[1].precipitation) - parseInt(a[1].precipitation);
      });
      wind = windData.sort(function (a, b) {
        return parseInt(b[1].humidity) - parseInt(a[1].humidity);
      });
    }
    sorting();
    document
      .getElementById("input-number")
      .addEventListener("change", cardNumber);
    document
      .getElementById("left-carousel")
      .addEventListener("click", scrollLeft);
    document
      .getElementById("right-carousel")
      .addEventListener("click", scrollRight);
  })();

  var weatherSource = {
    sunnyValue: sunny,
    snowValue: snow,
    windValue: wind,
  };
  var cardValue = document.getElementById("input-number").value;

  document
    .getElementById("sunny-weather")
    .addEventListener("click", () => iconChange("sunny"));
  document
    .getElementById("snow-weather")
    .addEventListener("click", () => iconChange("snow"));
  document
    .getElementById("rainy-weather")
    .addEventListener("click", () => iconChange("rainy"));

  /**
   *This function sets the border of selected button
   *It aslo calls the cardNumber()
   * @param {*} imgId - It contains the id value of the image
   */
  function iconChange(imgId) {
    document.getElementById("sunny").style.borderBottom = "none";
    document.getElementById("snow").style.borderBottom = "none";
    document.getElementById("rainy").style.borderBottom = "none";
    if (imgId == "sunny") {
      selectedIcon = "sunny";
      document.getElementById(imgId).style.borderBottom = "2px solid blue";
    } else if (imgId == "snow") {
      selectedIcon = "snowflake";
      document.getElementById(imgId).style.borderBottom = "2px solid blue";
    } else {
      selectedIcon = "windy";
      document.getElementById(imgId).style.borderBottom = "2px solid blue";
    }
    cardNumber();
  }

  /**
   *This function process the spinner value limits from 3 to 10
   * @param {*} cardValue - Value in the spinner
   * @return {*} Returns the proper spinner value
   */
  function maxValue(cardValue) {
    if (cardValue < 3) return 3;
    else if (cardValue > 10) return 10;
    else return cardValue;
  }

  /**
   *This function returns the array of selected weather icon
   * @return {*} Returns the array of selected icon
   */
  function imgSelected() {
    if (selectedIcon == "sunny") return this.sunnyValue;
    else if (selectedIcon == "snowflake") return this.snowValue;
    else return this.windValue;
  }

  /**
   *This function create and delete the cards according to the spinner value
   *It also calls weatherImage() for currently selected weather icon
   *It also calls CreateCard() to create cards
   *It also have the cardAlignment() to align the cards
   */
  function cardNumber() {
    cardValue = document.getElementById("input-number").value;
    cardValue = maxValue(cardValue);
    let selectedImg = imgSelected.call(weatherSource);
    if (selectedImg.length < cardValue) cardValue = selectedImg.length;
    let cardContainer = document.getElementById("card-section");
    cardContainer.replaceChildren();
    clearIntervalAll(timeIntervalColletion);
    weatherObject = new CardConstructor();
    if (cardValue > 0) {
      for (let i = 0; i < cardValue; i++) {
        weatherObject.setCityName(selectedImg[i][1].cityName);
        weatherObject.setDateAndTime(selectedImg[i][1].dateAndTime);
        weatherObject.setTimeZone(selectedImg[i][1].timeZone);
        weatherObject.setTemperature(selectedImg[i][1].temperature);
        weatherObject.setHumidity(selectedImg[i][1].humidity);
        weatherObject.setPrecipitation(selectedImg[i][1].precipitation);
        weatherObject.setNextFiveHrs(selectedImg[i][1].nextFiveHrs);
        let imageSelected = parseInt(weatherObject.getTemperature());
        let weatherIcon = weatherImage(imageSelected);
        weatherObject.createCard(
          selectedImg,
          i,
          weatherObject,
          weatherIcon,
          cardContainer
        );
      }
      if (cardValue < 4) {
        document.getElementById("card-section").style.justifyContent = "center";
        function cardAlignment(media) {
          if (media.matches) {
            document.getElementById("card-section").style.justifyContent =
              "normal";
          }
        }
        let media = window.matchMedia("(max-width: 990px)");
        cardAlignment(media);
        media.addEventListener("change", cardAlignment);
      } else {
        document.getElementById("card-section").style.justifyContent =
          "flex-start";
      }
    } else {
      for (let i = cardValue; i != 0; i++) {
        cardContainer.removeChild(cardContainer.lastElementChild);
      }
    }
  }

  /**
   *This function scrolls carousel for left side
   */
  function scrollLeft() {
    var container = document.getElementById("card-section");
    container.scrollLeft -= 400;
    container.style.scrollBehavior = "smooth";
  }

  /**
   *This function scrolls carousel for Right side
   */
  function scrollRight() {
    let container = document.getElementById("card-section");
    container.scrollLeft += 400;
    container.style.scrollBehavior = "smooth";
  }

  /**
   *This function shows carousel only there are more than four cards
   *It removes the carousel when there are less than four cards
   */
  function buttonHide() {
    var carousel = document.getElementsByClassName("arrow-button");
    var cards = document.getElementById("card-section");
    for (let i = 0; i < carousel.length; i++) {
      if (cards.scrollWidth > cards.clientWidth) {
        carousel[i].style.display = "block";
      } else {
        carousel[i].style.display = "none";
      }
    }
  }

  setInterval(buttonHide, 1);

  //This function calls the card with default values when window reloads
  cardNumber();
}
function clearIntervalAll(timeIntervalColletion) {
  while (timeIntervalColletion.length > 0) {
    clearInterval(timeIntervalColletion.pop());
  }
}
