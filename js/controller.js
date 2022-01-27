import * as model from './models/model.js';
import * as currentDayView from './views/currentWeatherView.js';
import * as forecastDayView from './views/forecastView.js';
import * as currentDayTipsView from './views/currentTipsView.js';
import { toggleLoader } from './views/loaderView.js';
import CurrentWeather from './models/currentDayModel.js';
import ForecastWeather from './models/forecastDayModel.js';
import CurrentTips from './models/currentTipsModel.js';

// Add timeout error handling on all control functions
const controlCurrentWeather = async function () {
  const currentWeatherData = await model.setCurrentWeather();

  const currentDay = new CurrentWeather(currentWeatherData);

  currentDayView.displayCurrentWeather(currentDay);
};

const controlForecastWeather = async function () {
  const forecastWeatherDataArray = await model.setForecastWeather();

  const forecastDayArray = forecastWeatherDataArray.map(weatherData => {
    const forecastWeather = new ForecastWeather(weatherData);
    return forecastWeather;
  });

  forecastDayArray.map(forecastDay =>
    forecastDayView.displayForecastDay(forecastDay)
  );
};

const controlCurrentTips = async function () {
  const currentWeatherData = await model.setCurrentTips();

  const currentDayTips = new CurrentTips(currentWeatherData);

  currentDayTipsView.displayCurrentTipsTemps(currentDayTips.currentTempsArray);

  currentDayTipsView.displayCurrentTipsPrecip(
    currentDayTips.futurePrecipPercentage
  );

  currentDayTipsView.displayCurrentTipsDate(currentDayTips.currentDate);

  currentDayTipsView.displayCurrentTipsAqi(currentDayTips.aqiData);
};

const controlToggleDegrees = function () {
  const degreeChangeCheckbox = document.querySelector('.deg-checkbox');
  const degreeAbbreviations = document.querySelectorAll('.deg-select');
  const temperatureNumbers = document.querySelectorAll('.temp-select');

  if (degreeChangeCheckbox.checked) {
    temperatureNumbers.forEach(temp => {
      temp.innerText = Math.round((+temp.innerText - 32) / 1.8);
    });
    degreeAbbreviations.forEach(
      deg => (deg.innerText = `${String.fromCharCode(0x00b0)}C`)
    );
  } else {
    temperatureNumbers.forEach(temp => {
      temp.innerText = Math.round((+temp.innerText * 9) / 5 + 32);
    });
    degreeAbbreviations.forEach(
      deg => (deg.innerText = `${String.fromCharCode(0x00b0)}F`)
    );
  }
};

const controlForecastDropdown = function (i) {
  const forecastTipContainers = Array.from(
    document.querySelectorAll('.forecast-tips-container')
  );

  const forecastTipsInner = Array.from(
    document.querySelectorAll('.forecast-tips-inner')
  );

  forecastTipContainers[i].classList.toggle('collapsed');
  forecastTipsInner[i].classList.toggle('hidden');
};

export const init = async function () {
  toggleLoader();
  await controlCurrentWeather();
  await controlForecastWeather();
  await controlCurrentTips();
  forecastDayView.addHandlerForecastDropdown(controlForecastDropdown);
  currentDayView.addHandlerToggleDegrees(controlToggleDegrees);
  toggleLoader();
};
