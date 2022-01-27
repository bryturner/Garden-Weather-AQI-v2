export const displayCurrentTipsDate = currentDate => {
  const currentTipsDate = document.querySelector('.current-tips-date');

  currentTipsDate.innerHTML = currentDate;
};

export const displayCurrentTipsTemps = currentTempsArray => {
  const currentTipsTemps = document.querySelectorAll('.current-tips-temp');

  currentTipsTemps.forEach((temp, i) => {
    temp.innerHTML = currentTempsArray[i];
  });
};

export const displayCurrentTipsPrecip = futurePrecipPercentage => {
  const currentTipPrecip = document.getElementById('current-tip-precip');

  currentTipPrecip.innerHTML = `
	There is a ${futurePrecipPercentage}% chance of precipitation in the next few days. Make
	sure that your plants get enough water... just not too much.
`;
};

export const displayCurrentTipsAqi = aqiData => {
  const aqiTip = document.getElementById('aqi-tip');

  if (aqiData.aqiNumber === 'n/a') {
    aqiTip.innerHTML =
      'There is no air quality index information provided from your location.';
  } else {
    aqiTip.innerHTML = `The air quality index today is ${aqiData.aqiNumber} and is considered ${aqiData.aqiCondition}. ${aqiData.aqiRecommendation}`;
  }
  console.log(aqiData);
};
