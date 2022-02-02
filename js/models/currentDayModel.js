import * as helper from '../helpers.js';

class CurrentWeather {
  constructor(currentWeatherData) {
    this.currentWeatherData = currentWeatherData;

    this.formatCurrentLocation();
    this.formatCurrentTime();
    this.formatLowTemp();
    this.formatHighTemp();
    this.formatCurrentTemp();
    this.formatFeelsLikeTemp();
    this.formatPrecip();
    this.formatSunrise();
    this.formatSunset();
    this.formatWeatherDescription();
    this.setWeatherIcon();
    this.setAqiNumber();
  }

  formatCurrentLocation() {
    this.currentLocation = `${this.currentWeatherData.city}, ${this.currentWeatherData.region}, ${this.currentWeatherData.country}`;
  }

  formatCurrentTime() {
    this.currentTime = helper.convertToHrsAndMins(
      this.currentWeatherData.dateTime
    );
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
    if (pm2_5 < 0 || typeof pm2_5 !== 'number') return 'n/a';

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

  setAqiNumber() {
    this.aqiNumber = this._convertPm2_5ToAqi(this.currentWeatherData.aqiNumber);
    return this.aqiNumber;
  }
}

export default CurrentWeather;
