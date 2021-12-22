import Day from './day';
import * as helpers from '../helpers';

export default class CurrentDay extends Day {
  constructor(
    dateTime,
    low,
    high,
    precipitation,
    sunrise,
    sunset,
    description,
    weatherId,
    weatherMain,
    aqiArr,
    currentTemp,
    feelsLike,
    currentLocation
  ) {
    super(
      dateTime,
      low,
      high,
      precipitation,
      sunrise,
      sunset,
      description,
      weatherId,
      weatherMain
    );
    this.aqiArr = aqiArr;
    this.currentTemp = currentTemp;
    this.feelsLike = feelsLike;
    this.currentLocation = currentLocation;
  }

  getCurrentTime() {
    return this._convertToTime(this.dateTime);
  }

  getAqi() {
    const pm25Arr = this.aqiArr.map(aqi => aqi.components.pm2_5);
    const sumPm25 = pm25Arr.reduce((acc, cur) => acc + cur);
    const pm25 = Math.trunc(sumPm25 / pm25Arr.length);
    return this._convertAqi(pm25);
  }

  _convertAqi(pm25) {
    // The component pm2_5 from the api needs to be converted to the standard air quality index number. The conversion changes based on the pm2_5 number.
    if (pm25 < 12) return Math.round(pm25 * 4.16);

    if (pm25 >= 12 && pm25 < 35.4) return Math.round(2.13 * (pm25 - 12.1) + 51);

    if (pm25 >= 35.5 && pm25 < 55.4)
      return Math.round(2.45 * (pm25 - 35.5) + 101);

    if (pm25 >= 55.5 && pm25 < 150.4)
      return Math.round(0.52 * (pm25 - 55.5) + 151);

    if (pm25 >= 150.5 && pm25 < 250.4)
      return Math.round(0.99 * (pm25 - 150.5) + 201);

    if (pm25 > 250.5) return Math.round(0.99 * (pm25 - 250.5) + 301);
  }

  getCurrentTemp() {
    return this._formatTemp(this.currentTemp);
  }

  getFeelsLike() {
    return this._formatTemp(this.feelsLike);
  }

  getCurrentLocation() {
    return this.currentLocation.join(', ');
  }
}
