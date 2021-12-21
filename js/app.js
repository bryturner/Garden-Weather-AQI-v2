import "core-js/stable";
import "regenerator-runtime/runtime";
import ForecastDay from "./classes/forecastDay";
import CurrentDay from "./classes/currentDay";
import Day from "./classes/day";
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
    console.log(data[0]);
    // Current location information
    const { city, state, prov } = data[2];
    const currentLocation = Array.from([prov, state, city]);

    // Current weather information
    const dateTime = data[0].current.dt;
    const low = data[0].daily[0].temp.min;
    const high = data[0].daily[0].temp.max;
    const feelsLike = data[0].current.feels_like;
    const currentTemp = data[0].current.temp;
    const precipitation = data[0].daily[0].pop;
    const weatherId = data[0].current.weather[0].id;
    const weatherMain = data[0].current.weather[0].main;
    const { description } = data[0].current.weather[0];
    const { sunrise, sunset } = data[0].daily[0];

    // Array of air quality data for the next 6 hours to be used for current weather info
    const aqi = data[1].list.slice(0, 6);

    // Forecast weather information for the next 5 days
    const weatherData = data[0].daily.slice(1, 6);

    // Create current weather object
    const currentWeather1 = new CurrentDay(
      dateTime,
      low,
      high,
      precipitation,
      sunrise,
      sunset,
      description,
      aqi,
      currentTemp,
      feelsLike,
      currentLocation,
      weatherId,
      weatherMain
    );

    console.log(currentWeather1);
    // Create forecast objects
  } catch (err) {
    console.error(err);
  }
  // view.renderLoading();
};

getWeatherAirLocationData();
