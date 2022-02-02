import {
  API_KEY_WEA,
  URL_AQI,
  URL_WEATHER,
  URL_LOCATION,
  API_KEY_LOC,
} from '../config.js';

export const getCurrentLocationData = async function (
  errorMessage = 'Location cannot be found'
) {
  const response = await fetch(`${URL_LOCATION}token=${API_KEY_LOC}`);
  if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
  const currentLocationData = await response.json();
  return currentLocationData;
};

export const getCurrentLatAndLon = async function () {
  const locationData = await getCurrentLocationData();
  const [latitude, longitude] = locationData.loc.split(',');
  return { latitude, longitude };
};

export const getWeatherData = async function (
  errorMessage = 'Cannot find weather information'
) {
  const currentPosition = await getCurrentLatAndLon();
  const response = await fetch(
    `${URL_WEATHER}?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&exclude=hourly,minutely,alerts&appid=${API_KEY_WEA}&units=imperial`
  );
  if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
  const weatherData = await response.json();
  return weatherData;
};

const getCurrentAqiData = async function (
  errorMessage = 'Cannot find aqi information'
) {
  const currentPosition = await getCurrentLatAndLon();
  const response = await fetch(
    `${URL_AQI}?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&appid=${API_KEY_WEA}`
  );
  if (!response.ok) throw new Error(`${errorMessage} (${response.status})`);
  const aqiData = await response.json();
  return aqiData;
};

const getCurrentLocationNames = async function () {
  const locationData = await getCurrentLocationData();
  const { city, region, country } = locationData;
  return { city, region, country };
};

export const getCurrentWeatherData = async function () {
  const locationData = await getCurrentLocationNames();
  const weatherData = await getWeatherData();
  const aqiData = await getCurrentAqiData();

  const currentWeatherObj = {
    dateTime: weatherData.current.dt,
    lowTemp: weatherData.daily[0].temp.min,
    highTemp: weatherData.daily[0].temp.max,
    feelsLikeTemp: weatherData.current.feels_like,
    currentTemp: weatherData.current.temp,
    precipPercentage: weatherData.daily[0].pop,
    weatherId: weatherData.current.weather[0].id,
    weatherMain: weatherData.current.weather[0].main,
    weatherDescription: weatherData.current.weather[0].description,
    sunriseTime: weatherData.daily[0].sunrise,
    sunsetTime: weatherData.daily[0].sunset,
    aqiNumber: aqiData.list[0].components.pm2_5,
    city: locationData.city,
    region: locationData.region,
    country: locationData.country,
    currentLocation: locationData,
  };

  return currentWeatherObj;
};

export const getCurrentTipsData = async function () {
  const weatherData = await getWeatherData();
  const aqiData = await getCurrentAqiData();

  const currentTipsObj = {
    dateTime: weatherData.current.dt,
    dailyWeatherArray: weatherData.daily,
    morningTemp: weatherData.daily[0].temp.morn,
    eveningTemp: weatherData.daily[0].temp.eve,
    daytimeTemp: weatherData.daily[0].temp.day,
    aqiNumber: aqiData.list[0].components.pm2_5,
  };

  return currentTipsObj;
};

export const getForecastWeatherData = async function () {
  const weatherData = await getWeatherData();

  // Slice weatherData array to exclude current day weather info from forecast display
  const forecastDataArray = weatherData.daily.slice(
    1,
    weatherData.daily.length
  );

  const forecastObjectArray = forecastDataArray.map(forecastData => {
    return {
      dateTime: forecastData.dt,
      lowTemp: forecastData.temp.min,
      highTemp: forecastData.temp.max,
      precipPercentage: forecastData.pop,
      weatherId: forecastData.weather[0].id,
      weatherMain: forecastData.weather[0].main,
      weatherDescription: forecastData.weather[0].description,
      sunriseTime: forecastData.sunrise,
      sunsetTime: forecastData.sunset,
      morningTemp: forecastData.temp.morn,
      eveningTemp: forecastData.temp.eve,
      daytimeTemp: forecastData.temp.day,
    };
  });

  return forecastObjectArray;
};
