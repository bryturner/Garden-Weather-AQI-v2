import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { ForecastDay } from './classes/forecastDay';
import { CurrentDay } from './classes/currentDay';
import { Day } from './classes/day';
import * as currentView from './views/currentWeatherView';
import * as view from './view';
import * as helpers from './helpers';

require('dotenv').config();
const api = process.env.API_KEY;

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
    // console.log(data);
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
  console.log(currentWeather.getWeatherIcon());
  currentView.displayCurrentWeather(currentWeather);
  // currentView.displayCurrentDetails(currentWeather);
};

// *** Display data on page
// console.dir(document.querySelector('.current-day-container'));
// const currentDayContainer = document.querySelector('.current-day-container');
// const currentDetailsList = document.querySelector('.current-details-list');

// console.dir(currentDetailsList);

// const displayCurrentDetails = function () {
//   currentDetailsList.innerHTML = `
// <li class="current-details-list-item">
//   <div class="current-detail-title">Sunrise</div>
//   <div class="current-detail" id="current-sunrise">${currentWeather.getSunrise()} </div>
// </li>

// <li class="current-details-list-item">
//   <div class="current-detail-title">Sunset</div>
//   <div class="current-detail" id="current-sunset">18:42</div>
// </li>

// <li class="current-details-list-item">
//   <div class="current-detail-title">Rain</div>
//   <div class="current-detail" id="current-rain">10%</div>
// </li>

// <li class="current-details-list-item">
//   <div class="current-detail-title">Low</div>
//   <div class="current-detail">
//     <span class="temp-select" id="current-low">60</span
//     ><span class="deg-style deg-select">&deg;F</span>
//   </div>
// </li>

// <li class="current-details-list-item">
//   <div class="current-detail-title">High</div>
//   <div class="current-detail">
//     <span class="temp-select" id="current-high">99</span
//     ><span class="deg-style deg-select">&deg;F</span>
//   </div>
// </li>

// <li class="current-details-list-item">
//   <div class="current-detail-title">AQI</div>
//   <div class="current-detail aqi-num" id="current-AQI">50</div>
// </li>`;
// };

// displayCurrentDetails();
