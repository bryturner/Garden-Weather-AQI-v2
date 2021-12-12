import "core-js/stable";
import "regenerator-runtime/runtime";

require("dotenv").config();
const api = process.env.API_KEY;

// API call functions to get data after current position is found
const getWeather = async function (url, errorMsg = "Something went wrong") {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  return await response.json();
};

const getAirQuality = async function (url, errorMsg = "Something went wrong") {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  return await response.json();
};

const getLocation = async function (url, errorMsg = "Something went wrong") {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  return await response.json();
};

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// Get all information at the same time using Promise.all

const getWeatherAirLocationData = async function () {
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    const data = await Promise.all([
      getWeather(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,alerts&appid=${api}&units=imperial`
      ),
      getAirQuality(
        `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${api}`
      ),
      getLocation(`https://geocode.xyz/${latitude},${longitude}?geoit=json`),
    ]);
    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

getWeatherAirLocationData();
