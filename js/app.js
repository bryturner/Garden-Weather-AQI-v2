import "core-js/stable";
import "regenerator-runtime/runtime";
import ForecastDay from "./classes/forecastDay";
import CurrentDay from "./classes/currentDay";
import * as view from "./view";
import * as helpers from "./helpers";

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
    view.renderLoading();

    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    const data = await Promise.all([
      getWeather(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${api}&units=imperial`
      ),
      getAirQuality(
        `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${api}`
      ),
      getLocation(`https://geocode.xyz/${latitude},${longitude}?geoit=json`),
    ]);
    const weatherData = data[0];
    const airQualityData = data[1];
    const locationData = data[2];
    console.log(weatherData);
    console.log(airQualityData);
    console.log(locationData);
  } catch (err) {
    console.error(err);
  }
};

getWeatherAirLocationData();
