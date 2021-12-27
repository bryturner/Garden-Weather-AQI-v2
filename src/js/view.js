import { CurrentDay } from './classes/currentDay';
import { ForecastDay } from './classes/forecastDay';

const loader = document.querySelector('.loader');

export const renderLoading = function () {
  console.log('loading');
  // loader.classList.toggle("hide");
};

// Display current weather details
export const displayCurrentDetails = function (currentWeather) {
  const currentDetailsList = document.querySelector('.current-details-list');

  currentDetailsList.innerHTML = `
<li class="current-details-list-item">
  <div class="current-detail-title">Sunrise</div>
  <div class="current-detail" id="current-sunrise">${currentWeather.getSunrise()} </div>
</li>

<li class="current-details-list-item">
  <div class="current-detail-title">Sunset</div>
  <div class="current-detail" id="current-sunset">${currentWeather.getSunset()} </div>
</li>

<li class="current-details-list-item">
  <div class="current-detail-title">Rain</div>
  <div class="current-detail" id="current-rain">${currentWeather.getPrecipitation()}%</div>
</li>

<li class="current-details-list-item">
  <div class="current-detail-title">Low</div>
  <div class="current-detail">
    <span class="temp-select" id="current-low">${currentWeather.getLowTemp()}</span
    ><span class="deg-style deg-select">&deg;F</span>
  </div>
</li>

<li class="current-details-list-item">
  <div class="current-detail-title">High</div>
  <div class="current-detail">
    <span class="temp-select" id="current-high">${currentWeather.getHighTemp()} </span
    ><span class="deg-style deg-select">&deg;F</span>
  </div>
</li>

<li class="current-details-list-item">
  <div class="current-detail-title">AQI</div>
  <div class="current-detail aqi-num" id="current-AQI">${currentWeather.getAqi()} </div>
</li>`;
};
