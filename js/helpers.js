export const convertAqi = function (pm25) {
  // The component pm2_5 from the api needs to be converted to the standard air quality index number. The conversion changes based on the pm2_5 number.
  if (pm25 < 0) return 'n/a';
  if (pm25 < 12) return Math.round(pm25 * 4.16);

  if (pm25 >= 12 && pm25 < 35.4) return Math.round(2.13 * (pm25 - 12.1) + 51);

  if (pm25 >= 35.5 && pm25 < 55.4)
    return Math.round(2.45 * (pm25 - 35.5) + 101);

  if (pm25 >= 55.5 && pm25 < 150.4)
    return Math.round(0.52 * (pm25 - 55.5) + 151);

  if (pm25 >= 150.5 && pm25 < 250.4)
    return Math.round(0.99 * (pm25 - 150.5) + 201);

  if (pm25 > 250.5) return Math.round(0.99 * (pm25 - 250.5) + 301);
};

export const sumPm25Nums = function (pm25Arr) {
  return pm25Arr.reduce((acc, cur) => acc + cur);
};

export const getPm25Arr = function (aqiArr) {
  return aqiArr.map(aqi => aqi.components.pm2_5);
};

export const checkAqiNullish = function (aqiArr) {
  return (aqiArr ??= 'n/a');
};

export const formatTemp = temp => Math.trunc(temp);

export const parseToHtml = function (string) {
  const parser = new DOMParser();
  return parser.parseFromString(string, 'text/html');
};

export const toggleDegrees = function () {
  const degreeChangeCheck = document.querySelector('.deg-checkbox');
  const degreeSelect = document.querySelectorAll('.deg-select');
  const temperatureSelect = document.querySelectorAll('.temp-select');

  degreeChangeCheck.addEventListener('change', function () {
    if (degreeChangeCheck.checked) {
      temperatureSelect.forEach(temp => {
        temp.innerText = Math.round((+temp.innerText - 32) / 1.8);
      });
      degreeSelect.forEach(
        deg => (deg.innerText = `${String.fromCharCode(0x00b0)}C`)
      );
    } else {
      temperatureSelect.forEach(temp => {
        temp.innerText = Math.round((+temp.innerText * 9) / 5 + 32);
      });
      degreeSelect.forEach(
        deg => (deg.innerText = `${String.fromCharCode(0x00b0)}F`)
      );
    }
  });
};

export const toggleTipsDropdown = function () {
  const forecastCheckboxes = Array.from(
    document.querySelectorAll('.tips-checkbox')
  );

  const forecastTipContainers = Array.from(
    document.querySelectorAll('.forecast-tips-container')
  );

  const forecastTipsInner = Array.from(
    document.querySelectorAll('.forecast-tips-inner')
  );

  forecastCheckboxes.forEach((checkbox, i) => {
    checkbox.addEventListener('change', function () {
      if (checkbox.checked) {
        forecastTipContainers[i].classList.remove('collapsed');
        forecastTipsInner[i].classList.remove('hidden');
      }

      if (!checkbox.checked) {
        forecastTipContainers[i].classList.add('collapsed');
        forecastTipsInner[i].classList.add('hidden');
      }
    });
  });
};
