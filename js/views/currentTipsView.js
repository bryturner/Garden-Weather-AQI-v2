import { parseToHtml } from '../helpers.js';

export const displayCurrentTipsBelowMedia1080 = currentTips => {
  const mediaBelow1080 = document.querySelector('.current-tips-below-1080');

  mediaBelow1080.innerHTML = '';

  let aqiTip;

  if (currentTips.aqiNumber === 'n/a') {
    aqiTip =
      'There is no air quality index information provided from your location.';
  } else {
    aqiTip = `The air quality index today is ${currentTips.aqiNumber} and is considered ${currentTips.aqiCondition}. ${currentTips.aqiRecommendation}`;
  }

  const html = `
	<div class="current-tips-container">
      <p class="current-tips-date">${currentTips.currentDate}</p>
      <ul class="current-tips-list flex-col">
        <li class="current-tip-list-item">
          <ion-icon name="leaf" class="current-leaf-icon above-540-media-icon"></ion-icon>
          <p class="current-tip">
            Today the temperature will be
            <span class="temp-select current-tips-temp">${currentTips.morningTemp}</span
            ><span class="deg-style-small deg-select">&deg;F</span> in the
            morning, <span class="temp-select current-tips-temp">${currentTips.daytimeTemp}</span
            ><span class="deg-style-small deg-select">&deg;F</span> during
            the day and
            <span class="temp-select current-tips-temp">${currentTips.eveningTemp}</span
            ><span class="deg-style-small deg-select">&deg;F</span>
            in the evening. Get in the garden when the temperature is just
				right for you.
          </p>
        </li>

		  <ion-icon name="leaf" class="current-leaf-icon below-540-media-icon"></ion-icon>

        <li class="current-tip-list-item">
          <ion-icon name="leaf" class="current-leaf-icon above-540-media-icon"></ion-icon>
          <p class="current-tip" id="current-tip-precip">
            There is a ${currentTips.futurePrecipPercentage}% chance of precipitation in the next few days.
            Make sure that your plants get enough water... just not too
            much.
          </p>
        </li>

		  <ion-icon name="leaf" class="current-leaf-icon below-540-media-icon"></ion-icon>

        <li class="current-tip-list-item">
          <ion-icon name="leaf" class="current-leaf-icon above-540-media-icon"></ion-icon>
          <p class="current-tip" id="aqi-tip">
            ${aqiTip}
          </p>
        </li>
      </ul>
   </div>
	`;

  const htmlCurrentTipsDoc = parseToHtml(html);

  mediaBelow1080.insertAdjacentElement(
    'afterbegin',
    htmlCurrentTipsDoc.body.firstChild
  );
};

export const displayCurrentTipsAboveMedia1080 = currentTips => {
  const mediaAbove1080 = document.querySelector('.current-tips-above-1080');

  mediaAbove1080.innerHTML = '';

  let aqiTip;

  if (currentTips.aqiNumber === 'n/a') {
    aqiTip =
      'There is no air quality index information provided from your location.';
  } else {
    aqiTip = `The air quality index today is ${currentTips.aqiNumber} and is considered ${currentTips.aqiCondition}. ${currentTips.aqiRecommendation}`;
  }

  const html = `
	<div class="current-tips-container">
     <p class="current-tips-date">${currentTips.currentDate}</p>
     <ul class="current-tips-list flex-col">
       <li class="current-tip-list-item">
         <p class="current-tip">
           Today the temperature will be
           <span class="temp-select current-tips-temp">${currentTips.morningTemp}</span
           ><span class="deg-style-small deg-select">&deg;F</span>
           in the morning,
           <span class="temp-select current-tips-temp">${currentTips.daytimeTemp}</span
           ><span class="deg-style-small deg-select">&deg;F</span>
           during the day and
           <span class="temp-select current-tips-temp">${currentTips.eveningTemp}</span
           ><span class="deg-style-small deg-select">&deg;F</span>
           in the evening. Get in the garden when the temperature is just
           right for you.
         </p>
       </li>
       <ion-icon name="leaf" class="current-leaf-icon"></ion-icon>
       <li class="current-tip-list-item">
         <p class="current-tip" id="current-tip-precip">
           There is a ${currentTips.futurePrecipPercentage}% chance of precipitation in the next few days. Make
           sure that your plants get enough water... just not too much.
         </p>
       </li>
       <ion-icon name="leaf" class="current-leaf-icon"></ion-icon>
       <li class="current-tip-list-item">
         <p class="current-tip" id="aqi-tip">
			  ${aqiTip}
         </p>
       </li>
     </ul>
   </div>
	`;

  const htmlCurrentTipsDoc = parseToHtml(html);

  mediaAbove1080.insertAdjacentElement(
    'afterbegin',
    htmlCurrentTipsDoc.body.firstChild
  );
};
