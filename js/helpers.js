// ===========================================

export const parseToHtml = string => {
  const parser = new DOMParser();
  return parser.parseFromString(string, 'text/html');
};

export const formatTemp = temp => Math.trunc(temp);

export const convertToHrsAndMins = time => {
  return new Date(time * 1000)
    .toLocaleTimeString([], { hour12: false })
    .slice(0, 5);
};

export const getWeatherDescription = function (
  weatherMain,
  weatherId,
  weatherDescription
) {
  // Special cases from API are handled by hard-coding.
  if (weatherMain === 'Thunderstorm') return 'Thunderstorm';

  if (weatherMain === 'Drizzle') return 'Drizzle';

  if (weatherId > 519 && weatherId < 531) return 'Shower Rain';

  if (weatherMain === 'Clouds') {
    //Remove the colon from all cloud descriptions
    const cloudDescriptSplit = weatherDescription.split(':');

    //To leave off percentages in the description
    return cloudDescriptSplit[0];
  }

  return weatherDescription;
};

export const formatToUpperCase = function (weatherDescription) {
  const firstLettersToUpper = weatherDescription
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return firstLettersToUpper;
};

export const getWeatherIcon = function (
  dateTime,
  sunriseTime,
  sunsetTime,
  weatherId,
  weatherMain
) {
  // Use the OpenWeather API descriptions (this.weatherMain) and ids (this.weatherId) to determine which weather icon should be displayed. **The strings being returned are the file names of the icon svg

  // Check to see if it is nighttime in the current location in order to display night icons
  if (dateTime < sunriseTime || dateTime > sunsetTime) {
    if (weatherId === 500) return 'night-light-rain';
    if (weatherId === 800) return 'night-clear';
    if (weatherId === 801 || weatherId === 802) return 'night-partly-cloudy';
  }

  // Display icons for other unique weather occurances
  if (weatherId === 500) return 'light-rain';

  if (weatherId === 801 || weatherId === 802) return 'partly-cloudy';

  if (weatherMain === 'Dust' || weatherMain === 'Sand') return 'sand-dust';

  if (weatherMain === 'Smoke' || weatherMain === 'Fog') return 'fog-smoke';

  if (weatherMain === 'Mist') return 'Drizzle';
  // All other svg icon file names and Openweather API weather condition titles match and can be used to display the correct icon

  return weatherMain;
};
