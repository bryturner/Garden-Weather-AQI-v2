import * as model from './models/model.js';
import * as currentDayView from './views/currentWeatherView.js';
import * as forecastDayView from './views/forecastView.js';
import * as currentDayTipsView from './views/currentTipsView.js';
import { displayError } from './views/errorView.js';
import { toggleLoader } from './views/loaderView.js';
import CurrentWeather from './models/currentDayModel.js';
import ForecastWeather from './models/forecastDayModel.js';
import CurrentTips from './models/currentTipsModel.js';

const controlCurrentWeather = async function () {
  const currentWeatherData = await model.getCurrentWeatherData();

  const currentDay = new CurrentWeather(currentWeatherData);

  currentDayView.displayCurrentWeather(currentDay);
};

const controlCurrentTips = async function () {
  const currentWeatherData = await model.getCurrentTipsData();

  const currentDayTips = new CurrentTips(currentWeatherData);

  currentDayTipsView.displayCurrentTipsBelowMedia1080(currentDayTips);

  currentDayTipsView.displayCurrentTipsAboveMedia1080(currentDayTips);
};

const controlForecastWeather = async function () {
  const forecastWeatherDataArray = await model.getForecastWeatherData();

  const forecastDayArray = forecastWeatherDataArray.map(weatherData => {
    const forecastWeather = new ForecastWeather(weatherData);
    return forecastWeather;
  });

  forecastDayArray.map(forecastDay =>
    forecastDayView.displayForecastDay(forecastDay)
  );
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

const initHandlers = function () {
  forecastDayView.addHandlerForecastDropdown(controlForecastDropdown);
  currentDayView.addHandlerToggleDegrees(controlToggleDegrees);
};

export const init = async function () {
  toggleLoader();
  try {
    await controlCurrentWeather();
    await controlForecastWeather();
    await controlCurrentTips();
  } catch (err) {
    displayError();
    console.log(err);
  }

  initHandlers();
  toggleLoader();
};
