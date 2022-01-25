import * as model from './models/model.js';
import * as currentDayView from './views/currentWeatherView.js';
import * as forecastDayView from './views/forecastView.js';
import { toggleLoader } from './views/loaderView.js';
import CurrentWeather from './models/currentDayClass.js';
import ForecastWeather from './models/forecastDayClass.js';

const controlCurrentWeather = async function () {
  const currentWeatherData = await model.setCurrentWeather();

  const currentDay = new CurrentWeather(currentWeatherData);

  currentDayView.displayCurrentWeather(currentDay);

  currentDayView.displayCurrentTips(currentDay);
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

// ========================================================
// ========================================================
const addHandlerToggleDegrees = function (handler) {
  const degreeChangeCheckbox = document.querySelector('.deg-checkbox');
  //   const degreeAbbreviations = document.querySelectorAll('.deg-select');
  //   const temperatureNumbers = document.querySelectorAll('.temp-select');

  degreeChangeCheckbox.addEventListener('change', function () {
    //  if (degreeChangeCheckbox.checked) {
    //    temperatureNumbers.forEach(temp => {
    //      temp.innerText = Math.round((+temp.innerText - 32) / 1.8);
    //    });
    //    degreeAbbreviations.forEach(
    //      deg => (deg.innerText = `${String.fromCharCode(0x00b0)}C`)
    //    );
    //  } else {
    //    temperatureNumbers.forEach(temp => {
    //      temp.innerText = Math.round((+temp.innerText * 9) / 5 + 32);
    //    });
    //    degreeAbbreviations.forEach(
    //      deg => (deg.innerText = `${String.fromCharCode(0x00b0)}F`)
    //    );
    //  }
    handler();
  });
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

export const init = function () {
  //   addHandlerToggleDegrees(controlToggleDegrees);
  controlCurrentWeather();
  controlForecastWeather();
};
