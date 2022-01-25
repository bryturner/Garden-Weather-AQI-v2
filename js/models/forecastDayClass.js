import * as helper from '../helpers.js';

class ForecastWeather {
  constructor(forecastWeatherData) {
    this.forecastWeatherData = forecastWeatherData;

    this.formatDayOfWeekShort();
    this.formatDayOfMonth();
    this.formatDayOfWeekLong();
    this.formatLowTemp();
    this.formatHighTemp();
    this.formatMorningTemp();
    this.formatDayTimeTemp();
    this.formatEveningTemp();
    this.formatPrecip();
    this.formatSunrise();
    this.formatSunset();
    this.formatWeatherDescription();
  }

  formatDayOfWeekShort() {
    this.shortDayOfWeek = new Date(
      this.forecastWeatherData.dateTime * 1000
    ).toLocaleDateString(undefined, {
      weekday: 'short',
    });
  }

  formatDayOfMonth() {
    this.dayOfMonth = new Date(
      this.forecastWeatherData.dateTime * 1000
    ).toLocaleDateString(undefined, {
      day: 'numeric',
    });
  }

  formatDayOfWeekLong() {
    this.longDayOfWeek = new Date(
      this.forecastWeatherData.dateTime * 1000
    ).toLocaleDateString(undefined, {
      weekday: 'long',
    });
  }

  formatLowTemp() {
    this.lowTemp = helper.formatTemp(this.forecastWeatherData.lowTemp);
  }

  formatHighTemp() {
    this.highTemp = helper.formatTemp(this.forecastWeatherData.highTemp);
  }

  formatMorningTemp() {
    this.morningTemp = helper.formatTemp(this.forecastWeatherData.morningTemp);
  }

  formatDayTimeTemp() {
    this.dayTimeTemp = helper.formatTemp(this.forecastWeatherData.dayTimeTemp);
  }

  formatEveningTemp() {
    this.eveningTemp = helper.formatTemp(this.forecastWeatherData.eveningTemp);
  }

  formatPrecip() {
    this.precipPercentage = Math.trunc(
      this.forecastWeatherData.precipPercentage * 100
    );
  }

  formatSunrise() {
    this.sunriseTime = helper.convertToHrsAndMins(
      this.forecastWeatherData.sunriseTime
    );
  }

  formatSunset() {
    this.sunsetTime = helper.convertToHrsAndMins(
      this.forecastWeatherData.sunsetTime
    );
  }

  formatWeatherDescription() {
    const unformatedWeatherDescription = helper.getWeatherDescription(
      this.forecastWeatherData.weatherMain,
      this.forecastWeatherData.weatherId,
      this.forecastWeatherData.weatherDescription
    );

    this.weatherDescription = unformatedWeatherDescription.toLowerCase();
  }
}

export default ForecastWeather;
