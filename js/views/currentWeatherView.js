import { parseToHtml } from '../helpers.js';

export const addHandlerToggleDegrees = function (handler) {
  const degreeChangeCheckbox = document.querySelector('.deg-checkbox');

  degreeChangeCheckbox.addEventListener('change', function () {
    handler();
  });
};

export const displayCurrentWeather = currentDay => {
  const currentDayElementSelect = document.querySelector(
    '.current-day-element-select'
  );
  currentDayElementSelect.innerHTML = '';
  const html = `
<div class="current-day-first-child">
 <div class="current-day-container">  
  <div class="flex-col mar-left-sm">
    <div class="current-location">${currentDay.currentLocation}</div>
    <div class="current-time">As of ${currentDay.currentTime}</div>
    <div class="slider-container-outer">
      <div class="slider-container">
        <div class="fahrenheit">&deg;F</div>
        <label class="slider-label" for="deg-switch">
          <input
            type="checkbox"
            name="deg-switch"
            class="deg-checkbox"
          />
          <span class="slider"></span>
        </label>
        <div class="celsius">&deg;C</div>
      </div>
    </div>
  </div>
  <div class="icon-temp-container">
    <div id="lg-current-icon">
      <img
        src="./img/${currentDay.weatherIcon}.svg"
        alt="${currentDay.weatherIcon}-icon"
        class="lg-svg-icon"
        crossorigin
      />
    </div>
    <div class="current-temp">
      <span class="temp-select" id="temp-current">${currentDay.currentTemp}</span
      ><span class="deg-style deg-select">&deg;F</span>
    </div>
    <div class="current-description-container">
      <div class="current-description">${currentDay.weatherDescription}</div>
      <div class="feels-like">
        Feels Like
        <span class="temp-select" id="temp-feels">${currentDay.feelsLikeTemp}</span
        ><span class="deg-style-small deg-select">&deg;F</span>
      </div>
    </div>
  </div>
  <div class="current-details-container flex-col">
    <div class="current-day">Today's Details</div>
    <ul class="current-details-list no-bullets">
      <li class="current-details-list-item">
        <div class="current-detail-title">Sunrise</div>
        <div class="current-detail" id="current-sunrise">${currentDay.sunriseTime} </div>
      </li>
  
      <li class="current-details-list-item">
        <div class="current-detail-title">Sunset</div>
        <div class="current-detail" id="current-sunset">${currentDay.sunsetTime} </div>
      </li>
      <li class="current-details-list-item">
        <div class="current-detail-title">Precip.</div>
        <div class="current-detail" id="current-rain">${currentDay.precipPercentage}%</div>
      </li>
      <li class="current-details-list-item">
        <div class="current-detail-title">Low</div>
        <div class="current-detail">
          <span class="temp-select" id="current-low">${currentDay.lowTemp}</span
          ><span class="deg-style deg-select">&deg;F</span>
        </div>
      </li>
      <li class="current-details-list-item">
        <div class="current-detail-title">High</div>
        <div class="current-detail">
          <span class="temp-select" id="current-high">${currentDay.highTemp} </span
          ><span class="deg-style deg-select">&deg;F</span>
        </div>
      </li>
      <li class="current-details-list-item">
        <div class="current-detail-title">AQI</div>
        <div class="current-detail aqi-num" id="current-AQI">${currentDay.aqiNumber} </div>
      </li>
    </ul>
  </div>
 </div>
</div>
`;

  const htmlCurrentDoc = parseToHtml(html);
  currentDayElementSelect.insertAdjacentElement(
    'afterbegin',
    htmlCurrentDoc.body.firstChild
  );
};
