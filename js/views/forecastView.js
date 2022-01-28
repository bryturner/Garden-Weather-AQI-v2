import { parseToHtml } from '../helpers.js';

// Function to parse forecast HTML string to a document in order to manipulate elements after rendered on page

export const displayForecastDay = forecastDay => {
  const forecastContainer = document.querySelector('.forecast-days');

  const html = `
<div class="forecast-element">
  <div class="forecast-day-container">
    <div class="forecast-date flex-col">
      <div class="forecast-day">${forecastDay.shortDayOfWeek} </div>
      <div class="forecast-day-num">${forecastDay.dayOfMonth} </div>
    </div>
    <ul class="forecast-list no-bullets">
      <li class="forecast-list-item">
        <div class="forecast-detail-high">
          <span class="temp-select forecast-high">${forecastDay.highTemp}</span
          ><span class="deg-style deg-select">&deg;F</span>
        </div>
        <div class="forecast-detail-low">
          /<span class="temp-select forecast-low">${forecastDay.lowTemp}</span
          ><span class="deg-style deg-select">&deg;F</span>
        </div>
      </li>
      <li class="forecast-list-item flex-row mar-left-sm">
        <img src="/img/humidity.png" alt="" class="forecast-img-icon" crossorigin />
        <div class="forecast-detail forecast-rain">${forecastDay.precipPercentage}%</div>
      </li>
      <li class="forecast-list-item flex-row mar-left-sm">
        <img src="/img/sunrise.png" alt="" class="forecast-img-icon" crossorigin/>
        <div class="forecast-detail forecast-sunrise">${forecastDay.sunriseTime}</div>
      </li>
      <li class="forecast-list-item flex-row mar-left-sm">
        <img src="/img/sunset.png" alt="" class="forecast-img-icon" crossorigin/>
        <div class="forecast-detail forecast-sunset">${forecastDay.sunsetTime}</div>
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
      <div class="forecast-description">${forecastDay.weatherDescriptionUpperCase}</div>
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

  //   const forecastTipContainers = Array.from(
  //     document.querySelectorAll('.forecast-tips-container')
  //   );

  //   const forecastTipsInner = Array.from(
  //     document.querySelectorAll('.forecast-tips-inner')
  //   );

  forecastCheckboxes.forEach((checkbox, i) => {
    checkbox.addEventListener('change', function () {
      handler(i);
      // forecastTipContainers[i].classList.toggle('collapsed');
      // forecastTipsInner[i].classList.toggle('hidden');
    });
  });
};
