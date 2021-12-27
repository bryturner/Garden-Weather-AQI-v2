export const displayForecastDay = forecastWeather => {
  const forecastContainer = document.querySelector('.test-contain');

  const html = `
<div class="forecast-day-container">
  <div class="forecast-date flex-col">
    <div class="forecast-day">${forecastWeather.getForecastWeekday()} </div>
    <div class="forecast-day-num">${forecastWeather.getForecastDay()} </div>
  </div>
  <ul class="forecast-list no-bullets">
    <li class="forecast-list-item flex-row">
      <div class="forecast-detail-high">
        <span class="temp-select forecast-high">${forecastWeather.getHighTemp()}</span
        ><span class="deg-style deg-select">&deg;F</span>
      </div>
      <div class="forecast-detail-low">
        <span class="temp-select forecast-low">/${forecastWeather.getLowTemp()}</span
        ><span class="deg-style deg-select">&deg;F</span>
      </div>
    </li>
    <li class="forecast-list-item flex-row">
      <img src="/img/humidity.png" alt="" class="forecast-img-icon" crossorigin />
      <div class="forecast-detail forecast-rain">${forecastWeather.getPrecipitation()}%</div>
    </li>
    <li class="forecast-list-item flex-row mar-left-sm">
      <img src="/img/sunrise.png" alt="" class="forecast-img-icon" crossorigin/>
      <div class="forecast-detail forecast-sunrise">${forecastWeather.getSunrise()}</div>
    </li>
    <li class="forecast-list-item flex-row mar-left-sm">
      <img src="/img/sunset.png" alt="" class="forecast-img-icon" crossorigin/>
      <div class="forecast-detail forecast-sunset">${forecastWeather.getSunset()}</div>
    </li>
  </ul>
  <div class="forecast-icon-description-container flex-row">
    <div class="sm-forecast-icon">
      <img
        src="./img/${forecastWeather.getWeatherIcon()}.svg"
        alt="${forecastWeather.getWeatherIcon()}-icon"
        class="sm-svg-icon"
      crossorigin/>
    </div>
    <div class="forecast-description">${forecastWeather.getDescription()}</div>
  </div>
  
  <label class="checkbox-label">
    <input type="checkbox" name="tips-dropdown" class="tips-checkbox" />
    <div class="chevron"></div>
  </label>
</div>
  `;

  forecastContainer.insertAdjacentHTML('beforebegin', html);
};
