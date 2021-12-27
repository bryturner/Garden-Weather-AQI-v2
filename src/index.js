import { ForecastDay } from './js/classes/forecastDay';
import { CurrentDay } from './js/classes/currentDay';
import { Day } from './js/classes/day';
import * as currentView from './js/views/currentWeatherView';
import * as forecastView from './js/views/forecastView';

// import 'dotenv';

// dotenv.config();
// require('dotenv').config();
// const api = process.env.API_KEY;
const api = 'bca38502a60e9869e3bb916116cb6752';

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
  try {
    const pos = await getPosition();
    const { latitude, longitude } = pos.coords;
    const data = await Promise.all([
      // Weather info
      getApiData(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely,alerts&appid=${api}&units=imperial`
      ),

      //Air quality info
      getApiData(
        `https://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${latitude}&lon=${longitude}&appid=${api}`
      ),

      //Location Info
      getApiData(`https://geocode.xyz/${latitude},${longitude}?geoit=json`),
    ]);

    setCurrentDay(data);

    //Only need data from one object in the array
    //sortForecastData(data[0]);

    setForecastDay(data[0]);
  } catch (err) {
    console.error(err);
  }
};

getAllApiData();

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

  // Location information
  const { city, state, prov } = data[2];
  const currentLocation = Array.from([city, state, prov]);

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
  console.log(currentWeather);

  // Display current weather object
  // console.log(currentWeather.getWeatherIcon());
  currentView.displayCurrentWeather(currentWeather);
};

// Get all forecast data other than the current day at index 0
const filterForecastData = function (data) {
  const dailyForecastArr = data.daily.slice(1, data.daily.length);
  const forecastDayArr = dailyForecastArr.map(day => {
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
  return forecastDayArr;
};

const setForecastDay = function (data) {
  const forecastDayArr = filterForecastData(data);

  forecastDayArr.map(day => forecastView.displayForecastDay(day));
};
