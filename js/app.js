import { CurrentDay } from './classes/currentDay.js';
import { CurrentTips } from './classes/currentTips.js';
import { ForecastDay } from './classes/forecastDay.js';
import {
  displayCurrentTips,
  displayCurrentWeather,
} from './views/currentWeatherView.js';
import { displayForecastDay } from './views/forecastView.js';
import {
  API_KEY_WEA,
  URL_WEATHER,
  URL_AQI,
  URL_LOCATION,
  API_KEY_LOC,
} from './config.js';

import { toggleDegrees } from './helpers.js';
import { toggleLoader } from './views/loaderView.js';

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const getApiData = async function (url, errorMsg = 'Something went wrong') {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  return await response.json();
};

const getAllApiData = async function () {
  toggleLoader();
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    const data = await Promise.all([
      // Weather info
      getApiData(
        `${URL_WEATHER}?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${API_KEY_WEA}&units=imperial`
      ),

      //Air quality info
      getApiData(
        `${URL_AQI}?lat=${latitude}&lon=${longitude}&appid=${API_KEY_WEA}`
      ),

      //Location Info
      getApiData(`${URL_LOCATION}token=${API_KEY_LOC}`),
    ]);

    setCurrentDay(data);

    setCurrentTips(data[0], data[1]);

    setForecastDay(data[0]);

    toggleDegrees();
  } catch (err) {
    console.error(err);
  }
  toggleLoader();
};

const setCurrentDay = function (data) {
  // Weather information
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
  const aqiArr = data[1].list.slice(0, 6);
  // const aqiArr = 0;

  // Location information
  const { city, region, country } = data[2];
  const currentLocation = Array.from([city, region, country]);

  // New current day object
  const currentWeather = new CurrentDay(
    dateTime,
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description,
    weatherId,
    weatherMain,
    aqiArr,
    currentTemp,
    feelsLike,
    currentLocation
  );

  // Display current weather object
  displayCurrentWeather(currentWeather);
};

const setCurrentTips = function (data_0, data_1) {
  const dateTime = data_0.current.dt;
  const dailyWeatherArr = data_0.daily;
  const morningTemp = data_0.daily[0].temp.morn;
  const eveningTemp = data_0.daily[0].temp.eve;
  const dayTemp = data_0.daily[0].temp.day;
  const aqiArr = data_1.list.slice(0, 6);

  const currentTips = new CurrentTips(
    dateTime,
    dailyWeatherArr,
    morningTemp,
    eveningTemp,
    dayTemp,
    aqiArr
  );

  displayCurrentTips(currentTips);
};

// Get all forecast data for the coming week
const filterForecastData = function (data) {
  // Exclude daily index 0 - it is the current day
  return data.daily.slice(1, data.daily.length);
};

const createForecastObject = function (dailyForecastArr) {
  const forecastObjArr = dailyForecastArr.map(day => {
    const dateTime = day.dt;
    const low = day.temp.min;
    const high = day.temp.max;
    const precipitation = day.pop;
    const weatherId = day.weather[0].id;
    const weatherMain = day.weather[0].main;
    const { description } = day.weather[0];
    const { sunrise, sunset } = day;
    const morningTemp = day.temp.morn;
    const eveningTemp = day.temp.eve;
    const dayTemp = day.temp.day;

    // New forecast day object
    const forecastWeatherDay = new ForecastDay(
      dateTime,
      low,
      high,
      precipitation,
      sunrise,
      sunset,
      description,
      weatherId,
      weatherMain,
      morningTemp,
      eveningTemp,
      dayTemp
    );
    return forecastWeatherDay;
  });
  return forecastObjArr;
};

const setForecastDay = function (data) {
  const dailyForecastArr = filterForecastData(data);

  const forecastDayArr = createForecastObject(dailyForecastArr);

  // Display each forecast day
  forecastDayArr.map(day => {
    displayForecastDay(day);
  });
};

// getAllApiData();
