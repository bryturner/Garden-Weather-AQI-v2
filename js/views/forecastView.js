import { parseToHtml } from '../helpers.js';

// Function to parse forecast HTML string to a document in order to manipulate elements after rendered on page

export const displayForecastDay = forecastDay => {
  const forecastContainer = document.querySelector('.forecast-days');

  const html = `
<div class="forecast-element">
  <div class="forecast-day-container">
    <div class="forecast-date flex-col">
      <p class="forecast-day">${forecastDay.shortDayOfWeek} </p>
      <p class="forecast-day-num">${forecastDay.dayOfMonth} </p>
    </div>
    <ul class="forecast-list no-bullets">
      <li class="forecast-list-item">
        <p class="forecast-detail-high">
          <span class="temp-select forecast-high">${forecastDay.highTemp}</span
          ><span class="deg-style deg-select">&deg;F</span>
        </p>
        <p class="forecast-detail-low">
          /<span class="temp-select forecast-low">${forecastDay.lowTemp}</span
          ><span class="deg-style deg-select">&deg;F</span>
        </p>
      </li>
      <li class="forecast-list-item flex-row mar-left-sm forecast-precip">
        <img src="/img/humidity.png" alt="" class="forecast-img-icon" crossorigin />
        <p class="forecast-detail">${forecastDay.precipPercentage}%</p>
      </li>
      <li class="forecast-list-item flex-row mar-left-sm forecast-sunrise">
        <img src="/img/sunrise.png" alt="" class="forecast-img-icon" crossorigin/>
        <p class="forecast-detail ">${forecastDay.sunriseTime}</p>
      </li>
      <li class="forecast-list-item flex-row mar-left-sm forecast-sunset">
        <img src="/img/sunset.png" alt="" class="forecast-img-icon" crossorigin/>
        <p class="forecast-detail forecast-sunset">${forecastDay.sunsetTime}</p>
      </li>
    </ul>
    <div class="forecast-icon-description-container flex-row">
      <div class="sm-forecast-icon">
        <img
          src="./img/${forecastDay.weatherIcon}.svg"
          alt="${forecastDay.weatherIcon}-icon"
          class="sm-svg-icon"
        crossorigin/>
      </div>
      <p class="forecast-description">${forecastDay.weatherDescriptionUpperCase}</p>
    </div>

    <label class="checkbox-label">
      <input type="checkbox" name="tips-dropdown" class="tips-checkbox" />
      <div class="chevron"></div>
    </label>
  </div>

  <div class="forecast-tips-container collapsed">
    <div class="forecast-tips-inner flex-col hidden">
      <div class="forecast-tip">
        <ion-icon name="leaf" class="forecast-leaf-icon"></ion-icon>
        <p class="forecast-tip-text">
          On ${forecastDay.longDayOfWeek}, the temperature forecast is
          <span class="temp-select">${forecastDay.morningTemp}</span
          ><span class="deg-style deg-select">&deg;F</span> in the
          morning, <span class="temp-select">${forecastDay.daytimeTemp}</span
          ><span class="deg-style deg-select">&deg;F</span> mid-day
          and <span class="temp-select">${forecastDay.eveningTemp}</span
          ><span class="deg-style deg-select">&deg;F</span> in the
          evening.
        </p>
      </div>
      <div class="forecast-tip">
        <ion-icon name="leaf" class="forecast-leaf-icon"></ion-icon>
        <p class="forecast-tip-text">
          Today will be ${forecastDay.weatherDescriptionLowerCase} with a ${forecastDay.precipPercentage}% chance of
          precipitation today.
        </p>
      </div>
      <div class="forecast-tip">
        <ion-icon name="leaf" class="forecast-leaf-icon"></ion-icon>
        <p class="forecast-tip-text">
          Plan your watering schedule and gardening time accordingly.
        </p>
      </div>
    </div>
  </div>
</div>
    `;

  const htmlForecastDoc = parseToHtml(html);

  forecastContainer.insertAdjacentElement(
    'beforebegin',
    htmlForecastDoc.body.firstChild
  );
};

export const addHandlerForecastDropdown = handler => {
  //   Select all the checkboxes and elements to be manipulated after above markup is inserted.
  const forecastCheckboxes = Array.from(
    document.querySelectorAll('.tips-checkbox')
  );

  forecastCheckboxes.forEach((checkbox, i) => {
    checkbox.addEventListener('change', function () {
      handler(i);
    });
  });
};
