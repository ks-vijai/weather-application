var data, allDetails;
document.getElementById("main").style.display = "none";
document.body.style.backgroundImage = 'url("./assets/loading.gif")';
document.body.style.backgroundPosition = "center top";
document.body.style.backgroundSize = "20%";

function getCityDateTime(cityName) {
  let getDateAndTime = new Promise(async (resolve, reject) => {
    try {
      let cityData = await fetch(`http://localhost:3000/?city=${cityName}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      resolve(cityData);
    } catch (error) {
      reject(error);
    }
  });
  return getDateAndTime;
}

function getNextFiveHours(cityDetails) {
  let getNextHrs = new Promise(async (resolve, reject) => {
    try {
      let nextFiveHours = await fetch(`http://localhost:3000/hourly-forecast`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cityDetails),
      });
      resolve(nextFiveHours);
    } catch (error) {
      reject(error);
    }
  });
  return getNextHrs;
}

function getAllCityDetails() {
  let getEveryData = new Promise(async (resolve, reject) => {
    try {
      let allCityData = await fetch(
        `http://localhost:3000/all-timezone-cities`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      resolve(allCityData);
    } catch (error) {
      reject(error);
    }
  });
  return getEveryData;
}

const arrayToObj = (arr, key) => {
  return arr.reduce((obj, item) => {
    obj[item[key].toLowerCase()] = item;
    return obj;
  }, {});
};

async function getAllData() {
  try {
    let allDetailsResponse = await getAllCityDetails();
    allDetails = await allDetailsResponse.json();
    data = arrayToObj(allDetails, "cityName");
  } catch (error) {
    console.log(error.message);
  }
}

async function check(cityName) {
  let cityNamesResponse = await getCityDateTime(cityName);
  let cityNames = await cityNamesResponse.json();
  cityNames.hours = 6;
  let getNextFiveHrsResponse = await getNextFiveHours(cityNames);
  let getNextFiveHrs = await getNextFiveHrsResponse.json();
  data[cityName.toLowerCase()].nextFiveHrs = getNextFiveHrs.temperature;
}

function changeData() {
  getAllData().then(() => {
    allCitySection();
    allCardsSection();
    allContinentSection();
    document.getElementById("main").style.display = "block";
    document.body.style.backgroundImage = 'url("./assets/background.svg")';
    document.body.style.backgroundSize = "300%";
  });
}

changeData();
setInterval(() => {
  changeData();
}, 3600000);
