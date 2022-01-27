import * as helper from '../helpers.js';

class CurrentWeather {
  constructor(currentWeatherData) {
    this.currentWeatherData = currentWeatherData;
    this.aqiTipsText = document.getElementById('aqi-tip');

    this.formatCurrentLocation();
    this.formatCurrentTime();
    this.formatCurrentDate();
    this.formatLowTemp();
    this.formatHighTemp();
    this.formatCurrentTemp();
    this.formatFeelsLikeTemp();
    this.formatMorningTemp();
    this.formatDaytimeTemp();
    this.formatEveningTemp();
    this.formatPrecip();
    this.formatSunrise();
    this.formatSunset();
    this.formatWeatherDescription();
    this.setWeatherIcon();
    this.formatAqi();
    this.getFuturePrecipPercentage();
    this.setAqiCondition();
    this.setAqiRecommendation();
  }

  formatCurrentLocation() {
    this.currentLocation = `${this.currentWeatherData.city}, ${this.currentWeatherData.region}, ${this.currentWeatherData.country}`;
  }

  formatCurrentTime() {
    this.currentTime = helper.convertToHrsAndMins(
      this.currentWeatherData.dateTime
    );
  }

  formatCurrentDate() {
    this.currentDate = new Date(
      this.currentWeatherData.dateTime * 1000
    ).toLocaleDateString([], {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  }

  formatLowTemp() {
    this.lowTemp = helper.formatTemp(this.currentWeatherData.lowTemp);
  }

  formatHighTemp() {
    this.highTemp = helper.formatTemp(this.currentWeatherData.highTemp);
  }

  formatCurrentTemp() {
    this.currentTemp = helper.formatTemp(this.currentWeatherData.currentTemp);
  }

  formatFeelsLikeTemp() {
    this.feelsLikeTemp = helper.formatTemp(
      this.currentWeatherData.feelsLikeTemp
    );
  }

  formatMorningTemp() {
    this.morningTemp = helper.formatTemp(this.currentWeatherData.morningTemp);
  }

  formatDaytimeTemp() {
    this.daytimeTemp = helper.formatTemp(this.currentWeatherData.daytimeTemp);
  }

  formatEveningTemp() {
    this.eveningTemp = helper.formatTemp(this.currentWeatherData.eveningTemp);
  }

  formatPrecip() {
    this.precipPercentage = Math.trunc(
      this.currentWeatherData.precipPercentage * 100
    );
  }

  formatSunrise() {
    this.sunriseTime = helper.convertToHrsAndMins(
      this.currentWeatherData.sunriseTime
    );
  }

  formatSunset() {
    this.sunsetTime = helper.convertToHrsAndMins(
      this.currentWeatherData.sunsetTime
    );
  }

  formatWeatherDescription() {
    const unformattedDescription = helper.getWeatherDescription(
      this.currentWeatherData.weatherMain,
      this.currentWeatherData.weatherId,
      this.currentWeatherData.weatherDescription
    );

    this.weatherDescription = helper.formatToUpperCase(unformattedDescription);
  }

  setWeatherIcon() {
    this.weatherIcon = helper.getWeatherIcon(
      this.currentWeatherData.dateTime,
      this.currentWeatherData.sunriseTime,
      this.currentWeatherData.sunsetTime,
      this.currentWeatherData.weatherId,
      this.currentWeatherData.weatherMain
    );
  }

  _convertPm2_5ToAqi(pm2_5) {
    // The component pm2_5 from the api needs to be converted to the standard air quality index number. The conversion changes based on the pm2_5 number.
    if (pm2_5 < 0) return 'n/a';
    if (pm2_5 < 12) return Math.round(pm2_5 * 4.16);

    if (pm2_5 >= 12 && pm2_5 < 35.4)
      return Math.round(2.13 * (pm2_5 - 12.1) + 51);

    if (pm2_5 >= 35.5 && pm2_5 < 55.4)
      return Math.round(2.45 * (pm2_5 - 35.5) + 101);

    if (pm2_5 >= 55.5 && pm2_5 < 150.4)
      return Math.round(0.52 * (pm2_5 - 55.5) + 151);

    if (pm2_5 >= 150.5 && pm2_5 < 2_50.4)
      return Math.round(0.99 * (pm2_5 - 150.5) + 201);

    if (pm2_5 > 2_50.5) return Math.round(0.99 * (pm2_5 - 2_50.5) + 301);
  }

  formatAqi() {
    this.aqiNumber = this._convertPm2_5ToAqi(this.currentWeatherData.aqiNumber);
    return this.aqiNumber;
  }

  setAqiCondition() {
    const aqiNumber = this.formatAqi();
    if (aqiNumber === 'n/a') return (this.aqiTipsText = '');
    if (aqiNumber <= 50) this.aqiCondition = 'healthy';
    if (aqiNumber > 50 && aqiNumber <= 100) this.aqiCondition = 'moderate';
    if (aqiNumber > 100 && aqiNumber <= 150)
      this.aqiCondition = 'unhealthy for sensitive groups';
    if (aqiNumber > 150 && aqiNumber <= 200) this.aqiCondition = 'unhealthy';
    if (aqiNumber > 200) this.aqiCondition = 'extremely unhealthy';
  }

  setAqiRecommendation() {
    const aqiNumber = this.formatAqi();
    if (aqiNumber === 'n/a') return (this.aqiTipsText = '');
    if (aqiNumber <= 50)
      this.aqiRecommendation =
        'It is a great day to garden! Get outside and enjoy the fresh air.';
    if (aqiNumber > 50 && aqiNumber <= 100)
      this.aqiRecommendation =
        'It is a good day to garden unless you are sensitive to pollution.';
    if (aqiNumber > 100 && aqiNumber <= 150)
      this.aqiRecommendation =
        'It is an okay day to garden, but another day with a lower AQI might be better.';
    if (aqiNumber > 150 && aqiNumber <= 200)
      this.aqiRecommendation =
        'You should probably stay inside and protect your health. Gardening can wait for another day.';
    if (aqiNumber > 200)
      this.aqiRecommendation =
        'Stay inside, close the windows and crank up that air purifier. Climate change is real.';
  }

  _findLargestPrecipPercentage(precipArray) {
    const largestPercent = Math.max(...precipArray.slice(0, 3));
    const convertedPercent = largestPercent * 100;
    return convertedPercent;
  }

  getFuturePrecipPercentage() {
    const precipArray = this.currentWeatherData.dailyWeatherArray.map(
      arr => arr.pop
    );
    this.futurePrecipPercentage =
      this._findLargestPrecipPercentage(precipArray);
  }
}

export default CurrentWeather;

// stopping point - use all functions from older version make 2 classes current/forecast
// use helpers for functions used by both instead of extending Day class
// when getting values from class, use ex. currentWeather.time instead of function
// must call all functions in class in constructor
