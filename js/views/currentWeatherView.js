import { parseToHtml } from '../helpers.js';

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

export const displayCurrentTips = currentDay => {
  const currentTipsAside = document.querySelector('.current-tips');
  currentTipsAside.innerHTML = '';
  const html = `
 <div class="current-tips-container"> 
  <div class="current-tips-date">${currentDay.currentDate}</div>
    <ul class="current-tips-list no-bullets flex-col">
      <li class="current-tip-list-item">
        <p class="current-tip">
          Today the temperature will be
          <span class="temp-select">${currentDay.morningTemp}</span
          ><span class="deg-style-small deg-select">&deg;F</span>
          in the morning,
          <span class="temp-select">${currentDay.daytimeTemp}</span
          ><span class="deg-style-small deg-select">&deg;F</span>
          during the day and
          <span class="temp-select">${currentDay.eveningTemp}</span
          ><span class="deg-style-small deg-select">&deg;F</span>
          in the evening. The best time to garden is when the temperature is
          right for you.
        </p>
      </li>
      <ion-icon name="leaf" class="current-leaf-icon"></ion-icon>
      <li class="current-tip-list-item">
        <p class="current-tip">
          There is a ${currentDay.futurePrecipPercentage}% chance of precipitation in the next few days. Make sure
          that your plants get enough water... just not too much.
        </p>
      </li>
      <ion-icon name="leaf" class="current-leaf-icon"></ion-icon>
      <li class="current-tip-list-item">
        <p class="current-tip">
          The air quality index today is ${currentDay.aqiNumber} and is considered ${currentDay.aqiCondition}. ${currentDay.aqiRecommendation}
        </p>
      </li>
    </ul>
   </div> 
    `;

  const htmlTipsDoc = parseToHtml(html);

  currentTipsAside.insertAdjacentElement(
    'afterbegin',
    htmlTipsDoc.body.firstElementChild
  );
};

export const addHandlerToggleDegrees = function (handler) {
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
