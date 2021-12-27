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

export const displayCurrentWeather = currentWeather => {
  const currentDayContainer = document.querySelector('.current-day-container');

  currentDayContainer.innerHTML = `
<div class="flex-col mar-left-sm">
  <div class="current-location">${currentWeather.getCurrentLocation()}</div>
  <div class="current-date">Monday, Jun 23</div>
  <div class="current-time">As of ${currentWeather.getCurrentTime()}</div>
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
      src="./img/${currentWeather.getWeatherIcon()}.svg"
      alt="${currentWeather.getWeatherIcon()}-icon"
      class="lg-svg-icon"
      crossorigin
    />
  </div>
  <div class="current-temp">
    <span class="temp-select" id="temp-current">${currentWeather.getCurrentTemp()}</span
    ><span class="deg-style deg-select">&deg;F</span>
  </div>
  <div class="current-description-container">
    <div class="current-description">${currentWeather.getDescription()}</div>
    <div class="feels-like">
      Feels Like
      <span class="temp-select" id="temp-feels">${currentWeather.getFeelsLike()}</span
      ><span class="deg-style-small deg-select">&deg;F</span>
    </div>
  </div>
</div>

<div class="current-details-container flex-col">
  <div class="current-day">Today's Details</div>
  <ul class="current-details-list no-bullets">
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
    </li>
  </ul>
</div>
`;
};
